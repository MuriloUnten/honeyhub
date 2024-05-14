import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Comments from "../components/Comments";
import VisualizePost from "../components/VisualizePost";
import CreateCommentForm from "../components/CreateCommentForm";

const ViewPost = () => {
  return (
    <div className="bg-black1 w-h-full flex p-6 justify-around">
      <LeftBar></LeftBar>
      <div className="w-6/12 rounded-3xl">
        <VisualizePost></VisualizePost>
        <CreateCommentForm></CreateCommentForm>
        <Comments></Comments>
      </div>
      <RightBar></RightBar>
    </div>
  );
};

export default ViewPost;
