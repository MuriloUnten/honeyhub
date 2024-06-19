import React, { useState } from 'react';
import { BASE_URL } from "../backend_url";

const CreatePostForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        var idLocalStorage = localStorage.getItem("userId")

        if (idLocalStorage == null) {
            console.log("Couldn't find id")
            idLocalStorage = 1
        } else {
            console.log("Login id as is", idLocalStorage)
            idLocalStorage = parseInt(idLocalStorage)
            console.log("Login id", idLocalStorage)
        }

        const postData = {
            post: {
                title: title,
                Body: body
            },
            userId: idLocalStorage,
            communityId: 1
        };

        console.log(title, body)

        try {
            const response = await fetch(BASE_URL + "/post", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log(response)

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-1/2 h-screen">
            <h1 className="text-white text-4xl font-bold mb-4">Create a new post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    <div className="text-white mb-1 ml-2 text-xl">Title</div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the post title"
                        className="w-full h-11 rounded-3xl p-5"
                    />
                </div>
                <div className="mb-6">
                    <div className="text-white mb-1 ml-2 text-xl">Body</div>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Enter body text"
                        className="w-full rounded-3xl px-5 py-3"
                    />
                </div>
                <button type="submit" className="bg-main text-lg w-full h-11 rounded-3xl mb-2">Post</button>
            </form>
        </div>
    );
};

export default CreatePostForm;

