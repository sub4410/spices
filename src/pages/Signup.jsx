import { RecoilRoot, useRecoilState } from "recoil";
import { userEmail, username, userpassword } from "../atoms/signupatoms";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import spicesbg from '../assets/spicesbg.jpg'

export function SignupPage() {


    const [usernames, setUsername] = useRecoilState(username);
    const [password, setPassword] = useRecoilState(userpassword);
    const [email, setEmail] = useRecoilState(userEmail)
    const [errormessgae, setErrormessage] = useState('');

    const navigate = useNavigate();
    const handleSignup = () => {
      try{
        axios.post("https://organicspices.azurewebsites.net/api/signup", {
            "username": usernames,
            "password": password,
            "email": email
        })
        .then(response => {
            if (!response.data.token || response.data.token ==''){
              setErrormessage(response.data);
            }else{
              
              localStorage.setItem('token', response.data.token)
              navigate('/dashboard');
            }
            
        })
        .catch(error => {
            console.error("Error signing up:", error);
        });
      }catch{


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
          <a href="#" className="bg-black text-white font-bold text-xl p-4">
            Shri.
          </a>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-center text-3xl mb-6">Welcome.</p>
          <form
            className="flex flex-col"
            onSubmit={(e) => e.preventDefault()}
          >

            {/* Username */}
            <div className="flex flex-col pt-4">
              <label htmlFor="username" className="text-lg">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
             {/* email */}
             <div className="flex flex-col pt-4">
              <label htmlFor="username" className="text-lg">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSignup}
              className="w-full mt-6 bg-black text-white font-bold text-lg hover:bg-gray-700 py-2 rounded"
            >
              Sign Up
            </button>
            <div>
              {errormessgae}
            </div>
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


function SignupButton({ onPress }) {
    return (
        <div>
            <button onClick={onPress} className="border border-black rounded px-3 py-2 font-mono hover:text-white hover:bg-black">Signup</button>
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
