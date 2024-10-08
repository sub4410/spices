import { useState, useEffect } from "react";
import { cartAtom } from "../atoms/CartAtom";
import { RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil";
import { TotalSumAtom } from "../atoms/TotalSumAtom";
import { UserAddressAtom } from "../atoms/UserAddressAtom";
import { useNavigate } from 'react-router-dom';

export function OrderSummaryComponent({ totalSum }) {
  const cartItems = useRecoilValue(cartAtom); // Now contains id and quantity
  const settotalsum = useSetRecoilState(TotalSumAtom);
  const setUserAddress = useSetRecoilState(UserAddressAtom);
  const navigate = useNavigate(); // For navigation after successful checkout

  // Local state for user information
  const [userInfo, setUserInfo] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
  });

  // State for tracking validation errors
  const [errors, setErrors] = useState({
    name: false,
    address: false,
    city: false,
    pincode: false,
  });

  // Load stored user data from localStorage on component mount
  useEffect(() => {
    const savedUserInfo = JSON.parse(localStorage.getItem("userAddress"));
    if (savedUserInfo) {
      setUserInfo(savedUserInfo);
    }
  }, []);

  // Update user info fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when the user starts typing
    if (value) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateFields = () => {
    // Validate the fields
    const newErrors = {
      name: !userInfo.name,
      address: !userInfo.address,
      city: !userInfo.city,
      pincode: !userInfo.pincode,
    };
    setErrors(newErrors);

    // If there are no errors, return true
    return Object.values(newErrors).every((error) => !error);
  };

  const handleCheckout = () => {
    if (validateFields()) {
      // Set the total sum in the recoil atom
      settotalsum(totalSum);

      // Set the user address atom and store it in localStorage
      setUserAddress(userInfo);
      localStorage.setItem("userAddress", JSON.stringify(userInfo));

      // Redirect to the checkout page
      navigate("/checkout"); // Adjust the path as needed
      window.location.reload();
    } else {
      // Scroll to the top of the page to show errors
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
      <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">Order Summary</h2>
      <div className="">
        <div className="flex items-center justify-between pb-6"></div>

        {/* Address and Personal Info Section */}
        <div className="">
          <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={`border border-gray-300 rounded-lg p-2 ${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
                className={`border border-gray-300 rounded-lg p-2 ${errors.address ? 'border-red-500' : ''}`}
              />
              {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                name="city"
                value={userInfo.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                className={`border border-gray-300 rounded-lg p-2 ${errors.city ? 'border-red-500' : ''}`}
              />
              {errors.city && <span className="text-red-500 text-sm">City is required</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={userInfo.pincode}
                onChange={handleInputChange}
                placeholder="Enter your pincode"
                className={`border border-gray-300 rounded-lg p-2 ${errors.pincode ? 'border-red-500' : ''}`}
              />
              {errors.pincode && <span className="text-red-500 text-sm">Pincode is required</span>}
            </div>
          </form>
        </div>

        {/* Other form fields like Shipping and Promo Code */}
        <div className="flex items-center justify-between py-8">
          <p className="font-medium text-xl leading-8 text-black">{cartItems.length} Items</p>
          <p className="font-semibold text-xl leading-8 text-indigo-600">${parseFloat(totalSum).toFixed(2)}</p>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default function ORDERSUMMARY({ sum }) {
  return (
    <RecoilRoot>
      <OrderSummaryComponent totalSum={sum} />
    </RecoilRoot>
  );
}
