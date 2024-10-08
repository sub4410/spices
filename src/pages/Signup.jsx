import { RecoilRoot, useRecoilState } from "recoil";
import { userEmail, username, userpassword } from "../atoms/signupatoms";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import spicesbg from '../assets/spicesbg.jpg';

export function SignupPage() {
    const [usernames, setUsername] = useRecoilState(username);
    const [password, setPassword] = useRecoilState(userpassword);
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
    const [email, setEmail] = useRecoilState(userEmail);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const navigate = useNavigate();

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
          return;
      } else if (!emailRegex.test(email)) {
          setErrorMessage('Please enter a valid email address.');
          return;
      } else if (!passwordRegex.test(password)) {
          setErrorMessage(
              'Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.'
          );
          return;
      } else if (password !== confirmPassword) {
          setErrorMessage('Passwords do not match.');
          return;
      }
  
      // If all validations pass, start loading
      setIsLoading(true);
  
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
                      setIsLoading(false); // Stop loading if there is an error
                  } else {
                      localStorage.setItem('token', response.data.token);
                      localStorage.setItem('userInfo', JSON.stringify(response.data.user));
                      
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
                  } else {
                      setErrorMessage('Error signing up. Please try again.');
                  }
                  setIsLoading(false); // Stop loading in case of error
              });
      } catch (err) {
          setErrorMessage('An unexpected error occurred.');
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
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                value={usernames}
                                onChange={(e) => setUsername(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col pt-4">
                            <label htmlFor="email" className="text-lg">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col pt-4">
                            <label htmlFor="password" className="text-lg">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col pt-4">
                            <label htmlFor="confirm-password" className="text-lg">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>

                        {/* Error Message */}
                        {errorMessage && (
                            <div className="text-red-500 text-sm font-bold mt-4">
                                {errorMessage}
                            </div>
                        )}

                        {/* Loading Message */}
                        {isLoading && (
                            <div className="text-blue-500 text-sm font-bold mt-4">
                                Signing up... Redirecting to your dashboard...
                            </div>
                        )}

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
