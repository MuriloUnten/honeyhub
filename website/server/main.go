package main

import (
    _ "github.com/go-sql-driver/mysql"
    _ "database/sql"
    "net/http"
    "fmt"
    "log"
)


func main() {
    mux := http.NewServeMux()

    mux.HandleFunc("/api/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintf(w, "hello world\n")
    })

    err := http.ListenAndServe("localhost:3001", mux)
    if err != nil {
        log.Fatal(err)
    }
}
