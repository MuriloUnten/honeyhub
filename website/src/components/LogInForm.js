import {Link} from "react-router-dom"

const LogInForm = () => {
    return (
        <div className="m-auto">
            <form>
                <h1 className='text-white font-bold text-6xl mx-auto mb-12'>Welcome back!</h1>

                <div className="mb-8">
                    <div className="text-white mb-1 ml-2 text-xl">Email</div>
                    <input type="text" placeholder="Enter your email" className="w-full h-11 rounded-3xl p-5"></input>
                </div>
                <div className="mb-8">
                    <div className="text-white mb-1 ml-2 text-xl">Password</div>
                    <input type="password" placeholder="Enter your password" className="w-full h-11 rounded-3xl p-5"></input>
                </div>
               <div className="">
                    <button type="submit" className="bg-main text-lg w-full h-11 rounded-3xl mb-2">Log In</button>
                    <div className="flex">
                        <div className="flex text-white m-auto">
                            <div className="w-auto mr-1">Don’t have an account yet?</div>
                            <div className="text-main mr-2"><Link to={`/signup`}> Sign up </Link></div>
                        </div>
                    </div>
                    </div>
            </form>
        </div>
    )
}

//<div className="bg-black2 text-black3 h-11 flex items-center rounded-xl">{placeHolder}</div>
export default LogInForm;
