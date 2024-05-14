import beeHiveLogIn from "../assets/beeHiveLogIn.png";
import LogInForm from "../components/LogInForm";
import { redirect } from "react-router-dom";

const LogIn = () => {
  return (
    <div className="flex h-screen">
      <div className="w-7/12 bg-black1 h-full flex">
        <LogInForm />
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
    password: data.get("password"), // TODO Fix me (terrible idea)
  };
  console.log(submission); // TODO Remove me (must call backend here)

  // send submission to backend to authenticate user
  // if authenticated then redirect to feed
  // else show error message
  return redirect("/feed");
};
