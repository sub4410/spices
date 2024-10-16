import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";
import { userDetailAtom } from "../atoms/userAtom";
import { RecoilRoot } from "recoil";
import { Topbar } from "../components/topbar";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Orders() {
    const [userinfo] = useRecoilState(userDetailAtom);
    const [consumers, setConsumers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [loading, setLoading] = useState(true);

    const statusOptions = ["pending", "confirmed", "cancelled"];

    useEffect(() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Use template literals
            }
        };

        axios.get('https://organicspices.azurewebsites.net/api/all-orders', config)
            .then(response => {
                setConsumers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("There was an error fetching the consumers!", error);
                setLoading(false);
            });
    }, []);

    const handleStatusChange = (userId, productId, newStatus) => {
        setSelectedStatus({
            ...selectedStatus,
            [`${userId}-${productId}`]: newStatus,
        });
    };

    const updateProductStatus = (userId, productId) => {
        const token = localStorage.getItem('token');
        const newStatus = selectedStatus[`${userId}-${productId}`];

        if (!newStatus) return;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const payload = {
            userId,
            productId,
            status: newStatus
        };

        axios.put('https://organicspices.azurewebsites.net/api/order_status', payload, config)
            .then(response => {
                alert("Order Status Changed successfully");
            })
            .catch(error => {
                console.error("There was an error updating the product status!", error);
            });
    };

    const navigate = useNavigate();

    const goToOrders = () => {
        navigate('/users');
    };

    const goToDashboard = () => {
        navigate('/admin');
    };

    return (
        <div>
            <Topbar />
            <div className="m-5 h-screen">
                <div className="m-10 mb-4 font-bold text-3xl">
                    Welcome Admin
                </div>
                <div className=" flex-col md:flex-row">
                    <div className="m-10 mt-0 w-[200px] flex flex-col gap-10">
                        <button 
                            onClick={goToOrders}
                            className="border px-3 py-1 rounded-lg bg-orange-400 font-medium hover:bg-orange-300 text-white">
                            Users
                        </button>
                        <button 
                            onClick={goToDashboard}
                            className="border px-3 py-1 rounded-lg bg-orange-400 font-medium hover:bg-orange-300 text-white">
                            Admin Dashboard
                        </button>
                    </div>
                    <div className="flex-grow p-10 pt-0 mb-10 ">
                        <div className="text-xl mb-5 font-bold mb-10">
                            <h1 className="font-bold">Orders</h1>
                            <div className="font-light text-lg w-100 h-[200px] flex-row gap-10">
                                <table className="min-w-full table-auto border-collapse rounded-lg mb-10 overflow-hidden shadow-lg">
                                    <thead>
                                        <tr className="bg-gray-800 text-white">
                                            <th className="px-4 py-2 border border-gray-300 rounded-tl-lg">Customer Name</th>
                                            <th className="px-4 py-2 border border-gray-300">Date</th>
                                            <th className="px-4 py-2 border border-gray-300">Products & Delivery Status</th>
                                            <th className="px-4 py-2 border border-gray-300 rounded-tr-lg">Total Amount</th>
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
                                                        <Skeleton width={100} />
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-300">
                                                        <Skeleton count={2} />
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-300">
                                                        <Skeleton width={80} />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            consumers.map((consumer, index) => (
                                                <tr key={consumer._id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} font-normal`}>
                                                    <td className="px-4  py-2 border border-gray-300">
                                                        {consumer.shippingDetails.name}
                                                    </td>
                                                    <td className="px-4 py-2  border border-gray-300">
                                                        {consumer.placedAt.split(' ')[0]}
                                                    </td>
                                                    <td className="px-4 py-2  border border-gray-300">
                                                        {consumer.orderItems.map(item => (
                                                            <div key={item.productId} className="flex justify-between items-center mb-3">
                                                                <div>{item.productName} x {item.quantity}</div>
                                                                <div className="flex items-center">
                                                                    <select
                                                                        className="border border-gray-300 p-2 rounded ml-4"
                                                                        value={selectedStatus[`${consumer.userId}-${item.productId}`] || item.status}
                                                                        onChange={(e) => handleStatusChange(consumer.userId, item.productId, e.target.value)}
                                                                    >
                                                                        {statusOptions.map(status => (
                                                                            <option key={status} value={status}>{status}</option>
                                                                        ))}
                                                                    </select>
                                                                    <button
                                                                        onClick={() => updateProductStatus(consumer.userId, item.productId)}
                                                                        className="ml-2 px-3 py-1 bg-orange-400 text-white rounded-lg hover:bg-orange-600 shadow-sm"
                                                                    >
                                                                        Update
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td className="px-4 mb-10  items-center text-center py-2 font-medium border border-gray-300">
                                                        ${(consumer.orderItems || []).reduce((total, item) => total + (item.productPrice * item.quantity), 0).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ORDERS() {
    return (
        <RecoilRoot>
            <Orders />
        </RecoilRoot>
    );
}
