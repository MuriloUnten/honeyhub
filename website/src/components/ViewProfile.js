import React, { useState } from "react";
import Comments from "./Comments";
import { PostsSection } from "./PostsSection";
import profile from "../assets/profile.png";
import HasntPosted from "./HasntPosted";

const ViewProfile = () => {
  const [activeComponent, setActiveComponent] = useState("Overview");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Overview":
        return <PostsSection />;
      case "Posts":
        return <HasntPosted />;
      case "Comments":
        return <Comments />;
      case "Upvoted":
        return <PostsSection />;
      case "Downvoted":
        return <PostsSection />;
      default:
        return <PostsSection />;
    }
  };

  return (
    <div className="w-full bg-black2 rounded-3xl px-8 py-2 mb-4">
      <div className="h-40">
        <img src={profile} className="max-h-40" alt="Profile" />
      </div>
      <div className="ml-4">
        <div className="font-bold text-3xl text-white mb-1">username</div>
      </div>
      <div className="mt-10">
        <ul className="flex justify-between space-x-4">
          <li
            className="font-bold text-2xl text-white hover:underline cursor-pointer hover:text-main"
            onClick={() => setActiveComponent("Overview")}
          >
            Overview
          </li>
          <li
            className="font-bold text-2xl text-white hover:underline cursor-pointer hover:text-main"
            onClick={() => setActiveComponent("Posts")}
          >
            Posts
          </li>
          <li
            className="font-bold text-2xl text-white hover:underline cursor-pointer hover:text-main"
            onClick={() => setActiveComponent("Comments")}
          >
            Comments
          </li>
          <li
            className="font-bold text-2xl text-white hover:underline cursor-pointer hover:text-main"
            onClick={() => setActiveComponent("Upvoted")}
          >
            Upvoted
          </li>
          <li
            className="font-bold text-2xl text-white hover:underline cursor-pointer hover:text-main"
            onClick={() => setActiveComponent("Downvoted")}
          >
            Downvoted
          </li>
        </ul>
      </div>
      <div className="mt-8 mb-4 border-b border-white"></div>
      <div className="w-full bg-black2 rounded-3xl px-8 py-2 mb-4">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ViewProfile;
