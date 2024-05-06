import logo from './logo.svg';
import './App.css';
import Post from './Post'
import LeftBar from './LeftBar'
import RightBar from './RightBar'

function App() {
  return (
    <div className="bg-gray-950 w-screen h-screen flex p-6 justify-around">
      <LeftBar></LeftBar>
      <Post></Post>
      <RightBar></RightBar>
    </div>
  );
}

export default App;
