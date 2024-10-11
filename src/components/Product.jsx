import nutmegt from '../assets/products/nutmeg.png';
import { Rating } from "@material-tailwind/react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the CSS for Skeleton

export default function ProductTile({ id, name, price, category, rating, brandName, loading }) {
    return (
        <div className="relative group m-5 bg-gray-50 shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105">
            <a href={`/#/productpage/${id}`}>
                <div className="overflow-hidden aspect-w-1 aspect-h-1">
                    {loading ? (
                        <Skeleton height={200} /> 
                    ) : (
                        <img
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                            src={nutmegt}
                            alt={name}
                        />
                    )}
                </div>
                <div className="flex flex-col justify-between p-4 h-full">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">
                            {loading ? (
                                <Skeleton width={150} /> 
                            ) : (
                                <a title={name} className='hover:text-orange-400'>
                                    {name}
                                </a>
                            )}
                        </h3>
                        <div className='font-light text-sm'>
                            {loading ? (
                                <Skeleton width={100} /> 
                            ) : (
                                brandName
                            )}
                        </div>
                        <div className='flex items-center mt-2'>
                            {loading ? (
                                <Skeleton width={80} height={20} /> 
                            ) : (
                                <>
                                    <Rating
                                        value={Math.trunc(rating)} // Truncated rating value
                                        readonly // Makes it readonly
                                        className='text-yellow-500 text-sm font-bold' // Reduces size of stars
                                    />
                                    <div className='font-medium ml-2 text-sm'>{rating.toFixed(1)}</div> {/* Shows the original rating with 1 decimal */}
                                </>
                            )}
                        </div>
                        <div className='mt-2'>
                            {loading ? (
                                <Skeleton width={50} height={20} /> 
                            ) : (
                                <span className='rounded-2xl px-2 py-1 text-xs font-medium bg-yellow-400'>{category}</span>
                            )}
                        </div>
                    </div>

                    <div className="text-right mt-4">
                        {loading ? (
                            <>
                                <Skeleton width={80} height={20} /> {/* Skeleton for price label */}
                                <Skeleton width={50} height={30} /> {/* Skeleton for price */}
                            </>
                        ) : (
                            <>
                                <div className="text-sm">Price per Unit</div>
                                <p className="text-2xl font-bold text-gray-900">${price}</p>
                            </>
                        )}
                    </div>
                </div>
            </a>
        </div>
    );
}
