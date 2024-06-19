import beeHiveLogIn from "../assets/beeHiveLogIn.png";
import LogInForm from "../components/LogInForm";
import { redirect } from "react-router-dom";
import { useState } from "react"
import { BASE_URL } from "../backend_url";
import { encode } from "base-64";

const LogIn = () => {
    const [errorMsg, setErrorMsg] = useState([]);

    return (
        <div className="flex h-screen">
            <div className="w-7/12 bg-black1 h-full flex">
                <LogInForm error={errorMsg}/>
            </div>
            <img src={beeHiveLogIn} className="w-5/12 h-full"></img>
        </div>
    );
};

export default LogIn;

export const logInAction = async ({ request }) => {
    const data = await request.formData();
    const submission = {
        email: data.get("email"),
        password: data.get("password"),
    };
    const response = await fetch(BASE_URL + "/auth", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + encode(`${submission.email}:${submission.password}`),
        },
    })
    const loginResponse = await response.json()
    localStorage.setItem("jwt-token", loginResponse.jwtToken)
    localStorage.setItem("userId", loginResponse.id)
    console.log(localStorage.getItem("jwt-token"))
    console.log(localStorage.getItem("userId"))

    if(loginResponse.error) {
        // TODO implement me
    }
    else {
        return redirect("/feed");
    }
};
