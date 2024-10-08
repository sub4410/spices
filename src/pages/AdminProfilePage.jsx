import { useRecoilState } from "recoil";
import { userDetailAtom } from "../atoms/userAtom";
import { RecoilRoot } from "recoil";
import { Topbar } from "../components/topbar";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminProfilePage() {
    // Recoil state for user info
    const userinfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
      const navigate = useNavigate();
      
      const goToOrders = () => {
        navigate('/orders'); // Navigates to the order list page
      };

      const goToUsers = () => {
        navigate('/users'); // Navigates to the order list page
      };

    return (
        <div>
            <Topbar />
            <div className="h-screen">
                <div className="m-10 mb-4 font-bold text-3xl">
                    Welcome Admin {userinfo.username}
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="m-10 mt-0 w-[200px] h-[200px] flex flex-col gap-10">
                    <button 
                    onClick={goToUsers}
                    className="border px-3 py-1 rounded-lg bg-orange-400 font-medium hover:bg-orange-300 text-white">Users</button>
                    <button 
                    onClick={goToOrders}
                    className="border px-3 py-1 rounded-lg bg-orange-400 font-medium hover:bg-orange-300 text-white">Orders</button>
                    </div>
                    <div className="flex-grow p-10 pt-0">
                        <div className="text-xl mb-5 font-bold">Total Sales Till Now:<br />
                            <div className="font-light text-lg">
                                100099
                            </div>
                        </div>
                        <div className="text-xl font-bold"> Profits:<br />
                            <div className="font-light text-lg">
                                12099
                            </div>
                        </div>
                        <div className="mt-5">
                            
                        </div>
                    </div>
                </div>

                <div className="m-10">
                </div>
            </div>
        </div>
    );
}

export default function ADMINPROFILEPAGE() {
    return (
        <RecoilRoot>
            <AdminProfilePage />
        </RecoilRoot>
    );
}
