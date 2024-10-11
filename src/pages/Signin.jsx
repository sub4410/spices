import { RecoilRoot, useRecoilState } from "recoil";
import { userpassword } from "../atoms/signupatoms";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import spicesside from '../assets/spices.jpg';

export function SigninPage() {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useRecoilState(userpassword);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [userInfo, setUserInfo] = useState(null);
    const handleSignin = async () => {
        // Clear error message
        setErrorMessage('');

        // Validate inputs
        if (!userEmail || !password) {
            setErrorMessage('Please enter both email and password.');
            return;
        }

        // Start loading
        setIsLoading(true);

        // Handle signin
        try {
            await axios.post('https://organicspices.azurewebsites.net/api/login?', {
                "email": userEmail,
                "password": password,
            })
            .then(async (res) => {
                if (res.data.token) {
                    // Store the token and user info in localStorage
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userInfo', JSON.stringify(res.data.user));
                    setUserInfo(res.data.user);
                    if (res.data.user.isAdmin == true) {
                        // Redirect to the admin #ashboard after successful login
                        window.location.href = '/#/admin';
                    }
                    else{
                    // Redirect to the dashboard after successful login
                    window.location.href = '/#/dashboard';
                    }
                } else {
                    // Handle error response from the backend
                    setErrorMessage(res.data.message || 'Login failed. Please try again.');
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                // Handle errors from the backend
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                }
                setIsLoading(false);
            });
        } catch (error) {
            setErrorMessage('An unexpected error occurred.');
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white font-family-karla h-screen">
            <div className="w-full flex flex-wrap">
                {/* Login Section */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex bg-gray-50 rounded shadow-lg mx-auto h-auto w-11/12 md:w-3/4 lg:w-3/4 flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-0 lg:px-0">
                        <p className="text-center text-3xl mt-10">Welcome !</p>
                        <form className="flex flex-col pt-3 md:px-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="flex flex-col pt-4">
                                <label htmlFor="email" className="text-lg">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    disabled={isLoading} // Disable input during loading
                                />
                            </div>

                            <div className="flex flex-col pt-4">
                                <label htmlFor="password" className="text-lg">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    disabled={isLoading} // Disable input during loading
                                />
                            </div>
                        </form>

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="text-red-500 text-sm font-bold mt-4">
                                {errorMessage}
                            </div>
                        )}

                        {/* Loading Message */}
                        {isLoading && (
                            <div className="text-blue-500 text-sm font-bold mt-4">
                                Signing in...
                            </div>
                        )}

                        <div>
                            <SigninButton email={userEmail} password={password} isLoading={isLoading} handleSignin={handleSignin} />
                        </div>

                        <div className="text-center pt-12 pb-12 ">
                            <p>
                                Don't have an account?{" "}
                                <Link to="/signup" className="underline font-semibold">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="hidden md:block w-full md:w-1/2 shadow-2xl relative">
                    <img
                        className="object-cover w-full h-screen"
                        src={spicesside}
                        alt="Login Visual"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex ml-10 items-center">
                        <h1 className="text-white text-4xl md:text-6xl lg:text-6xl font-bold">Natural <br />Spices and <br /> Ingredients!</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SigninButton({ email, password, isLoading, handleSignin }) {
    return (
        <div className="mt-3">
            <div className="flex justify-center px-8 rounded-lg">
                <button
                    onClick={handleSignin}
                    className={` rounded-lg w-full bg-black text-white font-bold text-lg p-2 mt-8 ${isLoading ? 'bg-gray-400' : 'hover:bg-gray-700'}`}
                    disabled={isLoading} // Disable button during loading
                >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
            </div>
        </div>
    );
}

export default function SIGNIN() {
    return (
        <RecoilRoot>
            <SigninPage />
        </RecoilRoot>
    );
}
