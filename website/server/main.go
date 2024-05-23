package main

import (
    _ "github.com/go-sql-driver/mysql"
    _ "database/sql"
)


func main() {
    var server Server
    server.Run()
}
