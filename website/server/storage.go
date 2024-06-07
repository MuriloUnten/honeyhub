package main

import (
	"database/sql"
	"fmt"
	"log"
	"syscall"

	"golang.org/x/term"
)


type Storage interface {
    CreateUser(*User) error
    GetUserById(int) (*User, error)
    GetProfilePicPathById(int) (string, error)
    GetUserPostsByUserId(int) ([]*GetPostsRequest, error)
    GetUserFeed(int) ([]*GetPostsRequest, error)
    GetCommunityPosts(int) ([]*GetPostsRequest, error)
    AuthUser(string, string) (bool, error)
    /*
    CreatePost(*Post) error
    GetPostById(int) (*Post, error)
    CreateComment(*Comment) error
    GetPostComments(int) ([]*Post, error)
    */
}

type MySQLStorage struct {
    db *sql.DB
}

func NewMySQLStorage() (*MySQLStorage, error) {
    user, password := authenticate()
    connection := user + ":" + password + "@/" + DB_NAME

    db, err := sql.Open("mysql", connection)
    if err != nil {
        return nil, err
    }

    return &MySQLStorage{db: db}, nil
}

func (s *MySQLStorage) CreateUser(u *User) error {
    q := `INSERT INTO app_user(username, email, password_hash) VALUES (?, ?, ?);`

    result, err := s.db.Exec(q, u.Username, u.Email, u.Password)
    if err != nil {
        log.Println(err, "here")
        return err }
    
    id, _ := result.LastInsertId()
    u.Id = int(id)
    return nil
}

func (s *MySQLStorage) GetUserById(id int) (*User, error) {
    u := new(User)
    q := `
    SELECT
    username, email, first_name, last_name, sex, profile_picture_path
    FROM app_user
    WHERE id = ?;`

    err := s.db.QueryRow(q, id).Scan(
        &u.Username,
        &u.Email,
        &u.FirstName,
        &u.LastName,
        &u.Sex,
        &u.ProfilePicture)

    if err != nil {
        return nil, err
    }

    u.Id = id
    return u, nil
}

func (s *MySQLStorage) GetProfilePicPathById(id int) (string, error) {
    var path string
    q := "SELECT profile_picture_path FROM app_user WHERE id = ?"
    err := s.db.QueryRow(q, id).Scan(&path)
    if err != nil {
        return "", err
    }
    
    return path, nil
}

func (s * MySQLStorage) GetUserPostsByUserId(id int) ([]*GetPostsRequest, error) {
    q := `
    SELECT title, body, app_user.username, app_user.id, community.community_name
    FROM post JOIN community ON post.community_id = community.id
    JOIN app_user ON post.user_id = app_user.id
    WHERE user_id = ? AND post_type_id = 1;
    `
    postsData, err := s.getPosts(q, id)
    if err != nil {
        return nil, err
    }

    return postsData, nil
}

func (s *MySQLStorage) GetUserFeed(id int) ([]*GetPostsRequest, error) {
    q := `
    SELECT title, body, app_user.username, app_user.id, community.community_name
    FROM post JOIN community ON post.community_id = community.id
    JOIN app_user ON post.user_id = app_user.id
    WHERE community_id IN
    (SELECT community_id FROM community_follower WHERE user_id = ?)
    AND post_type_id = 1;
    `

    postsData, err := s.getPosts(q, id)
    if err != nil {
        return nil, err
    }

    return postsData, nil
}

func (s *MySQLStorage) GetCommunityPosts(id int) ([]*GetPostsRequest, error) {
    q := `
    SELECT title, body, app_user.username, app_user.id, community.community_name
    FROM post JOIN community ON post.community_id = community.id
    JOIN app_user ON post.user_id = app_user.id
    WHERE community.id = ?
    AND post_type_id = 1;
    `

    postsData, err := s.getPosts(q, id)
    if err != nil {
        return nil, err
    }

    return postsData, nil
}

func (s *MySQLStorage) AuthUser(username string, password string) (bool, error) {
    q := `
    SELECT id FROM app_user
    WHERE username = ?
    AND password = ?;
    `

    var id int
    row := s.db.QueryRow(q, username, password)
    if err := row.Scan(&id); err != nil {
        return false, err
    }

    return true, nil
}

func (s *MySQLStorage) getPosts(query string, v ... any) ([]*GetPostsRequest, error) {
    rows, err := s.db.Query(query, v...)
    if err != nil {
        log.Println(err)
        return nil, err
    }

    postsData := make([]*GetPostsRequest, 0)
    for rows.Next() {
        p := new(GetPostsRequest)
        err := rows.Scan(
            &p.Post.Title,
            &p.Post.Body,
            &p.User.Username,
            &p.User.Id,
            &p.Community.Name,
        )
        if err != nil {
            log.Println(err)
            return nil, err
        }

        postsData = append(postsData, p)
    }

    return postsData, nil
}

func authenticate() (user string, password string) {

    fmt.Print("database user: ")
    fmt.Scan(&user)

    fmt.Print("database password: ")
    bytePassword, err := term.ReadPassword(int(syscall.Stdin))
    if err != nil {
        log.Fatal("Could not read database password.", err)
        return
    }

    password = string(bytePassword)
    return 
}

