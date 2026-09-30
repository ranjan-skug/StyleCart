import React from "react";
import { Link } from "react-router-dom";

export default function ProductManagement() {
  const products = [
    {
      _id: 123123,
      name: "Jackets",
      price: 120,
      sku: "12023",
    },
  ];
  const handelDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete the produt!")) {
      console.log("Product id is:", productId);
    }
  };
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Product Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b text-gray-900 hover:bg-gray-200 cursor-pointer"
                >
                  <td className="py-3 px-4 font-medium whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="py-3 px-4">{product.price}</td>
                  <td className="py-3 px-4">{product.sku}</td>
                  <td>
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-400 text-sm text-white py-1 px-3 rounded hover:bg-yellow-500 mr-3"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handelDelete(product._id)}
                      className="bg-red-400 text-sm text-white hover:bg-red-500 py-1 px-3 rounded cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-md text-gray-500 text-center py-4"
                >
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
