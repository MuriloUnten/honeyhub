import profile from '../assets/profile.png'
import { useState } from "react"
import { Link } from 'react-router-dom';

const CreateNewPost = () => {

    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {

        try {
            const response = await fetch('http://localhost:3001/api/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(content),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('New post created:', result);
                //setTitle('');
                setContent('');
            } else {
                console.error('Failed to create post');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <div className='h-24 w-1/3 bg-black2 rounded-3xl mb-4 flex mx-auto'>
            <div className='flex w-11/12 justify-center mx-auto items-center'>
                <img src={profile} className='h-12 mr-4'></img>
                <Link to="/create-post" className='h-10 w-28 rounded-3xl text-center bg-main flex items-center justify-center text-lg'>
                    Create
                </Link>
                {/* <div className='h-10 w-28 rounded-3xl text-center bg-main flex items-center'>
                    <div className='mx-auto text-lg'>Create</div> 
                </div>     */}
            </div> 
        </div>
    )
};

export default CreateNewPost;