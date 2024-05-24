package main

import(
    "net/http"
    "encoding/json"
    "fmt"
    "log"
)


func (s *Server) handleRoutes(mux *http.ServeMux) {
    mux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "hello world\n")
    })

    mux.HandleFunc("GET /api/user/{id}", s.userDataHandler)
}


// TODO fix me. This is temporary and awful
func (s *Server) userDataHandler(w http.ResponseWriter, r *http.Request) {
    var username string
    var email string

    query := "SELECT username, email FROM app_user WHERE id=" + r.PathValue("id")
    fmt.Println(query)
    err := s.db.QueryRow(query).Scan(&username, &email)
    if err != nil {
        log.Fatal(err)
    }

    type tmpUser struct {
        Username string `json:"username"`
    }

    user := tmpUser{username}
    jsonData, err := json.Marshal(user)
    if err != nil {
        log.Fatal(err)
    }
    w.Write(jsonData)
}
