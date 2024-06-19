import leftArrow from "../assets/leftArrow.png"
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import beach from '../assets/beach.jpg';
import comment from '../assets/comment.png'
import share from '../assets/share.png'
import upArrow from '../assets/upArrow.png'
import { useState } from "react";
import { BASE_URL } from "../backend_url";

const CreateCommentForm = ({ communityId, parentPostId }) => {

    const [comment, setComment] = useState()

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("handling submit")

        var idLocalStorage = localStorage.getItem("userId")

        if (idLocalStorage == null) {
            console.log("Couldn't find id")
            idLocalStorage = 1
        } else {
            idLocalStorage = parseInt(idLocalStorage)
            console.log("Login id", idLocalStorage)
        }

        const postData = {
            body: comment,
            parentPostId: parentPostId,
            userId: idLocalStorage,
            communityId: communityId
        };

        console.log(postData)

        try {
            const response = await fetch(BASE_URL + "/comment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(response)

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className="w-full bg-black2 rounded-3xl px-8 py-2 mb-4 flex items-center">
            <form onSubmit={handleSubmit} className="w-full flex justify-around mb-3">
                <div className="h-10 rounded-3xl bg-black3 text-white w-7/12 flex items-center mt-2">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter the comment"
                        className="w-full h-full text-black1 rounded-3xl p-5"
                    />
                </div>
                <div className='h-10 w-1/4 rounded-3xl text-center bg-main flex items-center justify-around ml-4 mt-2'>
                    <button type="submit" className=" text-lg h-11 rounded-3xl">Comment</button>
                </div>   
            </form>
    </div>
    
    )
};

export default CreateCommentForm;