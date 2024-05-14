import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Comments from "../components/Comments";
import profile from "../assets/profile.png";
import VisualizePost from "../components/VisualizePost";

const ViewPost = () => {
  return (
    <div className="bg-black1 w-h-full flex p-6 justify-around">
      <LeftBar></LeftBar>
      <div className="w-6/12 rounded-3xl">
        <VisualizePost></VisualizePost>
        <Comments></Comments>
      </div>
      <RightBar></RightBar>
    </div>
  );
};

export default ViewPost;
