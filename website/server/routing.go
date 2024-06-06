package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

func (s *Server) WriteJSON(w http.ResponseWriter, status int, body any) error {
    w.Header().Add("Content-Type", "application/json")
    w.WriteHeader(status)

    return json.NewEncoder(w).Encode(body)
}

func (s *Server) WriteMedia(w http.ResponseWriter, status int, path string) error {
    w.Header().Add("Content-Type", "application/octet-stream")
    w.WriteHeader(status)

    file, err := os.ReadFile(path)
    if err != nil {
        log.Println("could not read File.", err)
        return err
    }

    w.WriteHeader(status)
    w.Header().Set("Content-Type", "application/octet-stream")
    w.Write(file)
    return nil
}

type apiFunc func (w http.ResponseWriter, r *http.Request) error

type ApiError struct {
    Error string `json:"error"`
}

func (s *Server) makeHTTPHandlerFunc(f apiFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        if err := f(w, r); err != nil {
            s.WriteJSON(w, http.StatusBadRequest, ApiError{Error: err.Error()})
        }

    }
}

func (s *Server) handleRoutes(mux *http.ServeMux) {
    mux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "hello world\n")
    })

    mux.HandleFunc("GET /api/user/{id}", s.makeHTTPHandlerFunc(s.handleGetUserById))
    mux.HandleFunc("GET /api/profile-picture/{id}", s.makeHTTPHandlerFunc(s.handleGetProfilePictureById))
    mux.HandleFunc("GET /api/user/feed/{userId}", s.makeHTTPHandlerFunc(s.handleGetUserFeedById))
    mux.HandleFunc("POST /api/create-account", s.makeHTTPHandlerFunc(s.handleCreateAccount))
    mux.HandleFunc("GET /api/posts/user/{userId}", s.makeHTTPHandlerFunc(s.handleGetUserPostsByUserId))
    mux.HandleFunc("GET /api/community/posts/{id}", s.makeHTTPHandlerFunc(s.handleGetCommunityPosts))
}

func (s *Server) handleGetUserById(w http.ResponseWriter, r *http.Request) error {
    var idStr string = r.PathValue("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        log.Println(err)
        return err
    }

    var u *User
    if u, err = s.store.GetUserById(id); err != nil {
        log.Println(err)
        return err
    }

    s.WriteJSON(w, http.StatusOK, u)
    return nil
}

func (s *Server) handleGetProfilePictureById(w http.ResponseWriter, r *http.Request) error {
    idStr := r.PathValue("id")
    id, err := strconv.Atoi(idStr)
    if err != nil {
        log.Println(err)
        return err
    }

    fileName, err := s.store.GetProfilePicPathById(id)
    if err != nil {
        return err
    }

    filePath := "../media/profile-pictures/" + fileName
    return s.WriteMedia(w, http.StatusOK, filePath)
}

func (s *Server) handleCreateAccount(w http.ResponseWriter, r *http.Request) error {
    var user User
    var reqFields CreateUserRequest

    err := json.NewDecoder(r.Body).Decode(&reqFields)
    if err != nil {
        log.Println(err)
        return err
    }

    user.Username = reqFields.Username
    user.Email = reqFields.Email
    user.Password = reqFields.Password

    if err = s.store.CreateUser(&user); err != nil {
        return err
    }
    
    return s.WriteJSON(w, http.StatusOK, user)
}

func (s *Server) handleGetUserPostsByUserId(w http.ResponseWriter, r *http.Request) error {
    userIdStr := r.PathValue("userId")
    userId, err := strconv.Atoi(userIdStr)
    if err != nil {
        log.Println(err)
        return err
    }

    var posts []*GetPostsRequest
    posts, err = s.store.GetUserPostsByUserId(userId)
    if err != nil {
        log.Println(err)
        return err
    }

    s.WriteJSON(w, http.StatusOK, posts)
    return nil
}

func (s *Server) handleGetUserFeedById(w http.ResponseWriter, r *http.Request) error {
    userIdStr := r.PathValue("userId")
    userId, err := strconv.Atoi(userIdStr)
    if err != nil {
        return err
    }
    
    var postsData []*GetPostsRequest
    postsData, err = s.store.GetUserFeed(userId)
    if err != nil {
        log.Println(err)
        return err
    }

    s.WriteJSON(w, http.StatusOK, postsData)
    return nil
}

func (s *Server) handleGetCommunityPosts(w http.ResponseWriter, r *http.Request) error {
    id, err := s.getId(r)
    if err != nil {
        return err
    }
    
    postsData, err := s.store.GetCommunityPosts(id)
    if err != nil {
        return err
    }

    s.WriteJSON(w, http.StatusOK, postsData)
    return nil
}

func (s *Server) getId(r *http.Request) (int, error) {
    idStr := r.PathValue("id")
    
    id, err := strconv.Atoi(idStr)
    if err != nil {
        return -1, fmt.Errorf("Invalid id %s", idStr)
    }

    return id, nil
}
