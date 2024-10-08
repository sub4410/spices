import { useRecoilState } from "recoil";
import { userDetailAtom } from "../atoms/userAtom";
import { RecoilRoot } from "recoil";
import { Topbar } from "../components/topbar";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export function Users() {
    const [consumers, setConsumers] = useState([]);


    // Function to fetch consumer data from the API when the component loads
    useEffect(() => {

        const token = localStorage.getItem('token');

        // Configure headers to include the token
        const config = {
        headers: {
            Authorization: `Bearer ${token}` // Assuming you are using Bearer token for authentication
        }
        };

        axios.get('https://organicspices.azurewebsites.net/api/all-users', config)
        .then(response => {
            // Set the fetched consumer data to the state
            setConsumers(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the consumers!", error);
        });
    }, []);
      const navigate = useNavigate();
      
      const goToOrders = () => {
        navigate('/orders'); // Navigates to the order list page
      };

      const goTodashboard = () => {
        navigate('/admin'); // Navigates to the order list page
      };

    return (
        <div>
            <Topbar />
            <div className="h-screen">
                <div className="m-10 mb-4 font-bold text-3xl">
                    Welcome Admin
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="m-10 mt-0 w-[200px] h-[200px] flex flex-col gap-10">
                    <button 
                    onClick={goToOrders}
                    className="border px-3 py-1 rounded-lg bg-orange-400 font-medium hover:bg-orange-300 text-white">Orders</button>
                    <button 
                    onClick={goTodashboard}
                    className="border px-3 py-1 rounded-lg bg-orange-400 font-medium hover:bg-orange-300 text-white">Admin Dashboard</button>
                    </div>
                    <div className="flex-grow p-10 pt-0">
                        <div className="text-xl mb-5 font-bold"><br />
                            <div className="font-light text-lg w-100 h-[200px] flex-row gap-10">
                            <h1 className="font-bold">Orders</h1>
                            <table  className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                            <tr>
                            <th className="px-4 py-2 border border-gray-300">Customer Name</th>
                            <th className="px-4 py-2 border border-gray-300">Email</th>
                            </tr>   
                            </thead>
                            <tbody>
                            {consumers.map(consumer => (
                                <tr>
                                <td className="px-4 py-2 border border-gray-300">{consumer.username}</td> {/* Render username */}
                                <td className="px-4 py-2 border border-gray-300">{consumer.email}</td> {/* Render email */}
                                </tr>
                            ))}
                            </tbody>
                            </table>
                            </div>
                        </div>
                        <div className="text-xl font-bold">  <br />
                            <div className="font-light text-lg">
                                
                            </div>
                        </div>
                        <div className="mt-5">
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    );
}

export default function USERS() {
    return (
        <RecoilRoot>
            <Users />
        </RecoilRoot>
    );
}
