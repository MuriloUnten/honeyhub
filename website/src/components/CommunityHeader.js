import banner from "../assets/utfpr-placeholder.png"
import icon from "../assets/utfpr-icon-placeholder.jpg"

const CommunityHeader = () => {
    return (
        <div className='w-full h-92 bg-black2 rounded-3xl mb-4 flex flex-col mx-auto'>
            <div className='w-full h-32 px-4 pt-4'>
                <div className='w-full h-full'>
                    <img src={banner} className='h-full w-full rounded-2xl overflow-hidden'></img>
                </div>
            </div> 
            <div className='w-full flex px-8 py-3 justify-between items-center'>
                <div className='h-14 flex justify-between items-center'>
                    <img src={icon} className='h-full rounded-xl '></img>
                    <div className='text-3xl font-semibold align-text-top pl-5 items-center'>h/utfpr</div>
                </div>
                <div className='bg-main rounded-3xl h-10 w-24 flex items-center text-center justify-end'>
                    <button className='text-lg mx-auto' >Follow</button>
                </div>
            </div>
        </div> 
    );
};

export default CommunityHeader;
