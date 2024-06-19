package main

import (
    "fmt"
    "log"
    "net/http"
    "github.com/rs/cors"
    _ "github.com/go-sql-driver/mysql"
)

const DB_NAME string = "honeyhub"


type Server struct {
    store Storage
}

func (s *Server) runServer() {
    var err error
    s.store, err = NewMySQLStorage()
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println("\nDatabase", DB_NAME, "connected")

    mux := http.NewServeMux()
    s.handleRoutes(mux)
    c := cors.New(cors.Options{
        AllowedOrigins: []string{
            "http://localhost:3000",
        },
        AllowCredentials: true,
        AllowedHeaders: []string {"*"},
    })
    handler := c.Handler(mux)

    err = http.ListenAndServe("localhost:3001", handler)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println("Server running on port 3001")
}
