package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	jwt "github.com/golang-jwt/jwt/v5"
)

const (
    JWT_SECRET = "12345678"
)


type apiFunc func (w http.ResponseWriter, r *http.Request) error

type ApiError struct {
    Error string `json:"error"`
}

func (s *Server) handleRoutes(mux *http.ServeMux) {
    mux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "hello world\n")
    })

    mux.HandleFunc("GET /api/user/{id}", s.makeHTTPHandlerFunc(s.handleGetUserById))
    mux.HandleFunc("GET /api/profile-picture/{id}", s.makeHTTPHandlerFunc(s.handleGetProfilePictureById))
    mux.HandleFunc("GET /api/user/feed/{id}", s.makeHTTPHandlerFunc(s.handleGetUserFeedById))
    mux.HandleFunc("POST /api/create-account", s.makeHTTPHandlerFunc(s.handleCreateAccount))
    mux.HandleFunc("GET /api/posts/user/{id}", s.makeHTTPHandlerFunc(s.handleGetUserPostsByUserId))
    mux.HandleFunc("GET /api/community/posts/{id}", s.makeHTTPHandlerFunc(s.handleGetCommunityPosts))
    mux.HandleFunc("GET /api/auth", s.makeHTTPHandlerFunc(s.handleUserAuth))
    mux.HandleFunc("GET /api/post/{id}", s.makeHTTPHandlerFunc(s.handleCreatePost))
    mux.HandleFunc("POST /api/post", s.makeHTTPHandlerFunc(s.handleCreatePost))
    mux.HandleFunc("GET /api/post/{id}/comments", s.makeHTTPHandlerFunc(s.handleGetComments))
    mux.HandleFunc("POST /api/comment", s.makeHTTPHandlerFunc(s.handleCreateComment))
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

    tokenString, err := s.createJWT(&user)
    if err != nil {
        log.Println(err)
        return err
    }

    fmt.Println("token: " + tokenString)
    
    return s.WriteJSON(w, http.StatusOK, user)
}

func (s *Server) handleGetUserPostsByUserId(w http.ResponseWriter, r *http.Request) error {
    userId, err := s.getId(r)
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
    userId, err := s.getId(r)
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

func (s *Server) handleGetPostById(w http.ResponseWriter, r *http.Request) error {
    id, err := s.getId(r)
    if err != nil {
        return err
    }

    post, err := s.store.GetPostById(id)
    if err != nil {
        return err
    }

    s.WriteJSON(w, http.StatusOK, post)
    return nil
}

func (s *Server) handleGetComments(w http.ResponseWriter, r *http.Request) error {
    return nil
}

func (s *Server) handleCreatePost(w http.ResponseWriter, r *http.Request) error {
    var postData CreatePostRequest
    err := json.NewDecoder(r.Body).Decode(&postData)
    if err != nil {
        log.Println(err)
        return err
    }

    post, err := s.store.CreatePost(&postData)
    if err != nil {
        log.Println(err)
        return err
    }

    s.WriteJSON(w, http.StatusOK, post)
    return nil
}

func (s *Server) handleCreateComment(w http.ResponseWriter, r *http.Request) error {
    var commentData CreateCommentRequest
    err := json.NewDecoder(r.Body).Decode(&commentData)
    if err != nil {
        log.Println(err)
        return err
    }

    comment, err := s.store.CreateComment(&commentData)
    if err != nil {
        log.Println(err)
        return err
    }

    s.WriteJSON(w, http.StatusOK, comment)
    return nil
}

func (s *Server) handleUserAuth(w http.ResponseWriter, r *http.Request) error {
    email, password, ok := r.BasicAuth()
    if !ok {
        return fmt.Errorf("failed to authenticate.")
    }

    authenticated, user, err := s.store.AuthUser(email, password)
    if err != nil {
        return err
    }

    if !authenticated {
        log.Println(err)
        return fmt.Errorf("failed to authenticate.")
    }

    tokenString, err := s.createJWT(user)
    if err != nil {
        log.Println(err)
        return fmt.Errorf("failed to authenticate.")
    }

    response := LoginResponse{Id: user.Id, Token: tokenString}
    s.WriteJSON(w, http.StatusOK, response)
    return nil
}

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

func (s *Server) makeHTTPHandlerFunc(f apiFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        if err := f(w, r); err != nil {
            s.WriteJSON(w, http.StatusBadRequest, ApiError{Error: err.Error()})
        }

    }
}

func (s *Server) withJWTAuth(handler http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        tokenString := r.Header.Get("jwt-token")
        token, err := s.validateJWT(tokenString)
        if err != nil {
            s.permissionDenied(w)
            return
        }
        if !token.Valid {
            s.permissionDenied(w)
            return 
        }
        userId, err := s.getId(r)
        if err != nil {
            s.permissionDenied(w)
            return
        }
        user, err := s.store.GetUserById(userId)
        if err != nil {
            s.permissionDenied(w)
            return
        }

        claims := token.Claims.(jwt.MapClaims)
        if user.Id != int(claims["ID"].(float64)) {
            s.permissionDenied(w)
            return
        }

        handler(w, r)
    }
}

func (s *Server) permissionDenied(w http.ResponseWriter) {
    s.WriteJSON(w, http.StatusForbidden, ApiError{Error: "permission denied"})
}

func (s *Server) createJWT(user *User) (string, error) {
    claims := &jwt.MapClaims{
        "ID": user.Id,
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

    return token.SignedString([]byte(JWT_SECRET))
}

func (s *Server) validateJWT(tokenString string) (*jwt.Token, error) {
    return jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
        }

        return []byte(JWT_SECRET), nil
    })
}


func (s *Server) getId(r *http.Request) (int, error) {
    idStr := r.PathValue("id")
    
    id, err := strconv.Atoi(idStr)
    if err != nil {
        return -1, fmt.Errorf("Invalid id %s", idStr)
    }

    return id, nil
}
