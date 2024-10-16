import { RecoilRoot, useRecoilState } from "recoil";
import { userEmail, username, userpassword } from "../atoms/signupatoms";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import spicesbg from '../assets/spicesbg.jpg';
import { Toaster, toast } from 'react-hot-toast';
import PasswordInfo from "../components/PasswordInfo";  
import { BsEyeSlash, BsEye } from "react-icons/bs"; // Import eye icons
import styled from "styled-components"; // Import styled-components
export function SignupPage() {
    const [usernames, setUsername] = useRecoilState(username);
    const [password, setPassword] = useRecoilState(userpassword);
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
    const [email, setEmail] = useRecoilState(userEmail);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [showPasswordInfo, setShowPasswordInfo] = useState(false); // State to show/hide password info
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    const handleSignup = () => {
        // Clear error message
        setErrorMessage('');

        // Validate email format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate password strength using regex
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

        // Check for empty fields and validate inputs
        if (!usernames || !email || !password || !confirmPassword) {
            setErrorMessage('Please fill out all fields.');
            toast.error('Please fill out all fields.');
            return;
        } else if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            toast.error('Please enter a valid email address.');
            return;
        } else if (!passwordRegex.test(password)) {
            setErrorMessage(
                'Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.'
            );
            toast.error(
                'Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.'
            );
            return;
        } else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            toast.error('Passwords do not match.');
            return;
        }

        // If all validations pass, start loading
        setIsLoading(true);
        const loadingToastId = toast.loading('Signing up...');

        // Proceed with signup
        try {
            axios
                .post("https://organicspices.azurewebsites.net/api/signup?", {
                    "username": usernames,
                    "password": password,
                    "email": email
                })
                .then(response => {
                    if (!response.data.token || response.data.token === '') {
                        setErrorMessage(response.data); // Display actual backend message
                        toast.error(response.data, { id: loadingToastId });
                        setIsLoading(false); // Stop loading if there is an error
                    } else {
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                        toast.success('Signup successful!', { id: loadingToastId });

                        // Redirect to the dashboard after successful signup
                        setTimeout(() => {
                            navigate('/dashboard');
                        }, 2000); // Simulating a slight delay
                    }
                })
                .catch(error => {
                    // Handle error response from backend
                    if (error.response && error.response.data && error.response.data) {
                        setErrorMessage(error.response.data); // Correctly set the backend error message
                        toast.error(error.response.data, { id: loadingToastId });
                    } else {
                        setErrorMessage('Error signing up. Please try again.');
                        toast.error('Error signing up. Please try again.', { id: loadingToastId });
                    }
                    setIsLoading(false); // Stop loading in case of error
                });
        } catch (err) {
            setErrorMessage('An unexpected error occurred.');
            toast.error('An unexpected error occurred.', { id: loadingToastId });
            setIsLoading(false); // Stop loading if there is an error
        }
    };

    return (
        <div
            className="bg-white font-family-karla h-screen flex justify-center items-center"
            style={{
                backgroundImage: `url(${spicesbg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Toaster /> {/* Add Toaster component */}
            {/* Main content container */}
            <div className="w-full max-w-md p-8 bg-white rounded-lg opacity-93 shadow-lg">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <a href="#" className="rounded-xl bg-black text-white font-bold text-xl p-4">
                        Shri.Organic.Roots
                    </a>
                </div>

                <div className="flex flex-col justify-center">
                    <p className="text-center text-3xl mb-6">Welcome.</p>
                    <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                        {/* Username */}
                        <div className="flex flex-col pt-4">
                            <label htmlFor="username" className="text-lg">
                                Username
                            </label>
                            <SearchWrapper>
                                    <SearchInput
                                        type="text"
                                        id="username"
                                        placeholder="Username"
                                        value={usernames}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </SearchWrapper>
                            {/* <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={usernames}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            /> */}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col pt-4">
                            <label htmlFor="email" className="text-lg">
                                Email
                            </label>
                            <SearchWrapper>
                                    <SearchInput
                                        type="email"
                                        id="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                </SearchWrapper>
                            {/* <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            /> */}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col pt-4">
                            <label htmlFor="password" className="text-lg">
                                Password
                            </label>
                            <SearchWrapper>
                                    <SearchInput
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setShowPasswordInfo(true)} // Show password info on focus
                                        // onBlur={() => setShowPasswordInfo(false)} // Hide password info on blur
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <IconWrapper>
                                        {showPassword ? <BsEyeSlash onClick={handleShowPassword} /> : <BsEye onClick={handleShowPassword} />}
                                    </IconWrapper>
                                </SearchWrapper>
                            {/* <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setShowPasswordInfo(true)} // Show password info on focus
                                onBlur={() => setShowPasswordInfo(false)} // Hide password info on blur
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            /> */}
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col pt-4">
                            <label htmlFor="confirm-password" className="text-lg">
                                Confirm Password
                            </label>
                            <SearchWrapper>
                                    <SearchInput
                                        type={showPassword ? "text" : "password"}
                                        id="confirm-password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        // onFocus={() => setShowPasswordInfo(true)} // Show password info on focus
                                        // onBlur={() => setShowPasswordInfo(false)} // Hide password info on blur
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <IconWrapper>
                                        {showPassword ? <BsEyeSlash onClick={handleShowPassword} /> : <BsEye onClick={handleShowPassword} />}
                                    </IconWrapper>
                                </SearchWrapper>
                            {/* <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocus={() => setShowPasswordInfo(true)} // Show password info on focus
                                onBlur={() => setShowPasswordInfo(false)} // Hide password info on blur
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            /> */}
                            {showPasswordInfo && <PasswordInfo />} {/* Show PasswordInfo component */}
                        </div>

                        {/* Error Message */}
                        {/* {errorMessage && (
                            <div className="text-red-500 text-sm font-bold mt-4">
                                {errorMessage}
                            </div>
                        )} */}

                        {/* Loading Message */}
                        {/* {isLoading && (
                            <div className="text-blue-500 text-sm font-bold mt-4">
                                Signing up... Redirecting to your dashboard...
                            </div>
                        )} */}

                        {/* Sign Up Button */}
                        <button
                            onClick={handleSignup}
                            className={`w-full mt-6 font-bold text-lg py-2 rounded ${isLoading ? 'bg-gray-400' : 'bg-black text-white hover:bg-gray-700'}`}
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="text-center pt-12 pb-12">
                        <p>
                            Already have an account?{" "}
                            <Link to="/signin" className="underline font-semibold">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SIGNUP() {
    return (
        <RecoilRoot>
            <SignupPage />
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