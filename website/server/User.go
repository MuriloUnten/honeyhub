package main


type User struct {
    Id int `json:"id"`
    Email string `json:"email"`
    Username string `json:"username"`
    FirstName string `json:"firstName"`
    LastName string `json:"lastName"`
    Sex string `json:"sex"`
}

func (u *User) CreatePost() {

}

func (u *User) CreateComment() {

}

func (u *User) CreateCommunity() {

}

func (u *User) FollowCommunity() {

}

/*
func (u *User) Id() int {
    return u.id
}

func (u *User) Email() string {
    return u.email
}

func (u *User) Username() string {
    return u.username
}

func (u *User) FirstName() string {
    return u.firstName
}

func (u *User) LastName() string {
    return u.lastName
}

func (u *User) Sex() string {
    return u.sex
}
*/
