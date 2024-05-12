import beeHive from '../assets/beeHiveSingUp.png' 
import LoginForm from '../components/LoginForm';

const SingUp = () => {
    return (
        <div className='flex h-screen'>
            <img src={beeHive} className='w-5/12 h-full'></img>
            <div className='w-7/12 bg-black1 h-full flex'>
                <LoginForm />
            </div>
        </div>
    )
}

export default SingUp;