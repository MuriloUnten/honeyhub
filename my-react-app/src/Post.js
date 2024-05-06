import profile from './assets/profile.png'
import beach from './assets/beach.jpg'
import upArrow from './assets/upArrow.png'
import comment from './assets/comment.png'
import share from './assets/share.png'

const Post = () => {
    return (
        <div className='w-6/12 h-96 bg-black2 rounded-3xl text-white px-8 py-2'>
            <div className='w-full flex my-2 items-center mb-2'>
                <img src={profile} className='w-8 h-8 mr-2'></img>
                <div className='w-4/12 h-full text-gray text-sm'>Murilo Kenji</div>
            </div>
            <div className='font-bold text-2xl text-white h-10 mb-1'>
                This is the post title
            </div>
            <div className='h-56'>
                <img src={beach} className='max-h-52'></img>
            </div>
            <div className='flex justify-between'>
                <div className='bg-black3 flex items-center px-3 py-2 rounded-xl'>
                    <img src={upArrow} className='w-5 rotate-180 mr-2'></img>
                    <div className='mr-2'>182</div>
                    <img src={upArrow} className='w-5'></img>
                </div>
                <div className='flex justify-end'>
                    <div className='w-20 bg-black3 flex items- justify-around px-2 py-2 rounded-xl mr-4'>
                        <img src={comment} className='w-6 mr-2'></img>
                        <div>12</div>
                    </div>   
                    <div className='w-10 bg-black3 flex items-center px-2 py-2 rounded-xl'>
                        <img src={share} className='w-6 mr-2'></img>
                    </div>    
                </div>
            </div>
        </div>
    )
};

export default Post;