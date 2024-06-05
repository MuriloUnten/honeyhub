import Post from "./Post";

export const PostsSection = (props) => {

    function assemblePosts(array) {
        let postsJSX = [];
        array.forEach((object) => {
            postsJSX.push(Post(object));
        })
        return postsJSX;
    }

    let posts = assemblePosts(props.posts);

    return (
        <div>
            {posts}
        </div>
    );
};

