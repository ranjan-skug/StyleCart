import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function NewArrivals() {
  const scrollRef = useRef(null);
  const [isDragging, setIsDargging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`,
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  const handelMouseDown = (e) => {
    setIsDargging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setCanScrollLeft(scrollRef.current.scrollLeft);
  };
  const handelMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handelMouseUpOrLeave = () => {
    setIsDargging(false);
  };

  //   Update Scroll Buttons

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrolllabel =
        container.scrollWidth > leftScroll + container.clientWidth;
      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrolllabel);
    }
    // console.log({
    //   scrollLeft: container.scrollLeft,
    //   clientWidth: container.clientWidth,
    //   containerScrollWidth: container.scrollWidth,
    //   offsetLeft: scrollRef.current.offsetLeft,
    // });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-800 mb-8">
          Discover our latest collection of stylish and modern pieces, carefully
          selected to keep you ahead of the trends.
        </p>
        {/* Scroll Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border transition-all duration-300 ease-in-out
    ${
      canScrollLeft
        ? "bg-white text-black hover:bg-black hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
        : "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
    }`}
          >
            <FiChevronLeft className="text-2xl transition-transform duration-300" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border transition-all duration-300 ease-in-out
    ${
      canScrollRight
        ? "bg-white text-black hover:bg-black hover:text-white hover:scale-110 active:scale-95 cursor-pointer"
        : "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
    }`}
          >
            <FiChevronRight className="text-2xl transition-transform duration-300" />
          </button>
        </div>
      </div>
      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        onMouseDown={handelMouseDown}
        onMouseUp={handelMouseUpOrLeave}
        onMouseMove={handelMouseMove}
        onMouseLeave={handelMouseUpOrLeave}
        className={`container mx-auto flex space-x-6 relative overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {newArrivals.map((product, index) => (
          <div
            className="min-w-[100%] sm:min-w-[50%] md:min-w-[40%] lg:min-w-[30%] relative"
            key={index}
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[350px] object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4>{product.name}</h4>
                <p>${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
