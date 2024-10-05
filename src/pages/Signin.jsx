import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import { userpassword } from "../atoms/signupatoms";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import spicesside from '../assets/spices.jpg';
import { userDetailAtom } from "../atoms/userAtom";

export function SigninPage() {
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useRecoilState(userpassword);

    return (
        <div className="bg-white font-family-karla h-screen">
            <div className="w-full flex flex-wrap">
                {/* Login Section */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                        <a href="#" className="bg-black text-white font-bold text-xl p-4">
                            Shri.
                        </a>
                    </div>

                    <div className="flex bg-gray-50 rounded shadow-lg mx-auto h-auto w-11/12 md:w-3/4 lg:w-3/4 flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-0">
                        <p className="text-center text-3xl mt-10">Welcome.</p>
                        <form
                            className="flex flex-col pt-3 md:pt-8"
                            onSubmit={(e) => e.preventDefault()}
                        >
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
                                />
                            </div>
                            <div>
                                {}
                            </div>
                        </form>
                        <div>
                            <SigninButton username={userEmail} password={password} />
                        </div>
                        <div className="text-center pt-12 pb-12">
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
                        <h1 className="text-white text-4xl md:text-6xl lg:text-8xl font-bold">Indian <br />Organic <br /> spices !</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SigninButton({ username, password }) {
    const [signinsuccess, setSigninSuccess] = useState(null);
    const [userinfo ,setUserinfo] = useRecoilState(userDetailAtom);

    const handleSignin = async () => {
        await axios.post('https://organicspices.azurewebsites.net/api/login', {
            "email": username,
            "password": password,
        })
        .then(async (res) => {
            if (res.data.token) {
                localStorage.setItem('token', res.data.token);
                setSigninSuccess(true);
                setUserinfo(res.data.user);
                if(userinfo.isAdmin){
                    window.location.href = '/admin';
                }
                else{
                    window.location.href = '/dashboard';
                }
            } else {
                setErrorMessage(res.data);
                setSigninSuccess(false);
            }
        })
        .catch((error) => {
            console.error("Error signing in:", error);
            setSigninSuccess(false);
        });
    };

    return (
        <div className="mt-3">
            <div className="flex justify-center">
                <button onClick={handleSignin} className="w-full bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">Signin</button>
            </div>
            <div className="flex justify-center font-mono text-sm font-bold mt-2 text-red-400 min-h-[20px]">
                {signinsuccess === null ? "" : (signinsuccess ? <div className="flex justify-center font-mono text-sm font-bold mt-2 text-green-400 min-h-[20px]">Logged in successfully</div> : "Could not login!")}
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