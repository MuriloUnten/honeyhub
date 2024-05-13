import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import {PostsSection} from "../components/PostsSection";
import CreateNewPost from "../components/CreateNewPost";
import CommunityHeader from "../components/CommunityHeader";

export const Community = () => {
    return (
        <div className="bg-black1 w-h-full flex p-6 justify-around">
            <LeftBar></LeftBar>
            <div className='w-6/12 rounded-3xl'>
                <CommunityHeader />
                <CreateNewPost></CreateNewPost>
                <PostsSection />
            </div>
            <RightBar></RightBar>
        </div>
    );
}
