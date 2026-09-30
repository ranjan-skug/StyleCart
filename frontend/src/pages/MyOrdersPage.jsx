import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching ordrs
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345",
          createdAt: new Date(),
          shippingAddres: { city: "New York", country: "USA" },
          ordersItem: [
            {
              name: "Product 1",
              image: "https://picsum.photos/500/500?random=1",
            },
          ],
          totalPrice: 1290,
          isPaid: true,
        },
        {
          _id: "123645",
          createdAt: new Date(),
          shippingAddres: { city: "New York", country: "USA" },
          ordersItem: [
            {
              name: "Product 2",
              image: "https://picsum.photos/500/500?random=2",
            },
          ],
          totalPrice: 1390,
          isPaid: false,
        },
        {
          _id: "123445",
          createdAt: new Date(),
          shippingAddres: { city: "New York", country: "USA" },
          ordersItem: [
            {
              name: "Product 3",
              image: "https://picsum.photos/500/500?random=3",
            },
          ],
          totalPrice: 1200,
          isPaid: true,
        },
        {
          _id: "1233245",
          createdAt: new Date(),
          shippingAddres: { city: "New York", country: "USA" },
          ordersItem: [
            {
              name: "Product 4",
              image: "https://picsum.photos/500/500?random=4",
            },
          ],
          totalPrice: 12390,
          isPaid: false,
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);

  const handelRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

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
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handelRowClick(order._id)}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-2 px-2 sm:py-2 sm:px-4">
                    <img
                      className="w-10 h-10 object-cover rounded-lg sm:w-12 sm:h-12"
                      src={order.ordersItem[0].image}
                      alt={order.ordersItem[0].name}
                    />
                  </td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4 font-medium text-gray-900 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4">
                    {order.shippingAddres
                      ? `${order.shippingAddres.city}, ${order.shippingAddres.country}`
                      : "N/A"}
                  </td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4">
                    {order.ordersItem.length}
                  </td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4">
                    {order.totalPrice}
                  </td>
                  <td className="py-2 px-2 sm:py-2 sm:px-4">
                    <span
                      className={`${order.isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
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
