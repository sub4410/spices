import { useState, useMemo } from "react";
import { useRecoilValue, RecoilRoot } from "recoil";
import { Topbar } from "../components/topbar";
import { cartAtom } from "../atoms/CartAtom";
import { spiceAtom } from "../assets/spices";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import toast, { Toaster } from 'react-hot-toast';


export function CheckOutPage() {
  const cartItems = useRecoilValue(cartAtom); // Now contains id and quantity
  const products = useRecoilValue(spiceAtom); // All available products
  const navigate = useNavigate(); 
  
  // Local state for tracking checkbox and order status
  const [isChecked, setIsChecked] = useState(false); // Track if the checkbox is checked
  const [orderStatus, setOrderStatus] = useState(''); // Track order status
  const [warningMessage, setWarningMessage] = useState(''); // Track warning message
  
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
  const handleCheckout = async () => {
    setWarningMessage(''); // Clear any previous warning messages

    // Check if the checkbox is ticked
    if (!isChecked) {
      setWarningMessage('Please accept the Terms and Conditions before placing your order.');
      return;
    }

    // Check if there are items in the cart and if the total sum is greater than 0
    if (Totalsum <= 0 || cartItems.length === 0) {
      setWarningMessage('Your cart is empty. Please add items to place an order.');
      return;
    }

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
        productName: item.productName,
        quantity: item.quantity,
        productPrice: item.price,
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
        toast.success('Order placed successfully!', {
          icon: '✅', // Or you can use an SVG like <CheckCircleIcon className="h-6 w-6 text-green-500" />
          duration: 3000, // Show success message for 3 seconds
          style: {
            border: '1px solid #4CAF50',
            padding: '16px',
            color: '#4CAF50',
          },
        });
  
        // Clear all items in localStorage except for the token
        Object.keys(localStorage).forEach((key) => {
          if (key !== 'token' && key !== 'userInfo') {
            localStorage.removeItem(key);
          }
        });

        // Use setTimeout to navigate to the dashboard after the alert
        setTimeout(() => {
          navigate('/dashboard'); // Redirect after alert
        }, 3000); // Small delay to ensure the alert is handled

      } else {
        const error = await response.json();
        setOrderStatus('Order failed: ' + error.message);
        toast.error('Order failed: ' + error.message, { duration: 5000 });
      
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderStatus('Order failed: ' + error.message);
      toast.error('Order failed: ' + error.message, { duration: 5000 });
    
    }
  };
  

  return (
    <div>
      <Toaster />
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
              <div className=" flex gap-4 mt-8">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
                Pay after the order is confirmed 
              </div>

              {/* Input fields for card information */}
              <div className="grid gap-4 mt-8">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)} // Update the state when checkbox is changed
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

              {/* Warning Message */}
              {warningMessage && (
                <div className="mt-4 text-red-500">
                  {warningMessage}
                </div>
              )}

              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => { navigate('/cart') }}
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
                  Place Order
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
