import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom"
import Comments from "./Comments";
import { PostsSection } from "./PostsSection";
import noProfilePicture from "../assets/profile.png";
import HasntPosted from "./HasntPosted";

const BASE_URL = "http://localhost:3001/api"

const ViewProfile = () => {
    const {id} = useParams()
    const [user, setUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(noProfilePicture)

    const {userId} = useParams()
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            let response = await fetch(`${BASE_URL}/posts/user/${id}`);
            const posts = await response.json();
            setPosts(posts);
        }
        fetchPosts();
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            let response = await fetch(`${BASE_URL}/user/${id}`);
            const user = await response.json();
            setUser(user);
            if (user.profilePicture != "") {
                setProfilePicture(`${BASE_URL}/profile-picture/${user.id}`)
            }

            
        }
        fetchUser();
    }, []) 

    const [activeComponent, setActiveComponent] = useState("Overview");
    const renderComponent = () => {
        switch (activeComponent) {
            case "Overview":
                return <PostsSection posts={posts}/>;
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
      <div className="h-40 my-5">
        <img src={profilePicture} className="max-h-40 rounded-full" alt="Profile" />
      </div>
      <div className="ml-4">
        <div className="font-bold text-3xl text-white mb-1">{user && user.username}</div>
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
