package main

import (
    "fmt"
    "log"
    "net/http"
)


type Server struct {
    
}

func (Server) Run() {
    mux := http.NewServeMux()

    mux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "hello world\n")
    })

    err := http.ListenAndServe("localhost:3001", mux)
    if err != nil {
        log.Fatal(err)
    }
}
