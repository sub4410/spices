import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroller";

export const LandingPage = () => {
  const [visibleElements, setVisibleElements] = useState([]);

  // Ref for sections
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Create the IntersectionObserver instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prevVisible) => [
              ...prevVisible,
              entry.target.dataset.id,
            ]);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    // Observe each section
    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const loadMoreItems = () => {
    // Your logic to load more items for infinite scrolling
  };

  const isVisible = (id) => visibleElements.includes(id);

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMoreItems}
      hasMore={true} // Assume there are more items for the example
      loader={<div className="loader" key={0}></div>}
    >
      <div className="bg-white">
        {/* Hero Section */}
        <header
          className={`relative bg-orange-200 transition-opacity duration-1000 ${
            isVisible("hero") ? "opacity-100" : "opacity-0"
          }`}
          data-id="hero"
          ref={(el) => (sectionRefs.current[0] = el)}
        >
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center lg:text-left">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-7xl">
                  <span className="block text-black">Shri.Organic.Roots.</span>
                  <span className="mt-5 block text-6xl text-orange-900">
                    Fresh aromatic spices, Delivered to Your Doorstep
                  </span>
                </h1>
                <p className="mt-4 text-lg text-black">
                  Discover the rich flavors and aromas of authentic spices
                  sourced directly from the best farms. Perfect for enhancing
                  your cooking.
                </p>
                <div className="mt-8 flex justify-center lg:justify-start">
                  <a
                    href="#/dashboard"
                    className="px-6 py-3 bg-black text-white font-semibold rounded-md shadow hover:bg-orange-900"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Product Highlights */}
        <section
          className={`py-12 bg-gray-50 transition-opacity duration-1000 ${
            isVisible("products") ? "opacity-100" : "opacity-0"
          }`}
          data-id="products"
          ref={(el) => (sectionRefs.current[1] = el)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Bestselling Spices
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {/* Product 1 */}
              <div className="bg-white shadow rounded-lg p-6">
                <img
                  src="https://images.immediate.co.uk/production/volatile/sites/30/2016/08/cinnamon-benefits44-724deaf.jpg?quality=90&resize=440,400"
                  alt="Cinnamon"
                  className="w-full h-60 object-cover rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  Organic Cinnamon
                </h3>
                <p className="mt-2 text-gray-600">100% pure and aromatic.</p>
                <button className="mt-4 bg-orange-200 text-black font-bold px-4 py-2 rounded-md hover:bg-yellow-600">
                  Buy Now
                </button>
              </div>

              {/* Product 2 */}
              <div className="bg-white shadow rounded-lg p-6">
                <img
                  src="https://media.post.rvohealth.io/wp-content/uploads/2020/09/Tumeric_732x549-thumbnail.jpg"
                  alt="Turmeric"
                  className="w-full h-60 object-cover rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  Organic Turmeric
                </h3>
                <p className="mt-2 text-gray-600">Bright and full of flavor.</p>
                <button className="mt-4 bg-orange-200 text-black font-bold px-4 py-2 rounded-md hover:bg-yellow-600">
                  Buy Now
                </button>
              </div>

              {/* Product 3 */}
              <div className="bg-white shadow rounded-lg p-6">
                <img
                  src="https://cdn-prod.medicalnewstoday.com/content/images/articles/319/319562/cumin-seeds-on-a-wooden-spoon.jpg"
                  alt="Cumin"
                  className="w-full h-60 object-cover rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  Organic Cumin
                </h3>
                <p className="mt-2 text-gray-600">Earthy and flavorful.</p>
                <button className="mt-4 bg-orange-200 text-black font-bold px-4 py-2 rounded-md hover:bg-yellow-600">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Additional sections with similar structure */}
        {/* Benefits Section */}
      <section className={`py-12 bg-gray-50 transition-opacity duration-1000 ${
            isVisible("products") ? "opacity-100" : "opacity-0"
          }`}
          data-id="products"
          ref={(el) => (sectionRefs.current[1] = el)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Why Choose Us?
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 inline-flex p-4 rounded-full mb-4">
                🌿
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                100% Organic
              </h3>
              <p className="mt-2 text-gray-600">
                All spices are sourced from organic farms with no additives.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 inline-flex p-4 rounded-full mb-4">
                🚚
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Free Shipping
              </h3>
              <p className="mt-2 text-gray-600">
                Free shipping on all orders over $50.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 inline-flex p-4 rounded-full mb-4">
                ⭐
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Top Rated
              </h3>
              <p className="mt-2 text-gray-600">
                Our customers love our spices, and so will you!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-12 bg-green-800 transition-opacity duration-1000 ${
            isVisible("products") ? "opacity-100" : "opacity-0"
          }`}>
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to Spice Up Your Cooking?
          </h2>
          <p className="mt-4 mb-10 text-lg text-green-100">
            Explore our collection of organic, fresh, and flavorful spices
            today. <br /> Elevate your cooking to the next level!
          </p>
          <a
            href="#/dashboard"
            className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-md shadow hover:bg-yellow-100">
            Start Shopping
          </a>
        </div>
      </section>

        {/* Add more sections if necessary, following the same pattern */}

      </div>
    </InfiniteScroll>
  );
};

export default LandingPage;
