import Post from '../components/Post'
import {PostsSection} from '../components/PostsSection'
import LeftBar from '../components/LeftBar'
import RightBar from '../components/RightBar'
import CreateNewPost from '../components/CreateNewPost';

function Feed() {
  return (
    <div className="bg-black1 w-h-full flex p-6 justify-around">
      <LeftBar></LeftBar>
      <div className='w-6/12 rounded-3xl'>
        <CreateNewPost></CreateNewPost>
        <PostsSection />
      </div>
      <RightBar></RightBar>
    </div>
  );
}

export default Feed;
