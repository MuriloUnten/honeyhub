import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import ViewProfile from "../components/ViewProfile";

const Profile = () => {
    return (
        <div className="bg-black1 w-h-full flex p-6 justify-around">
            <LeftBar></LeftBar>
            <div className='w-6/12 rounded-3xl'>
            <ViewProfile></ViewProfile>
            </div>            
            <RightBar></RightBar>
        </div>
    )
}

export default Profile;