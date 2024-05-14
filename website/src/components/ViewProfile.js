import profile from '../assets/profile.png';

const ViewProfile = () => {
    return (
        <div className='w-full h-80 bg-black2 rounded-3xl px-8 py-2 mb-4'>

            <div className='h-40'>
                <img src={profile} className='max-h-40'></img>
            </div>
            <div className='ml-4'> 
                <div className='font-bold text-3xl text-white mb-1'>
                    username_
                </div>
            </div>
            <div className='mt-10'>
                <ul className="flex justify-between space-x-4">
                    <li className="font-bold text-2xl text-white hover:underline cursor-pointer">Overview</li>
                    <li className="font-bold text-2xl text-white hover:underline cursor-pointer">Posts</li>
                    <li className="font-bold text-2xl text-white hover:underline cursor-pointer ">Comments</li>
                    <li className="font-bold text-2xl text-white hover:underline cursor-pointer ">Upvoted</li>
                    <li className="font-bold text-2xl text-white hover:underline cursor-pointer ">Downvoted</li>
                </ul>
            </div>
        </div>
        
        
    );
};

export default ViewProfile;
