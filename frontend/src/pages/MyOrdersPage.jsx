import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../redux/slices/orderSlice";

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-2 px-4 sm:py-3 font-bold">Image</th>
              <th className="py-2 px-4 sm:py-3 font-bold">Order ID</th>
              <th className="py-2 px-4 sm:py-3 font-bold">Created</th>
              <th className="py-2 px-4 sm:py-3 font-bold">Shipping Address</th>
              <th className="py-2 px-4 sm:py-3 font-bold">Items</th>
              <th className="py-2 px-4 sm:py-3 font-bold">Price</th>
              <th className="py-2 px-4 sm:py-3 font-bold">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => {
                // Safely get order items

                const orderItems = order.orderItems || [];

                // First product
                const firstItem = orderItems[0];

                return (
                  <tr
                    key={order._id}
                    onClick={() => handleRowClick(order._id)}
                    className="border-b hover:bg-gray-100 cursor-pointer"
                  >
                    {/* IMAGE */}
                    <td className="py-2 px-2 sm:py-2 sm:px-4">
                      {firstItem?.image ? (
                        <img
                          className="w-10 h-10 object-cover rounded-lg sm:w-12 sm:h-12"
                          src={firstItem.image}
                          alt={firstItem.name || "Product"}
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg flex items-center justify-center text-xs">
                          N/A
                        </div>
                      )}
                    </td>

                    {/* ORDER ID */}
                    <td className="py-2 px-2 sm:py-2 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                      #{order._id}
                    </td>

                    {/* CREATED */}
                    <td className="py-2 px-2 sm:py-2 sm:px-4">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleTimeString()
                        : ""}
                    </td>

                    {/* SHIPPING ADDRESS */}
                    <td className="py-2 px-2 sm:py-2 sm:px-4">
                      {order.shippingAddress
                        ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                        : "N/A"}
                    </td>

                    {/* ITEMS */}
                    <td className="py-2 px-2 sm:py-2 sm:px-4">
                      {orderItems.length}
                    </td>

                    {/* PRICE */}
                    <td className="py-2 px-2 sm:py-2 sm:px-4">
                      ${Number(order.totalPrice || 0).toFixed(2)}
                    </td>

                    {/* STATUS */}
                    <td className="py-2 px-2 sm:py-2 sm:px-4">
                      <span
                        className={`${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        } px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                  You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
