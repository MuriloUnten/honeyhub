package main

import(
    "net/http"
    "encoding/json"
    "fmt"
    "log"
    "strconv"
    "os"
)


func (s *Server) handleRoutes(mux *http.ServeMux) {
    mux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "hello world\n")
    })

    mux.HandleFunc("GET /api/user/{id}", s.getUserById)
    mux.HandleFunc("GET /api/media/{file}", s.getProfilePicture)
    mux.HandleFunc("POST /api/create-account", s.createAccount)
}


func (s *Server) getUserById(w http.ResponseWriter, r *http.Request) {
    var err error
    var id string = r.PathValue("id")
    var u User
    u.Id, err = strconv.Atoi(r.PathValue("id"))
    if err != nil {
        log.Println(err)
        w.WriteHeader(http.StatusBadRequest)
        return
    }

    query := "SELECT username, email, first_name, last_name, sex, profile_picture_path FROM app_user WHERE id=" + id
    err = s.db.QueryRow(query).Scan(&u.Username, &u.Email, &u.FirstName, &u.LastName, &u.Sex, &u.ProfilePicture)
    if err != nil {
        log.Fatal(err)
    }

    jsonData, err := json.Marshal(u)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Sending response: " + string(jsonData))
    w.WriteHeader(http.StatusOK)
    w.Write(jsonData)
}

func (s *Server) getProfilePicture(w http.ResponseWriter, r *http.Request) {
    // TODO would be good to implement some sanitization to avoid reading unwanted file
    fileName := r.PathValue("file")
    filePath := "../media/profile-pictures/" + fileName
    fileBytes, err := os.ReadFile(filePath)
    if err != nil {
        log.Println("could not read File.", err)
        w.WriteHeader(http.StatusInternalServerError) // Maybe not the correct status code
        return
    }

    w.WriteHeader(http.StatusOK)
    w.Header().Set("Content-Type", "application/octet-stream")
    w.Write(fileBytes)
}

func (s *Server) createAccount(w http.ResponseWriter, r *http.Request) {
    var user User
    var password string
    type tmpUser struct {
        Email string
        Username string
        Password string
    }
    var tmp tmpUser
    err := json.NewDecoder(r.Body).Decode(&tmp)
    if err != nil {
        log.Println(err)
        w.WriteHeader(http.StatusBadRequest)
        return
    }
    user.Username = tmp.Username
    user.Email = tmp.Email
    password = tmp.Password

    query := "INSERT INTO app_user(username, email, password_hash)"
    query += " VALUES " + " ('" + user.Username + "', '" + user.Email + "', '" + password + "');"
    fmt.Println(query)
    result, err := s.db.Exec(query)
    if err != nil {
        log.Println(err)
        w.WriteHeader(http.StatusBadRequest)
        return
    }
    id, _ := result.LastInsertId()
    user.Id = int(id)

    jsonData, err := json.Marshal(user)
    if err != nil {
        log.Fatal(err)
    }
    w.WriteHeader(http.StatusOK)
    w.Write(jsonData)
}
