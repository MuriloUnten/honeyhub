package main


type Post struct {
    id int
    title string
    body string
}

func (p Post) Id() int {
    return p.id
}

func (p Post) Title() string {
    return p.title
}

func (p Post) Body() string {
    return p.body
}
