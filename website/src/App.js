import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Feed from "./screens/Feed";  
import SignUp from "./screens/SignUp";
import LogIn from "./screens/LogIn";
import CreatePost from "./screens/CreatePost";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Feed />
    },
    {
        path: "/feed",
        element: <Feed />
    },
    {
        path: "/login",
        element: <LogIn />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/create-post",
        element: <CreatePost />
    },
]);

function App() {
    return (
        <RouterProvider router={router} />

        // <CreatePost></CreatePost>
        // <LogIn></LogIn>
        // <SingUp></SingUp>
    );
}

export default App;
