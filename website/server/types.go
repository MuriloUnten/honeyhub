package main

type CreateUserRequest struct {
    Username string `json:"username"`
    Email    string `json:"email"`
    Password string `json:"password"`
}

type GetPostRequest struct {
    Id    int    `json:"id"`
    Title string `json:"title"`
    Body  string `json:"body"`
}

type GetUserRequest struct {
    Id       int    `json:"id"`
    Username string `json:"username"`
}

type GetCommunityRequest struct {
    Id   int    `json:"id"`
    Name string `json:"name"`
}

type GetPostsRequest struct {
    Post      GetPostRequest      `json:"post"`
    User      GetUserRequest      `json:"user"`
    Community GetCommunityRequest `json:"community"`
}

type CreatePostRequest struct {
    Post        GetPostRequest `json:"post"`
    UserId      int            `json:"userId"`
    CommunityId int            `json:"communityId"`
}

type CreateCommentRequest struct {
    Body         string `json:"body"`
    UserId       int    `json:"userId"`
    CommunityId  int    `json:"communityId"`
    ParentPostId int    `json:"parentPostId"`
}

type LoginResponse struct {
    Id    int    `json:"id"`
    Token string `json:"jwtToken"`
}

type SignupResponse struct {
    User  User `json:"user"`
    Token string `json:"jwtToken"`
}
