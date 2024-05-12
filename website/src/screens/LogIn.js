import beeHive from '../assets/beeHiveLogIn.png' 
import LogInForm from '../components/LogInForm';

const LogIn = () => {
    return (
        <div className='flex h-screen'>
            <div className='w-7/12 bg-black1 h-full flex'>
                <LogInForm />
            </div>
            <img src={beeHive} className='w-5/12 h-full'></img>
        </div>
    )
}

export default LogIn;