import { useState, useEffect } from "react";
import nutmegt from '../assets/products/nutmeg.png';
import { useRecoilState, useSetRecoilState } from "recoil";
import { cartAtom } from "../atoms/CartAtom";
import { TotalSumAtom } from "../atoms/TotalSumAtom";

export function CartComponent({id, name, price, category}) {
    const [itemNumber, setItemNumber] = useState(1);
    const [cart, setCart] = useRecoilState(cartAtom);
    const setTotalSum = useSetRecoilState(TotalSumAtom) || 0;
    const [currentsum, setCurrentSum] = useState(0);

    useEffect(() => {
        // Find the item in the cart if it exists and set the itemNumber
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            setItemNumber(cartItem.quantity);
        }
    }, [id, cart]);

    const updateCart = (newQuantity) => {
        // If the quantity is 0, remove the item from the cart
        if (newQuantity === 0) {
            setCart(cart.filter(item => item.id !== id));
        } else {
            setCart(cart.map(item => 
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));
        }
    };

    const decreaseItem = () => {
        setItemNumber(prevItemNumber => {
            const newItemNumber = Math.max(prevItemNumber - 1, 0);
            setTotalSum(prevSum => prevSum - price);
            updateCart(newItemNumber);
            return newItemNumber;
        });
    };

    const increaseItem = () => {
        setItemNumber(prevItemNumber => {
            const newItemNumber = prevItemNumber + 1;
            setTotalSum(prevSum => prevSum + price);
            updateCart(newItemNumber);
            return newItemNumber;
        });
    };

    const deleteItem = () => {
        setCart(cart.filter(item => item.id !== id));
    };

    useEffect(() => {
        setTotalSum(itemNumber * price);
    }, [itemNumber, price, setTotalSum]);

    useEffect(() => {
        setCurrentSum(itemNumber * parseFloat(price));
    }, [itemNumber, price]);

    return (
        <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
            <div className="w-full md:max-w-[126px]">
                <img src={nutmegt} alt="spices" className="mx-auto rounded-xl object-cover"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black">{name}</h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">{category}</h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                            ${parseFloat(price).toFixed(2)}
                        </h6>
                    </div>
                </div>
                <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                    <button onClick={decreaseItem} className="group rounded-l-xl px-5 py-[18px] border border-gray-200">
                        -
                    </button>
                    <input 
                        type="text"
                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                        value={itemNumber}
                        readOnly
                    />
                    <button onClick={increaseItem} className="group rounded-r-xl px-5 py-[18px] border border-gray-200">
                        +
                    </button>
                </div>
                
                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                    <p className="font-bold text-lg leading-8 text-gray-600 text-center">${parseFloat(currentsum).toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-end col-span-4">
                    <button onClick={deleteItem} className="border border-red-400 hover:bg-red-100 shadow-lg rounded-lg py-1 px-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg></button>
                </div>
            </div>
        </div>
    );
}
