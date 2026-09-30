import React from "react";
import { useSearchParams } from "react-router-dom";

export default function SortOptions() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handelSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        className="border p-2 rounded-md focus:outline-none"
        onChange={handelSortChange}
        value={searchParams.get("sortBy") || ""}
        id="sort"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
}
