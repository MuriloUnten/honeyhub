package main

import (
    "fmt"
    "log"
    "net/http"
    "github.com/rs/cors"
    _ "github.com/go-sql-driver/mysql"
    "database/sql"
    "syscall"
    "golang.org/x/term"
)

const DB_NAME string = "honeyhub"


type Server struct {
    db *sql.DB
}


func (s *Server) runServer() {
    s.db = s.connectDB()
    defer s.db.Close()
    fmt.Println("\nDatabase", DB_NAME, "connected")

    mux := http.NewServeMux()
    s.handleRoutes(mux)
    c := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:3000"},
    })
    handler := c.Handler(mux)

    err := http.ListenAndServe("localhost:3001", handler)
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
