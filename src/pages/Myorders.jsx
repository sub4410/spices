import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDetailAtom } from "../atoms/userAtom";
import { RecoilRoot } from "recoil";
import { Topbar } from "../components/topbar";
import { spiceAtom } from "../assets/spices";

// A component to display individual order tile
const OrderTile = ({ order }) => {

    const products = useRecoilValue(spiceAtom);

    return (
        <div className="p-4 shadow-md rounded-lg bg-white mb-5">
          <div className="font-bold text-xl mb-2">Order ID: {order._id}</div>
          <div className="text-gray-700 mb-2">Placed At: {new Date(order.placedAt).toLocaleString()}</div>
          <div className="font-semibold mb-2">Shipping Details:</div>
          <ul className="mb-4">
            <li>Name: {order.shippingDetails.name}</li>
            <li>Address: {order.shippingDetails.address}</li>
            <li>City: {order.shippingDetails.city}</li>
            <li>Pincode: {order.shippingDetails.pincode}</li>
          </ul>
      
          <div className="font-semibold mb-2">Order Items:</div>
      
          {/* Table for Order Items */}
          <table className="min-w-full text-left table-auto border-collapse">
            <thead>
              <tr className="border-b bg-orange-100">
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.productName}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export function MyordersPage() {
  // Recoil state for user info
  const [userinfo] = useRecoilState(userDetailAtom);
  
  // State to store orders
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [hasError, setHasError] = useState(false);  // Error state in case of fetch failure

  // Retrieve and parse user info from localStorage
  const userdata = JSON.parse(localStorage.getItem('userInfo'));

  // Fetch orders when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await fetch('https://organicspices.azurewebsites.net/api/my_orders?', {  // Replace with your actual API endpoint
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
          setIsLoading(false); // Data has been fetched, stop loading
        } else {
          console.error('Failed to fetch orders');
          setHasError(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Topbar />
      <div className="m-5 shadow-lg p-10">
        <div className="m-10 mb-4 bg-orange-200 py-2 px-2 inline-block rounded-xl font-bold text-3xl">Your Orders</div>

        <div className="m-10">
          {isLoading ? (
            <div className="flex justify-center items-center">
              {/* Simple loading text, replace with a spinner if desired */}
              <p className="text-gray-500">Loading orders...</p>
            </div>
          ) : hasError ? (
            <div className="text-red-500 text-xl border border-black inline-block px-2 py-2 rounded-lg">You have No orders :)</div>
          ) : orders.length > 0 ? (
            orders.map(order => (
              <OrderTile key={order._id} order={order} />
            ))
          ) : (
            <div className="text-gray-500">You have no orders yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MYORDERSPAGE() {
  return (
    <RecoilRoot>
      <MyordersPage />
    </RecoilRoot>
  );
}
