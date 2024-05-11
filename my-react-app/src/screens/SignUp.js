import beeHive from '../assets/beeHiveSingUp.png' 
import Form from '../components/Form';

const SingUp = () => {
    return (
        <div className='flex h-screen'>
            <img src={beeHive} className='w-5/12 h-full'></img>
            <div className='w-7/12 bg-black1 h-full flex'>
                <div className='m-auto'>
                    <h1 className='text-white font-bold text-6xl mx-auto mb-4'>Join the hive!</h1>
                    <Form title='Email' className="m-auto"/>
                </div>
            </div>
        </div>
    )
}

export default SingUp;