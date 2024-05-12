const CreatePostForm = () => {
    return (
        <div className="w-1/2 h-screen">
            <h1 className="text-white text-4xl font-bold mb-4">Create a new post</h1>
            <div className="text-white mb-6">**select community**</div>
            <div className="mb-8">
                <div className="text-white mb-1 ml-2 text-xl">Title</div>
                <input type="text" placeholder="Enter the post title" className="w-full h-11 rounded-3xl p-5"></input>
            </div>
            <div className="mb-6">
                <div className="text-white mb-1 ml-2 text-xl">Body</div>
                <textarea placeholder="Enter body text" className="w-full rounded-3xl px-5 py-3"></textarea>
            </div>
            <button type="submit" className="bg-main text-lg w-full h-11 rounded-3xl mb-2">Post</button>
        </div>
    )
}

export default CreatePostForm;