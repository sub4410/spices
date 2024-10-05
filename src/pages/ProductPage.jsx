import React, { useState } from 'react';
import {
  Button,
  Rating,
  Typography,
} from "@material-tailwind/react";
import { Topbar } from "../components/topbar";
import nutmegt from '../assets/products/nutmeg.png';
import { useParams } from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { spiceAtom } from "../assets/spices";
import { cartAtom } from "../atoms/CartAtom";

export function ProductPage() {
  const { id } = useParams();
  const product = useRecoilValue(spiceAtom).find((p) => p.id === parseInt(id));
  const [itemsArray, setItemsArray] = useRecoilState(cartAtom); // for adding items to cartArray
  const [cartMessage, setCartMessage] = useState('Add to cart');
  const [quantity, setQuantity] = useState(1); // Default quantity set to 1

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const handleAddToCart = () => {
    try {
      setItemsArray((prevItems) => {
        // Check if the product already exists in the cart
        const existingItemIndex = prevItems.findIndex(item => item.id === parseInt(id));
  
        // If the product is already in the cart, update its quantity
        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity; // Update the quantity
          return updatedItems;
        } else {
          // If the product is not in the cart, add it as a new item
          return [...prevItems, { id: parseInt(id), quantity: quantity, price: product['Price per Unit ($)']}];
        }
      });
  
      setCartMessage('Item Added to cart');
    } catch (error) {
      setCartMessage('Item added to cart');
    }
  };
  

  return (
    <RecoilRoot>
      <div className="">
        <Topbar />
        <section className="relative flex flex-col md:flex-row md:">
          <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="col-span-1">
              <img
                src={nutmegt}
                alt="spices"
                className="h-[300px] md:h-[400px] max-w-full object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="mr-4 px-4 md:px-0">
              <div className="mt-3 bg-yellow-400 inline-block px-2 py-1 rounded-lg font-bold text-sm md:text-base">
                {product['Category']}
              </div>

              <Typography className="mt-2" variant="h4" md:variant="h3">
                {product['Product Name']}
              </Typography>
              <div className="text-sm md:text-base">
                {product['Brand Name']}
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Rating value={4} className="text-amber-500" />
                <Typography className="!text-sm font-bold !text-gray-700">
                  {product['Customer Rating (out of 5)']} ({product['Number of Reviews']})
                </Typography>
              </div>

              <Typography className="mt-4 text-sm md:text-base font-normal leading-relaxed !text-gray-500">
                Nutmeg is a warm, aromatic spice derived from the seeds of the nutmeg tree, native to Indonesia. Known for its sweet, slightly nutty flavor, it's commonly used in baking, cooking, and beverages. Nutmeg also has potential medicinal benefits, aiding digestion and providing anti-inflammatory effects.
              </Typography>

              <hr className="my-4 border border-gray-300" />

              <Typography variant="h5">
                <div className="mt-1 flex text-sm md:text-base font-light">
                  Price per unit:
                  <div className="ml-2 font-bold text-red-700">
                    ${product['Price per Unit ($)']}
                  </div>
                </div>
              </Typography>

              <div className="flex text-sm md:text-base">
                Bulk Pricing (if applicable):
                <div className="ml-2 font-bold text-red-700">
                  ${parseFloat(product['Bulk Pricing (if applicable) ($)']).toFixed(2)}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                >
                  {/* Options for selecting quantity */}
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4 flex w-full items-center gap-3 md:w-1/2">
                <Button onClick={handleAddToCart} className="bg-orange-400 mt-10 w-full py-2 text-black text-md">
                  {cartMessage}
                </Button>
              </div>
            </div>
          </div>

          {/* SideBox - Shown on larger screens */}
          <div className=" lg:block m-10 lg:w-1/4 h-auto bg-white border p-6 overflow-y-auto rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold">Product Details</h3>
            <br />

            <div className="mt-4">
              <table className="w-full text-sm text-left">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="py-3 px-6">Total Cost</td>
                    <td className="py-3 px-6">{parseFloat(product['Total Cost ($)']).toFixed(2)}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-3 px-6">Available Quantity</td>
                    <td className="py-3 px-6">{product['Available Quantity']}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="py-3 px-6">Min Order Quantity</td>
                    <td className="py-3 px-6">{product['Minimum Order Quantity']}</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="py-3 px-6">Pincode of Seller's Warehouse</td>
                    <td className="py-3 px-6">{product["Pincode of Seller's Warehouse (USA)"]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr className="my-4" />
            <Typography variant="body2">Extra Details Go here</Typography>
          </div>
        </section>
      </div>
    </RecoilRoot>
  );
}

export default function PRODUCT() {
  return (
    <RecoilRoot>
      <ProductPage />
    </RecoilRoot>
  );
}
