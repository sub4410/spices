import { useState, useMemo } from "react";
import { useRecoilValue, RecoilRoot} from "recoil";
import { Topbar } from "../components/topbar";
import { cartAtom } from "../atoms/CartAtom";
import { spiceAtom } from "../assets/spices";
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate for routing


export function CheckOutPage() {
  const cartItems = useRecoilValue(cartAtom); // Now contains id and quantity
  const products = useRecoilValue(spiceAtom); // All available products
  const navigate = useNavigate(); 

  // Local state to store user address info

  // Local state for tracking success/error messages
  const [orderStatus, setOrderStatus] = useState('');

  // Create a product array by mapping the product details with the quantity from the cart
  const productArray = cartItems.map((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    return {
      ...product,
      quantity: cartItem.quantity,
    };
  });

  const Totalsum = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [cartItems]);

  // Send order to the backend API
  // Send order to the backend API
  const handleCheckout = async () => {
    // Parse userAddress from localStorage
    const userAddress = JSON.parse(localStorage.getItem('userAddress')); // Parse the string to JSON
  
    if (!userAddress) {
      setOrderStatus('User address not found.');
      alert('User address not found.');
      return;
    }
  
    // Create payload with both order items and user address
    const payload = {
      orderItems: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        status: "Pending",
      })),
      name: userAddress.name,
      address: userAddress.address,
      city: userAddress.city,
      pincode: userAddress.pincode,
    };
  
    try {
      const response = await fetch('https://organicspices.azurewebsites.net/api/user_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem('token'), // Include your JWT token if needed
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        setOrderStatus('Order placed successfully!');
        alert('Order placed successfully!');
  
        // Clear all items in localStorage except for the token
        Object.keys(localStorage).forEach((key) => {
          if (key !== 'token') {
            localStorage.removeItem(key);
          }
        });

        // Use setTimeout to navigate to the dashboard after the alert
        setTimeout(() => {
          navigate('/dashboard'); // Redirect after alert
        }, 100); // Small delay to ensure the alert is handled

      } else {
        const error = await response.json();
        setOrderStatus('Order failed: ' + error.message);
        alert('Order failed: ' + error.message);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderStatus('Order failed: ' + error.message);
      alert('Order failed: ' + error.message);
    }
  };
  

  return (
    <div>
      <div>
        <Topbar />
      </div>
      <div className="mt-10 font-[sans-serif] bg-white p-4 lg:max-w-7xl max-w-xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 max-lg:order-1">
            {/* Shipping, Billing, and Payment steps */}
            <form className="mt-16 max-w-lg">
              <h2 className="text-2xl font-extrabold text-gray-800">Payment method</h2>

              {/* Payment form with logos */}
              <div className="grid gap-4 sm:grid-cols-2 mt-8">
                <div className="flex items-center">
                  <input type="radio" className="w-5 h-5 cursor-pointer" id="card" checked />
                  <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                    <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="Visa Card" />
                    <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="American Express Card" />
                    <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="MasterCard" />
                  </label>
                </div>

                <div className="flex items-center">
                  <input type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                  <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer">
                    <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="PayPal Card" />
                  </label>
                </div>
              </div>

              {/* Input fields for card information */}
              <div className="grid gap-4 mt-8">
                <input
                  type="text"
                  placeholder="Cardholder's Name"
                  className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none"
                />
                <div className="flex bg-white border-b-2 focus-within:border-gray-800 overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 ml-3" viewBox="0 0 291.764 291.764">
                    <path fill="#2394bc" d="m119.259 100.23-14.643 91.122h23.405l14.634-91.122h-23.396zm70.598 37.118c-8.179-4.039-13.193-6.765-13.193-10.896.1-3.756 4.24-7.604 13.485-7.604 7.604-.191 13.193 1.596 17.433 3.374l2.124.948 3.182-19.065c-4.623-1.787-11.953-3.756-21.007-3.756-23.113 0-39.388 12.017-39.489 29.204-.191 12.683 11.652 19.721 20.515 23.943 9.054 4.331 12.136 7.139 12.136 10.987-.1 5.908-7.321 8.634-14.059 8.634-9.336 0-14.351-1.404-21.964-4.696l-3.082-1.404-3.273 19.813c5.498 2.444 15.609 4.595 26.104 4.705 24.563 0 40.546-11.835 40.747-30.152.08-10.048-6.165-17.744-19.659-24.035zm83.034-36.836h-18.108c-5.58 0-9.82 1.605-12.236 7.331l-34.766 83.509h24.563l6.765-18.08h27.481l3.51 18.153h21.664l-18.873-90.913zm-26.97 54.514c.474.046 9.428-29.514 9.428-29.514l7.13 29.514h-16.558zM85.059 100.23l-22.931 61.909-2.498-12.209c-4.24-14.087-17.533-29.395-32.368-36.999l20.998 78.33h24.764l36.799-91.021H85.059v-.01z" />
                    <path fill="#efc75e" d="M51.916 111.982c-1.787-6.948-7.486-11.634-15.226-11.734H.374L0 101.934c28.329 6.984 52.107 28.474 59.821 48.688l-7.905-38.64z" />
                  </svg>
                  <input
                    type="number"
                    placeholder="Card Number"
                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="number"
                    placeholder="EXP."
                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="CVV"
                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm"
                  >
                    I accept the{" "}
                    <a
                      href="javascript:void(0);"
                      className="text-blue-600 font-semibold hover:underline ml-1"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  type="button"
                  className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  type="button"
                  className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-800 text-white rounded-md hover:bg-[#111]"
                  onClick={handleCheckout}
                >
                  Pay ${parseFloat(1.18 * Totalsum).toFixed(2)}
                </button>
              </div>
            </form>

            {/* Display order status message */}
            {orderStatus && (
              <div className="mt-4">
                <p className={orderStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}>
                  {orderStatus}
                </p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 p-6 rounded-md">
            <h2 className="text-4xl font-extrabold text-gray-800">${parseFloat(Totalsum).toFixed(2)}</h2>
            <ul className="text-gray-800 mt-8 space-y-4">
              {productArray.map((item) => (
                <li key={item.id} className="flex flex-wrap gap-4 text-sm">
                  {`${item["Product Name"]} x ${item.quantity}`}
                  <span className="ml-auto font-bold">
                    ${parseFloat(item["Price per Unit ($)"] * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
              {/* Tax */}
              <li className="flex flex-wrap gap-4 text-sm">
                Tax
                <span className="ml-auto font-bold">
                  ${parseFloat(0.18 * Totalsum).toFixed(2)}
                </span>
              </li>
              {/* Total */}
              <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                Total Sum
                <span className="ml-auto font-bold">
                  ${parseFloat(1.18 * Totalsum).toFixed(2)}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

}

export default function CHECKOUTPAGE() {
  return (
    <RecoilRoot>
      <CheckOutPage />
    </RecoilRoot>
  );
}
