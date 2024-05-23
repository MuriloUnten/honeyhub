package main

import (
    "fmt"
    "log"
    "net/http"
    _ "github.com/go-sql-driver/mysql"
    "database/sql"
    "syscall"
    "golang.org/x/term"
)

const DB_NAME string = "honeyhub"


type Server struct {
    db *sql.DB
}


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
    fmt.Fprintf(w, "username: %s\n", username)
    fmt.Fprintf(w, "email: %s\n", email)
}


func (s *Server) runServer() {
    s.db = s.connectDB()
    defer s.db.Close()
    fmt.Println("\nDatabase", DB_NAME, "connected")

    mux := http.NewServeMux()
    s.handleRoutes(mux)

    err := http.ListenAndServe("localhost:3001", mux)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Server running on port 3001")
}


func (s *Server) connectDB() *sql.DB {
    var user string
    var password string

    fmt.Print("database user: ")
    fmt.Scan(&user)

    fmt.Print("database password: ")
    bytePassword, err := term.ReadPassword(int(syscall.Stdin))
    if err != nil {
        log.Fatal("Could not read database password.", err)
        return nil
    }
    password = string(bytePassword)

    connectString := user + ":" + password + "@/" + DB_NAME
    db, err := sql.Open("mysql", connectString)
    if err != nil {
        log.Fatal(err)
        return nil
    }

    return db
}
