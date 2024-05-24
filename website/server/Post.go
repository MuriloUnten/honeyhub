package main


type Post struct {
    id int `json:"id"`
    title string `json:"title"`
    body string `json:"body"`
}

func (p *Post) Id() int {
    return p.id
}

func (p *Post) Title() string {
    return p.title
}

func (p *Post) Body() string {
    return p.body
}
