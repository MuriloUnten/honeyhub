import beeHive from '../assets/beeHiveSingUp.png' 
import SignUpForm from '../components/SignUpForm';
import {redirect} from "react-router-dom"

const BASE_URL = "http://localhost:3001/api"

const SingUp = () => {
    return (
        <div className='flex h-screen'>
            <img src={beeHive} className='w-5/12 h-full'></img>
            <div className='w-7/12 bg-black1 h-full flex'>
                <SignUpForm />
            </div>
        </div>
    )
}

export default SingUp;

export const signUpAction = async ({request}) => {
    const data = await request.formData()
    const submission = {
        email: data.get("email"),
        username: data.get("username"),
        password: data.get("password") // TODO Fix me (Terporary abomination)
    }
    console.log(submission)

    const response = await fetch(BASE_URL + "/create-account", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(submission)
    })

    console.log(response)
    const jsonResponse = await response.json()
    console.log(jsonResponse)
    return redirect(`/profile/${jsonResponse.id}`)
}
