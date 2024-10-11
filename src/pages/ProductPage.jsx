import React, { useState } from 'react';
import {
  Button,
  Rating,
  Typography,
} from "@material-tailwind/react";
import 'react-loading-skeleton/dist/skeleton.css';
import { Topbar } from "../components/topbar";
import nutmegt from '../assets/products/nutmeg.png';
import { useParams } from "react-router-dom";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import { spiceAtom } from "../assets/spices";
import { cartAtom } from "../atoms/CartAtom";
import Skeleton from 'react-loading-skeleton';

export function ProductPage() {
  const { id } = useParams();
  const product = useRecoilValue(spiceAtom).find((p) => p.id === parseInt(id));
  const [itemsArray, setItemsArray] = useRecoilState(cartAtom);
  const [cartMessage, setCartMessage] = useState('Add to cart');
  const [quantity, setQuantity] = useState(1);

  const isLoading = !product; // Determine if the product data is still loading

  const handleAddToCart = () => {
    try {
      setItemsArray((prevItems) => {
        const existingItemIndex = prevItems.findIndex(item => item.id === parseInt(id));
        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          return updatedItems;
        } else {
          return [...prevItems, { id: parseInt(id), productName: product['Product Name'], quantity: quantity, price: product['Price per Unit ($)'] }];
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
        <section className="relative flex flex-col md:flex-row">
          <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Image Skeleton */}
            <div className="col-span-1">
              {isLoading ? (
                <Skeleton height={300} width={300} className="h-[300px] md:h-[400px] max-w-full" />
              ) : (
                <img
                  src={nutmegt}
                  alt="spices"
                  className="h-[300px] md:h-[400px] max-w-full object-contain"
                />
              )}
            </div>

            {/* Product Details Skeleton */}
            <div className="mr-4 px-4 md:px-0">
              {isLoading ? (
                <>
                  <Skeleton width={100} height={30} />
                  <Skeleton width={200} height={40} className="mt-4" />
                  <Skeleton width={150} height={20} className="mt-2" />
                  <Skeleton width={250} height={20} className="mt-2" />
                  <Skeleton width={300} height={80} className="mt-3" />
                  <Skeleton width={150} height={30} className="mt-4" />
                  <Skeleton width={100} height={40} className="mt-2" />
                  <Skeleton width={80} height={40} className="mt-2" />
                </>
              ) : (
                <>
                  <div className="mt-3 bg-yellow-400 inline-block px-2 py-1 rounded-lg font-bold text-sm md:text-base">
                    {product['Category']}
                  </div>
                  <Typography className="mt-2" variant="h4" md:variant="h3">
                    {product['Product Name']}
                  </Typography>
                  <div className="text-sm md:text-base">
                    {product['Brand Name']}
                  </div>
                  <div className="mt-3 text-sm flex items-center gap-2">
                    <Rating
                      value={Math.trunc(product['Customer Rating (out of 5)'])}
                      readonly
                      className='text-yellow-500 text-sm'
                    />
                    <Typography className="!text-sm font-bold !text-gray-700 flex items-center">
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
                        ${parseFloat(product['Price per Unit ($)']).toFixed(2)}
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
                </>
              )}
            </div>
          </div>

          {/* SideBox Skeleton */}
          <div className="lg:block m-10 lg:w-1/4 h-auto bg-white border p-6 overflow-y-auto rounded-2xl shadow-lg">
            {isLoading ? (
              <Skeleton height={200} />
            ) : (
              <>
                <h3 className="text-xl font-semibold">Product Details</h3>
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
                <hr className="my-4" />
                <Typography variant="body2">Extra Details Go here</Typography>
              </>
            )}
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
