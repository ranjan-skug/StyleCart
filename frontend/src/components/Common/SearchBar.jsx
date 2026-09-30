import React from "react";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slices/productsSlices";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  console.log("SearchBar rendered");
  console.log("Search term:", searchTerm);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  };
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ease-in-out ${isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              className="bg-gray-100 border border-gray-300 rounded-full py-1 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Search icon */}
            <button>
              <HiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-800" />
            </button>
          </div>
          {/* Close button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6 text-gray-700 hover:text-gray-800" />
          </button>
        </form>
      ) : (
        <button onClick={() => setIsOpen(!isOpen)}>
          <HiOutlineSearch className="text-2xl" />
        </button>
      )}
    </div>
  );
}
