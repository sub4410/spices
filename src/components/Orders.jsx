import { useRecoilState } from "recoil";
import { userDetailAtom } from "../atoms/userAtom";
import { RecoilRoot } from "recoil";
import { Topbar } from "../components/topbar";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Orders() {
    const [userinfo] = useRecoilState(userDetailAtom);
    const [consumers, setConsumers] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    
    // Options for the delivery status dropdown
    const statusOptions = ["pending", "shipped", "confirmed", "cancelled"];

    // Function to fetch consumer data from the API when the component loads
    useEffect(() => {
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Assuming you are using Bearer token for authentication
            }
        };

        axios.get('https://organicspices.azurewebsites.net/api/all-orders', config)
            .then(response => {
                // Set the fetched consumer data to the state
                setConsumers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the consumers!", error);
            });
    }, []);

    // Handle status change before submitting
    const handleStatusChange = (userId, productId, newStatus) => {
        setSelectedStatus({
            ...selectedStatus,
            [`${userId}-${productId}`]: newStatus,
        });
    };

    // Function to handle updating the delivery status for a specific product
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
                console.log("Status Changed to", response.data);
            })
            .catch(error => {
                console.error("There was an error updating the product status!", error);
            });
    };

    const navigate = useNavigate();

    const goToOrders = () => {
        navigate('/users'); // Navigates to the order list page
    };

    const goToDashboard = () => {
        navigate('/admin'); // Navigates to the admin dashboard
    };

    return (
        <div>
            <Topbar />
            <div className="m-5 shadow-lg h-screen">
                <div className="m-10 mb-4 font-bold text-3xl">
                    Welcome Admin
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="m-10 mt-0 w-[200px] h-[200px] flex flex-col gap-10">
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
                    <div className="flex-grow p-10 pt-0">
                        <div className="text-xl mb-5 font-bold"><br />
                            <div className="font-light text-lg w-100 h-[200px] flex-row gap-10">
                                <h1 className="font-bold">Orders</h1>
                                <table className="min-w-full table-auto border-collapse border border-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border border-gray-300">Customer Name</th>
                                            <th className="px-4 py-2 border border-gray-300">Date</th>
                                            <th className="px-4 py-2 border border-gray-300">Products & Delivery Status</th>
                                            <th className="px-4 py-2 border border-gray-300">Total Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {consumers.map(consumer => (
                                            <tr key={consumer._id}>
                                                <td className="px-4 py-2 border border-gray-300">{consumer.shippingDetails.name}</td>
                                                <td className="px-4 py-2 border border-gray-300">{consumer.placedAt.split(' ')[0]}</td>
                                                <td className="px-4 py-2 border border-gray-300">
                                                    {consumer.orderItems.map(item => (
                                                        <div key={item.productId} className="flex justify-between items-center mb-4">
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
                                                                    className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                                                >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td className="px-4 py-2 border border-gray-300">
                                                    ${(consumer.orderItems || []).reduce((total, item) => total + (item.productPrice * item.quantity), 0).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="text-xl font-bold">  <br />
                            <div className="font-light text-lg"></div>
                        </div>
                        <div className="mt-5"></div>
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
