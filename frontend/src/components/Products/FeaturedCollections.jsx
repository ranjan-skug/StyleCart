import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";

export default function FeaturedCollections() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        {/* Left Side Contents Area */}
        <div className="lg:w-1/2 text-center p-8 lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Confort and Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Apparel made for your everyday Life
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every
            day.
          </p>
          <Link
            to="/collection/all"
            className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
        {/* Right Contents */}
        <div className="lg:w-1/2">
          <img
            src={featured}
            alt="Featured Collections"
            className="w-full h-full lg:rounded-r-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
