import React, { useState, useEffect } from 'react';

export const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  // Function to handle window resize
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false); // Close the menu when width is >= 768px
    }
  };

  // Use useEffect to add resize event listener
  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="flex flex-wrap place-items-center w-screen ">
        <section className="relative mx-auto w-screen">
          {/* Navbar */}
          <nav className="flex justify-between bg-orange-200 text-black w-screen">
            <div className="px-5 xl:px-12 py-6 flex w-full items-center w-screen">
              <a className="text-3xl font-bold font-heading" href="#/dashboard">
                {/* <img className="h-9" src="logo.png" alt="logo"> */}
                Shri.Organic.Roots.
              </a>
              {/* Nav Links */}
              <ul className="hidden md:flex px-4 text-lg mx-auto font-semibold font-heading space-x-12">
                <li>
                  <a 
                    className="relative pb-1 font-light after:block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black  after:transition-all after:duration-300 hover:after:w-full"
                    href="/#/dashboard"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    className="relative pb-1 font-light  after:block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    href="/#/myorders"
                  >
                    My Orders
                  </a>
                </li>
                <li>
                  <a 
                    className="relative pb-1 font-light  after:block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    href="#"
                  >
                    Collections
                  </a>
                </li>
                <li>
                  <a 
                    className="relative pb-1 font-light  after:block after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                    href="#"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>

              {/* Header Icons */}
              <div className="hidden xl:flex items-center space-x-5">
                <a className="flex items-center hover:bg-orange-400 px-2 py-2 rounded-xl" href="#/cart">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </a>
                <div className='ml-10'>
                    {userInfo.username}
                </div>
                {/* Sign In / Register */}
                { userInfo.isAdmin ? (
                <a className="flex items-center " href="#/admin">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
                ) : (<a className="flex items-center hover:bg-orange-400 px-2 py-2 rounded-xl" href="#/Userprofile">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>)}
              </div>
            </div>
            {/* Responsive Navbar */}
            <a className="xl:hidden flex mr-6 items-center" href="#/cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
              </span>
            </a>
            <a className="navbar-burger self-center mr-12 md:hidden" href="#" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </a>
            <ul
        className={`z-20 absolute md:absolute bg-gray-900 w-full left-0 top-16 md:top-16 transition-all duration-500 ease-in-out overflow-hidden${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionProperty: 'max-height, opacity' }} // For smooth transitions
      >

              <li className="text-center md:text-left">
                <a href="#/dashboard" className="block text-white py-2 md:py-0 hover:bg-gray-900 px-4">Home</a>
              </li>
              <li className="text-center md:text-left">
                <a href="#/myorders" className="block text-white py-2 md:py-0 hover:bg-gray-900 px-4">My Orders</a>
              </li>
              <li className="text-center md:text-left">
                  <a href="#" className="block text-white py-2 md:py-0 hover:bg-gray-900 px-4">Services</a>
              </li>
              <li className="text-center md:text-left">
                  <a href="#" className="block text-black py-2 md:py-0 hover:bg-gray-900 px-4">Contact us</a>
              </li>
              <li>
              <a className="flex justify-center items-center hover:text-gray-200" href="#/Userprofile">
               Account
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </li>
              </ul>
          </nav>
        </section>
        
      </div>
      
    </>
  );
};

