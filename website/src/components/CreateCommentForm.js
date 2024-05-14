import leftArrow from "../assets/leftArrow.png"
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import beach from '../assets/beach.jpg';
import comment from '../assets/comment.png'
import share from '../assets/share.png'
import upArrow from '../assets/upArrow.png'

const CreateCommentForm = () => {
    return (
        <div className="w-full bg-black2 rounded-3xl px-8 py-2 mb-4 flex items-center">
        <div className='h-10 rounded-3xl bg-black3 text-white w-full flex items-center mt-2'>
            <div className='m-4 text-base'>Write your new comment here</div>
        </div>
        <div className='h-10 w-28 rounded-3xl text-center bg-main flex items-center justify-around ml-4'>
            <div className='mx-auto text-lg font-bold'>Comment</div> 
        </div>   
    </div>
    
    )
};

export default CreateCommentForm;