import { useSetRecoilState, useRecoilState, RecoilRoot, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTile from "../components/Product";
import { spiceAtom } from '../assets/spices';
import { Topbar } from "../components/topbar";

export function Dashboard() {
  return (
    <RecoilRoot>
      <div>
        <Topbar />
        <Items />
      </div>
    </RecoilRoot>
  );
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

  return (
    <section className="bg-white sm:pb-10 lg:pb-10">
      <div className="flex flex-col justify-center items-center py-10 bg-gradient-to-r from-yellow-100 to-yellow-200 shadow-lg">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 transition-opacity duration-500 ease-in-out">
          Welcome to the World of Indian Spices!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore a curated selection of the finest spices from across India.
        </p>
      </div>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-900 mt-10 sm:text-3xl bg-re py-2 px-3 shadow-lg transition-colors duration-300 hover:bg-gray-100">
          Our Featured Items
        </h2>

        {/* Search bar */}
        <div className="flex mt-4 mb-6">
          <input
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
            {displayedItems.map((item) => (
              <div key={item.id}>
                <ProductTile
                  id={item.id}
                  name={item['Product Name']}
                  brandName={item['Brand Name']}
                  price={parseFloat(item['Price per Unit ($)'].toFixed(2))}
                  category={item['Category']}
                  rating={item['Customer Rating (out of 5)']}
                  loading={false}
                />
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded transition-opacity duration-300 hover:bg-blue-600 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded transition-opacity duration-300 hover:bg-blue-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
