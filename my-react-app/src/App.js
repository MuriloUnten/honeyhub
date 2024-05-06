import logo from './logo.svg';
import './App.css';
import Post from './Post'
import LeftBar from './LeftBar'
import RightBar from './RightBar'
import CreateNewPost from './CreateNewPost';

function App() {
  return (
    <div className="bg-black1 w-full h-full flex p-6 justify-around">
      <LeftBar></LeftBar>
      <div className='w-6/12 rounded-3xl'>
        <CreateNewPost></CreateNewPost>
        <Post></Post>
        <Post></Post>
      </div>
      <RightBar></RightBar>
    </div>
  );
}

export default App;
