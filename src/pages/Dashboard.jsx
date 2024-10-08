import { useSetRecoilState, useRecoilState, RecoilRoot, useRecoilValue } from "recoil";
import { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import spicebanner from '../assets/spicebanner.png'
import ProductTile from "../components/Product";
import { spiceAtom } from '../assets/spices'
import { Topbar } from "../components/topbar";

export function Dashboard(){

    return(
        <RecoilRoot>
            <div>
                <Topbar/>
                <Items/>
            </div>
        </RecoilRoot>
    );
}


export function User({ user }){
    const navigate = useNavigate();
    return(
        <div className="flex justify-between mt-3 bg-gray-100">
            <div className="font-semibold text-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                {user.firstName}
            </div>
            <div className="flex justify-end">
                <button onClick={(e) => {
                navigate("/transfermoney?id=" + user._id + "&name=" + user.firstName);
            }} className="font-light text-sm border border-black rounded-lg py-2 px-2 hover:text-white hover:bg-green-400">send money</button>
            </div>
        </div>
    );
}

export function RenderUsers() {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [filter])

    return <>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 text-lg border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key = {user._id} user={user} />)}
        </div>
    </>
}


export const Items = () => {
    const spiceArray = useRecoilValue(spiceAtom);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
  
    // Calculate total pages based on filtered spiceArray
    const filteredSpiceArray = spiceArray.filter((item) =>
      item['Product Name'].toLowerCase().includes(searchTerm.toLowerCase())
    );
    const totalPages = Math.ceil(filteredSpiceArray.length / itemsPerPage);
  
    // Determine displayed items on current page considering search
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = filteredSpiceArray.slice(startIndex, endIndex);
  
    // Handle page change
    const handleNextPage = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };
  
    const handlePrevPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    // Handle search term change and update displayed items
  
    return (
      <section className="bg-white sm:pb-10 lg:pb-10">
        <div className="shadow-2xl relative">
          <img className="object-cover w-full" src={spicebanner} alt="Login Visual" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <h1 className="absolute bottom-0 left-0 right-0 text-2xl font-mono mb-0 font-bold text-center text-white p-4d sm:text-4xl sm:mb-10">
              Welcome to the garden of Indian spices!
            </h1>
          </div>
        </div>
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mt-10 sm:text-3xl bg-re py-2 px-3 shadow-lg">
            Our featured items
          </h2>
  
          {/* Search bar */}
          <div className="flex mt-4 mb-6">
            <input
              className="w-full px-3 py-2 rounded-md border shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              type="text"
              placeholder="Search spices..."

              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </div>
  
          <div>
            {/* Render the products for the current page */}
            <div className="grid sm:grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4 mb-10">
              {displayedItems.map((item) => (<div>
                <ProductTile
                  id={item['id']}
                  key={item['Product Name']}
                  name={item['Product Name']}
                  brandName={item['Brand Name']}
                  price={parseFloat(item['Price per Unit ($)'].toFixed(2))}
                  category={item['Category']}
                  rating={item['Customer Rating (out of 5)']}
                />
              </div>
                
              ))}
            </div>
            {/* Pagination controls */}
            {totalPages > 1 && ( <div className="flex justify-center mt-6">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-2 text-sm font-medium text-white bg-blue-500 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 mx-2 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-2 text-sm font-medium text-white bg-blue-500 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>)}
           
          </div>
          
        </div>
      </section>
    );
  }