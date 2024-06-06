import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import {PostsSection} from "../components/PostsSection";
import CreateNewPost from "../components/CreateNewPost";
import CommunityHeader from "../components/CommunityHeader";
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {BASE_URL} from "../backend_url"

export const Community = () => {
    const {id} = useParams();

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            let response = await fetch(`${BASE_URL}/community/posts/${id}`);
            const posts = await response.json();
            setPosts(posts);
        }
        fetchPosts();
    }, [])

    return (
        <div className="bg-black1 w-h-full flex p-6 justify-around">
            <LeftBar></LeftBar>
            <div className='w-6/12 rounded-3xl'>
                <CommunityHeader />
                <CreateNewPost></CreateNewPost>
                <PostsSection posts={posts}/>
            </div>
            <RightBar></RightBar>
        </div>
    );
}
