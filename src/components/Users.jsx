import { useRecoilState } from "recoil";
import { userDetailAtom } from "../atoms/userAtom";
import { RecoilRoot } from "recoil";
import { Topbar } from "../components/topbar";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function Users() {
    const [consumers, setConsumers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        axios.get('https://organicspices.azurewebsites.net/api/all-users', config)
            .then(response => {
                setConsumers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the consumers!", error);
                setLoading(false);
            });
    }, []);

    const navigate = useNavigate();
    
    const goToOrders = () => {
        navigate('/orders');
    };

    const goTodashboard = () => {
        navigate('/admin');
    };

    return (
        <div>
            <Topbar />
            <div className="h-screen">
                <div className="m-10 mb-4 font-bold text-3xl">
                    Welcome Admin
                </div>
                <div className=" flex-col md:flex-row">
                    <div className="m-10 mt-0 w-[200px]  flex flex-col gap-10">
                        <button 
                            onClick={goToOrders}
                            className="border px-3 py-1 rounded-lg bg-orange-400 font-medium hover:bg-orange-300 text-white">
                            Orders
                        </button>
                        <button 
                            onClick={goTodashboard}
                            className="border px-3 py-1 rounded-lg bg-orange-400 font-medium hover:bg-orange-300 text-white">
                            Admin Dashboard
                        </button>
                    </div>
                    <div className="flex-grow p-10 pt-0">
                        <div className="text-xl mb-5 font-bold"><br />
                            <div className="font-light text-lg w-100 h-[200px] flex-row gap-10">
                                <table className="min-w-full font-normal table-auto border-collapse rounded-lg overflow-hidden shadow-lg">
                                    <thead>
                                        <tr className="bg-gray-800 text-white">
                                            <th className="px-4 py-2 border border-gray-300 rounded-tl-lg">Customer Name</th>
                                            <th className="px-4 py-2 border border-gray-300 rounded-tr-lg">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            Array(5).fill().map((_, index) => (
                                                <tr key={index} className={`bg-${index % 2 === 0 ? 'white' : 'gray-100'}`}>
                                                    <td className="px-4 py-2 border border-gray-300">
                                                        <Skeleton width={150} />
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-300">
                                                        <Skeleton width={250} />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            consumers.map((consumer, index) => (
                                                <tr key={consumer._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}>
                                                    <td className="px-4 py-2 border border-gray-300 r">
                                                        {consumer.username}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-300 ">
                                                        {consumer.email}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="text-xl font-bold"><br />
                            <div className="font-light text-lg"></div>
                        </div>
                        <div className="mt-5"></div>
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
