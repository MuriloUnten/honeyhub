import CreatePostForm from "../components/createPostForm";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";

const CreatePost = () => {
    return (
        <div className="bg-black1 flex justify-around w-screen h-screen pt-6">
            <LeftBar></LeftBar> 
            <CreatePostForm></CreatePostForm>            
            <RightBar></RightBar>
        </div>
    )
}

export default CreatePost;