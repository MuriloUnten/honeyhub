import { Link, Form, useActionData } from "react-router-dom";
import { useState } from "react";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email required";
        if (!formData.username) newErrors.username = "Username required";
        if (!formData.password) newErrors.password = "Password required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            // No errors, submit the form
            e.target.submit();
        } else {
            // Set errors
            setErrors(newErrors);
        }
    };

    return (
        <div className="m-auto">
            <Form method="post" action="/signup" onSubmit={handleSubmit}>
                <h1 className='text-white font-bold text-6xl mx-auto mb-14'>Join the hive!</h1>

                <div className="mb-8">
                    <div className="text-white mb-1 ml-2 text-xl">Email</div>
                    <input
                        name="email"
                        type="text"
                        placeholder="Enter your email"
                        className="w-full h-11 rounded-3xl p-5"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <div className="text-white">{errors.email}</div>}
                </div>

                <div className="mb-8">
                    <div className="text-white mb-1 ml-2 text-xl">Username</div>
                    <input
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full h-11 rounded-3xl p-5"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <div className="text-white">{errors.username}</div>}
                </div>

                <div className="mb-10">
                    <div className="text-white mb-1 ml-2 text-xl">Password</div>
                    <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full h-11 rounded-3xl p-5"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <div className="text-white">{errors.password}</div>}
                </div>

                <div className="">
                    <button type="submit" className="bg-main text-lg w-full h-11 rounded-3xl mb-2">Sign Up</button>
                    <div className="flex">
                        <div className="flex text-white m-auto">
                            <div className="w-auto mr-1">Already have an account?</div>
                            <div className="text-main mr-2">
                                <Link to={`/login`}>Log in</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default SignUpForm;
