import { RecoilRoot, useRecoilState } from "recoil";
import { userpassword } from "../atoms/signupatoms";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import spicesside from '../assets/spices.jpg';
import { Toaster, toast } from 'react-hot-toast';
import PasswordInfo from '../components/PasswordInfo'; // Import PasswordInfo component
import { BsEyeSlash, BsEye } from "react-icons/bs"; // Import eye icons
import styled from "styled-components"; // Import styled-components

export function SigninPage() {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useRecoilState(userpassword);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [userInfo, setUserInfo] = useState(null);
    const [showPasswordInfo, setShowPasswordInfo] = useState(false); // State to show/hide password info
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSignin = async () => {
        // Clear error message
        setErrorMessage('');

        // Validate inputs
        if (!userEmail || !password) {
            setErrorMessage('Please enter both email and password.');
            toast.error('Please enter both email and password.');
            return;
        }

        // Start loading
        setIsLoading(true);
        const loadingToastId = toast.loading('Signing in...');

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
                    toast.success('Login successful!', { id: loadingToastId });
                    if (res.data.user.isAdmin == true) {
                        // Redirect to the admin dashboard after successful login
                        window.location.href = '/admin';
                    }
                    else{
                    // Redirect to the dashboard after successful login
                    window.location.href = '/dashboard';
                    }
                } else {
                    // Handle error response from the backend
                    setErrorMessage(res.data.message || 'Login failed. Please try again.');
                    toast.error(res.data.message || 'Login failed. Please try again.', { id: loadingToastId });
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                // Handle errors from the backend
                if (error.response && error.response.data && error.response.data.message) {
                    setErrorMessage(error.response.data.message);
                    toast.error(error.response.data.message, { id: loadingToastId });
                } else {
                    setErrorMessage('An error occurred. Please try again.');
                    toast.error('An error occurred. Please try again.', { id: loadingToastId });
                }
                setIsLoading(false);
            });
        } catch (error) {
            setErrorMessage('An unexpected error occurred.');
            toast.error('An unexpected error occurred.', { id: loadingToastId });
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white font-family-karla h-screen">
            <Toaster /> {/* Add Toaster component */}
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
                                <SearchWrapper>
                                    <SearchInput
                                        itype="email"
                                        id="email"
                                        onChange={(e) => setUserEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                        disabled={isLoading} // Disable input during loading
                                    />
                                </SearchWrapper>
                                {/* <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    disabled={isLoading} // Disable input during loading
                                /> */}
                            </div>

                            <div className="flex flex-col pt-4 relative">
                                <label htmlFor="password" className="text-lg">
                                    Password
                                </label>
                                <SearchWrapper>
                                    <SearchInput
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        type={showPassword ? "text" : "password"}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                        disabled={isLoading} // Disable input during loading
                                        onFocus={() => setShowPasswordInfo(true)} // Show password info on focus
                                        // onBlur={() => setShowPasswordInfo(false)} // Hide password info on blur
                                    />
                                    <IconWrapper>
                                        {showPassword ? <BsEyeSlash onClick={handleShowPassword} /> : <BsEye onClick={handleShowPassword} />}
                                    </IconWrapper>
                                </SearchWrapper>
                                {showPasswordInfo && <PasswordInfo />} {/* Show PasswordInfo component */}
                            </div>
                        </form>

                        {/* Error Message */}
                        {/* {errorMessage && (
                            <div className="text-red-500 text-sm font-bold mt-4">
                                {errorMessage}
                            </div>
                        )} */}

                        {/* Loading Message */}
                        {/* {isLoading && (
                            <div className="text-blue-500 text-sm font-bold mt-4">
                                Signing in...
                            </div>
                        )} */}

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

// Styled Components
const SearchWrapper = styled.div`
  height: 44px;
  width: 100%;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: inherit;
  padding-left: 20px;
  padding-right: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  color: #1e1e2f;
  border: 1px solid #EDEAE7;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 46px 50px;
  font-size: 14px;
  transition: all 0.4s ease;

  ::placeholder {
    font-family: "Archia-Regular";
    opacity: 0.5;
    user-select: none;
  }

  :focus {
    border: 1px solid #3B4859;
    transition: all 0.4s ease;
  }
`;

const IconWrapper = styled.div`
  width: 2rem;
  height: 100%;
  position: absolute;
  right: 10px;
  top: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #383634;

  svg {
    width: 65%;
    height: 100%;
  }
`;