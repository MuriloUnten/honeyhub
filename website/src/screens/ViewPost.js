import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Comments from "../components/Comments";
import VisualizePost from "../components/VisualizePost";
import CreateCommentForm from "../components/CreateCommentForm";
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import { BASE_URL } from "../backend_url";

const ViewPost = () => {

  const [comments, setComments] = useState([]);
  const [communityId, setCommunityId] = useState(0);
  const [postId, setPostId] = useState(0);
    const {id} = useParams()

  useEffect(() => {
    fetch(BASE_URL + '/post/' + id + '/comments') // Replace '/api/comments' with the actual endpoint
      .then(response => response.json())
      .then(data => setComments(data))
      .catch(error => console.error('Error fetching comments:', error));
  }, []);
  useEffect(() => {
    if (comments[0]) {
      setCommunityId(comments[0].community.id)
      setPostId(parseInt(id))
    }
  }, [comments])

  return (
    <div className="bg-black1 w-h-full flex p-6 justify-around">
      <LeftBar></LeftBar>
      <div className="w-6/12 rounded-3xl">
        <VisualizePost></VisualizePost>
        <CreateCommentForm communityId={communityId} parentPostId={postId}></CreateCommentForm>
        <CommentList comments={comments}></CommentList>
      </div>
      <RightBar></RightBar>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => <Comments comment={comment} />)
      ) : (
        <div className="text-white">No comments yet.</div>
      )}
    </div>
  );
};


export default ViewPost;
