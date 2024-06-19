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
    AuthUser(string, string) (bool, *User, error)
    CreatePost(*CreatePostRequest) (*Post, error)
    CreateComment(*CreateCommentRequest) (*Post, error)
    GetPostById(int) (*GetPostsRequest, error)
    GetPostComments(int) ([]*GetPostsRequest, error)
    /*
    CreateComment(*Comment) error
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

func (s *MySQLStorage) GetPostById(id int) (*GetPostsRequest, error) {
    q := `
    SELECT post.id, title, body, app_user.username, app_user.id, community.id, community.community_name
    FROM post JOIN community ON post.community_id = community.id
    JOIN app_user ON post.user_id = app_user.id
    WHERE post.id = ?;
    `
    postsData, err := s.getPosts(q, id)
    if err != nil {
        return nil, err
    }

    return postsData[0], nil
}

func (s * MySQLStorage) GetPostComments(id int) ([]*GetPostsRequest, error) {
    q := `
    SELECT post.id, body, app_user.username, app_user.id, community.id, community.community_name
    FROM post JOIN community ON post.community_id = community.id
    JOIN app_user ON post.user_id = app_user.id
    WHERE post.parent_post_id = ?;
    `
    
    comments, err := s.getComments(q, id)
    if err != nil {
        return nil, err
    }

    return comments, nil
}

func (s * MySQLStorage) GetUserPostsByUserId(id int) ([]*GetPostsRequest, error) {
    q := `
    SELECT post.id, title, body, app_user.username, app_user.id, community.id, community.community_name
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
    SELECT post.id, title, body, app_user.username, app_user.id, community.id, community.community_name
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
    SELECT post.id, title, body, app_user.username, app_user.id, community.id, community.community_name
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

func (s *MySQLStorage) CreatePost(p *CreatePostRequest) (*Post, error) {
    q := "INSERT INTO post(user_id, community_id, post_type_id, title, body) VALUES (?, ?, 1, ?, ?);"

    result, err := s.db.Exec(q, p.UserId, p.CommunityId, p.Post.Title, p.Post.Body)
    if err != nil {
        return nil, err
    }

    postId, err := result.LastInsertId()
    if err != nil {
        return nil, err
    }

    post := &Post {
        Id: int(postId),
        Title: p.Post.Title,
        Body: p.Post.Body,
    }
    return post, nil
}

func (s *MySQLStorage) CreateComment(c *CreateCommentRequest) (*Post, error) {
    q := `INSERT INTO post(user_id, community_id, post_type_id, parent_post_id, body) VALUES (?, ?, 2, ?, ?);`

    result, err := s.db.Exec(q, c.UserId, c.CommunityId, c.ParentPostId, c.Body)
    if err != nil {
        return nil, err
    }

    commentId, err := result.LastInsertId()
    if err != nil {
        return nil, err
    }

    comment := &Post {
        Id: int(commentId),
        Title: "",
        Body: c.Body,
    }
    return comment, nil
}

func (s *MySQLStorage) AuthUser(email string, password string) (bool, *User, error) {
    q := `
    SELECT id, email, username FROM app_user
    WHERE email = ?
    AND password_hash = ?;
    `

    user := new(User)
    row := s.db.QueryRow(q, email, password)
    if err := row.Scan(&user.Id, &user.Email, &user.Username); err != nil {
        return false, nil, err
    }

    return true, user, nil
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
            &p.Post.Id,
            &p.Post.Title,
            &p.Post.Body,
            &p.User.Username,
            &p.User.Id,
            &p.Community.Id,
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

func (s *MySQLStorage) getComments(query string, v ... any) ([]*GetPostsRequest, error) {
    rows, err := s.db.Query(query, v...)
    if err != nil {
        log.Println(err)
        return nil, err
    }

    commentsData := make([]*GetPostsRequest, 0)
    for rows.Next() {
        p := new(GetPostsRequest)
        err := rows.Scan(
            &p.Post.Id,
            &p.Post.Body,
            &p.User.Username,
            &p.User.Id,
            &p.Community.Id,
            &p.Community.Name,
        )
        if err != nil {
            log.Println(err)
            return nil, err
        }
        p.Post.Title = ""

        commentsData = append(commentsData, p)
    }

    return commentsData, nil
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

