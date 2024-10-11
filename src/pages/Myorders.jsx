import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDetailAtom } from "../atoms/userAtom";
import { RecoilRoot } from "recoil";
import { Topbar } from "../components/topbar";
import { spiceAtom } from "../assets/spices";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Optional CSS for styling

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

// A skeleton component to display when loading orders
const OrderTileSkeleton = () => {
  return (
    <div className="p-4 shadow-md rounded-lg bg-white mb-5">
      <Skeleton height={30} width={200} className="mb-2" />
      <Skeleton height={20} width={150} className="mb-2" />
      <Skeleton height={20} width={100} className="mb-2" />
      <Skeleton height={15} width="80%" className="mb-2" />
      <Skeleton height={15} width="80%" className="mb-2" />
      <Skeleton height={15} width="50%" className="mb-4" />

      <Skeleton height={20} width={150} className="mb-2" />
      <table className="min-w-full text-left table-auto border-collapse">
        <thead>
          <tr className="border-b bg-orange-100">
            <th className="px-4 py-2">
              <Skeleton height={20} width="100%" />
            </th>
            <th className="px-4 py-2">
              <Skeleton height={20} width="100%" />
            </th>
            <th className="px-4 py-2">
              <Skeleton height={20} width="100%" />
            </th>
          </tr>
        </thead>
        <tbody>
          {Array(3)
            .fill()
            .map((_, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">
                  <Skeleton height={20} width="100%" />
                </td>
                <td className="px-4 py-2">
                  <Skeleton height={20} width="100%" />
                </td>
                <td className="px-4 py-2">
                  <Skeleton height={20} width="100%" />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export function MyordersPage() {
  const [userinfo] = useRecoilState(userDetailAtom);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const userdata = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://organicspices.azurewebsites.net/api/my_orders?', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
          setIsLoading(false);
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
        <div className="m-10 mb-4 bg-orange-200 py-2 px-2 inline-block rounded-xl font-bold text-3xl">
          Your Orders
        </div>

        <div className="m-10">
          {isLoading ? (
            <div>
              {/* Display skeletons while loading */}
              {Array(3)
                .fill()
                .map((_, index) => (
                  <OrderTileSkeleton key={index} />
                ))}
            </div>
          ) : hasError ? (
            <div className="text-red-500 text-xl border border-black inline-block px-2 py-2 rounded-lg">
              You have No orders :)
            </div>
          ) : orders.length > 0 ? (
            orders.map((order) => <OrderTile key={order._id} order={order} />)
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
