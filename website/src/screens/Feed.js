import Post from '../components/Post'
import {PostsSection} from '../components/PostsSection'
import LeftBar from '../components/LeftBar'
import RightBar from '../components/RightBar'
import CreateNewPost from '../components/CreateNewPost';
import {useParams} from "react-router-dom"
import {useState, useEffect} from "react"
import {BASE_URL} from "../backend_url"

function Feed() {
    const {userId} = useParams()
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            let response = await fetch(`${BASE_URL}/user/feed/1`);
            const posts = await response.json();
            setPosts(posts);
        }
        fetchPosts();
    }, [])


  return (
    <div className="bg-black1 w-h-full flex p-6 justify-around">
      <LeftBar></LeftBar>
      <div className='w-6/12 rounded-3xl'>
        <CreateNewPost></CreateNewPost>
        <PostsSection posts={posts}></PostsSection>
      </div>
      <RightBar></RightBar>
    </div>
  );
}

export default Feed;
