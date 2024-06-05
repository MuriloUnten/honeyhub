package main

type CreateUserRequest struct {
    Username string `json:"username"`
    Email    string `json:"email"`
    Password string `json:"password"`
}

type GetPostRequest struct {
    Title string `json:"title"`
    Body string  `json:"body"`
}

type GetUserRequest struct {
    Id int         `json:"id"`
    Username string `json:"username"`
}

type GetCommunityRequest struct {
    Name string `json:"name"`
}

type GetPostsRequest struct {
    Post GetPostRequest `json:"post"`
    User GetUserRequest `json:"user"`
    Community GetCommunityRequest `json:"community"`
}
