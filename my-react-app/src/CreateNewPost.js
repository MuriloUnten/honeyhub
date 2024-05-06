import profile from './assets/profile.png'

const CreateNewPost = () => {
    return (
        <div className='w-full h-24 bg-black2 rounded-3xl mb-4 flex mx-auto'>
            <div className='flex mx-auto items-center'>
                <img src={profile} className='h-12'></img>
                <div className='h-10 rounded-3xl bg-black3 text-white w-96 flex items-center mx-4'>
                    <div className='m-4 text-base'>Write your new post here</div>
                </div>
                <div className='h-10 w-28 rounded-3xl text-center bg-main flex items-center'>
                    <div className='mx-auto text-lg'>Create</div> 
                </div>    
            </div> 
        </div>
    )
};

export default CreateNewPost;