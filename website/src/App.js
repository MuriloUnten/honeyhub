import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from "react-router-dom"

import Feed from "./screens/Feed";  
import SignUp, {signUpAction} from "./screens/SignUp";
import LogIn, {logInAction} from "./screens/LogIn";
import CreatePost from "./screens/CreatePost";
import { Community } from "./screens/Community"
import Profile from "./screens/Profile";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
        <Route path="/" element={<Feed />} /> 
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<LogIn />} action={logInAction} /> 
        <Route path="/signup" element={<SignUp />} action={signUpAction} />
        <Route path="/create-post" element={<CreatePost />} /> 
        <Route path="/community" element={<Community />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        </>
    )
);

function App() {
    return (
        <RouterProvider router={router} />

        // <CreatePost></CreatePost>
        // <LogIn></LogIn>
        // <SingUp></SingUp>
    );
}

export default App;