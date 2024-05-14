import beeHive from "../assets/beeHive.png";
import { Link } from "react-router-dom";

const LeftBar = () => {
  return (
    <div className="w-2/12 h-screen bg-black2 rounded-3xl">
      <img src={beeHive} className="w-16 h-16 ml-6 mt-8" alt="Beehive"></img>
      <ul className="space-x-4">
        <li className="ml-4 mt-8 font-bold text-2xl text-white hover:underline cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="mt-4 font-bold text-2xl text-white hover:underline cursor-pointer">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
      <button className="ml-4 bg-main font-bold text-lg w-60 h-10 rounded-3xl absolute bottom-0 mb-2">
        <Link to="/login">Log out</Link>
      </button>
    </div>
  );
};

export default LeftBar;
