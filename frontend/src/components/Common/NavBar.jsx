import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { HiMiniXMark } from "react-icons/hi2";
import { useSelector } from "react-redux";

export default function NavBar() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleCartDrawer = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };
  const toggleNavDrawer = () => {
    console.log("toggleNavDrawer");
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          {/* Left - Logo */}
          <div className="text-xl font-bold">
            <Link to="/">WearHouse</Link>
          </div>
          {/* Middle - Navigation Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="collections/all?gender=Men"
              className="hover:text-black text-gray-700 text-sm font-medium uppercase"
            >
              MEN
            </Link>
            <Link
              to="collections/all?gender=Women"
              className="hover:text-black text-gray-700 text-sm font-medium uppercase"
            >
              Women
            </Link>
            <Link
              to="collections/all?category=Top Wear"
              className="hover:text-black text-gray-700 text-sm font-medium uppercase"
            >
              Top Wear
            </Link>
            <Link
              to="collections/all?category=Bottom Wear"
              className="hover:text-black text-gray-700 text-sm font-medium uppercase"
            >
              Bottom Wear
            </Link>
          </div>
          {/* {Right icons} */}
          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="text-white bg-black text-sm px-2 rounded"
            >
              Admin
            </Link>
            <Link
              to="profile"
              className="hover:text-black text-gray-700 text-sm font-medium uppercase"
            >
              <HiOutlineUser className="text-2xl" />
            </Link>
            <button
              onClick={toggleCartDrawer}
              className="hover:text-black text-gray-700 text-sm font-medium uppercase cursor-pointer"
            >
              <HiOutlineShoppingCart className="text-2xl" />
              {cartItemCount > 0 && (
                <span className="absolute bg-red-500 text-white rounded-full text-xs px-1 top-13">
                  {cartItemCount}
                </span>
              )}
            </button>
            {/* Search Bar */}
            <div className="overflow-hidden">
              <SearchBar />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleNavDrawer}
              className="md:hidden hover:text-black text-gray-700 text-sm font-medium uppercase cursor-pointer"
            >
              <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </nav>
      <CartDrawer
        cartDrawerOpen={cartDrawerOpen}
        toggleCartDrawer={toggleCartDrawer}
      />

      <div
        className={`fixed w-3/4 left-0 top-0 sm:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black cursor-pointer"
            >
              Men
            </Link>
            <Link
              to="collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black cursor-pointer"
            >
              Women
            </Link>
            <Link
              to="collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black cursor-pointer"
            >
              Top Wear
            </Link>
            <Link
              to="collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="block text-gray-600 hover:text-black cursor-pointer"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
