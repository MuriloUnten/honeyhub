import React, { useState } from 'react';
import leftArrow from "../assets/leftArrow.png";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import beach from '../assets/beach.jpg';
import comment from '../assets/comment.png';
import share from '../assets/share.png';
import upArrow from '../assets/upArrow.png';

const VisualizePost = () => {
  const [upVotes, setUpVotes] = useState(182);
    const [upVoted, setUpVoted] = useState(false);
    const [downVoted, setDownVoted] = useState(false);
    const [originalState, setOriginal] = useState(true);

    const incrementVotes = () => {
        if (originalState) {
            setUpVotes(upVotes + 1);
            setUpVoted(true);
            setDownVoted(false);
            setOriginal(false);
        }
        else{
            if(downVoted){
                setUpVotes(upVotes + 1);
                setUpVoted(false);
                setOriginal(true);
            }
        }
    };

    const decreaseVotes = () => {
        if (originalState) {
            setUpVotes(upVotes - 1);
            setUpVoted(false);
            setDownVoted(true);
            setOriginal(false);
        }
        else{
            if(upVoted){
                setUpVotes(upVotes - 1);
                setUpVoted(false);
                setOriginal(true);
            }
        }
    };

  return (
    <div className="w-full bg-black2 rounded-3xl px-8 py-2 mb-4">
      <div className="mt-8 h-16 flex items-center">
        <Link to="/"><img src={leftArrow} className="max-h-16"></img></Link>
        <Link to="/profile"><img src={profile} className="max-h-16 ml-8"></img></Link>     
        <Link to="/profile"><div className="text-white font-bold text-xl ml-4">username</div></Link>          
      </div>
      <div className=' text-2xl text-white h-10 mb-1 mt-8'>
        This is the post title
      </div>
      <div className='flex justify-between mt-6 mb-4'>
        <div className='bg-black3 flex items-center px-3 py-2 rounded-xl'>
            <img src={upArrow} className='w-5 rotate-180 mr-2'onClick={incrementVotes}></img>
            <div className='mr-2 text-white'>{upVotes}</div>
            <img src={upArrow} className='w-5 cursor-pointer'onClick={decreaseVotes}></img>
        </div>
        <div className='flex justify-end'>
          <div className='w-20 bg-black3 flex items-center justify-around px-2 py-2 rounded-xl mr-4'>
            <img src={comment} className='w-6 mr-2'></img>
            <div className='text-white'>12</div>
          </div>   
          <div className='w-10 bg-black3 flex items-center justify-center px-2 py-2 rounded-xl'>
              <img src={share} className='w-6 mr-2'></img>
          </div>    
        </div>
      </div>
    </div>
  );
};

export default VisualizePost;
