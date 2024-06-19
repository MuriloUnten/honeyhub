import {Link} from "react-router-dom"
import noProfilePicture from '../assets/profile.png'
import beach from '../assets/beach.jpg'
import upArrow from '../assets/upArrow.png'
import comment from '../assets/comment.png'
import share from '../assets/share.png'
import communityIcon from '../assets/utfpr-icon-placeholder.jpg'
import {useState, useEffect} from "react"
import {BASE_URL} from "../backend_url"

const Post = (props) => {
    const [profilePicture, setProfilePicture] = useState(noProfilePicture)
    useEffect(() => {
        if(props.user.profilePicture != "") {
            setProfilePicture(`${BASE_URL}/profile-picture/${props.user.id}`)
        }
    })

    return (
        //<div className='w-full h-96 bg-black2 rounded-3xl text-white px-8 py-2'>
        <Link to={'/view-post/' + props.post.id}>
        <div className='w-full h-auto bg-black2 rounded-3xl px-8 py-2 mb-4'>
            <div>
                <Link to={'/community/' + props.community.id} className='w-36 flex my-2 items-center mb-2'>
                    <img src={communityIcon} className='rounded-full w-8 h-8 mr-2'></img>
                    <div className='w-4/12 h-full text-gray text-sm'>{props.community.name}</div>
                </Link>
            </div>
            <div>
                <Link to={'/profile/' + props.user.id} className='w-36 flex my-2 items-center mb-2'>
                    <img src={profilePicture} className='rounded-full w-6 h-6 mr-2'></img>
                    <div className='w-4/12 h-full text-gray text-sm'>{props.user.username}</div>
                </Link>
            </div>
            <div className='font-bold text-2xl text-white h-10 mb-1'>
                <Link to={'/view-post/' + props.post.id}> 
                    {props.post.title}
                </Link>
            </div>
            <div className='text-2l text-white h-full mb-1'>
                <Link to={'/view-post/' + props.post.id}> 
                    {props.post.body}
                </Link>
            </div>
            <div className='h-8'>
        </div>
            <div className='flex justify-between mb-1'>
                <div className='bg-black3 flex items-center px-3 py-2 rounded-xl'>
                    <img src={upArrow} className='w-5 rotate-180 mr-2'></img>
                    <div className='mr-2 text-white'>0</div>
                    <img src={upArrow} className='w-5'></img>
                </div>
                <div className='flex justify-end'>
                    <div className='w-12 bg-black3 flex items- justify-around px-2 py-2 rounded-xl'>
                        <img src={comment} className='w-6 mx-1'></img>
                    </div>   
                </div>
            </div>
        </div>
        </Link>
    )
};

export default Post;
