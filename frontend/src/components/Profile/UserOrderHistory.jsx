import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, please login");
        setLoading(false);
        return;
      }

      const headers = {
        authorization: `Bearer ${token}`,
      };

      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        setOrders(res.data.data || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
            <div className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              📦
            </div>
          </div>
          <p className="text-yellow-300 text-xl font-semibold">
            Loading order history...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 md:p-12 rounded-xl border border-zinc-700 shadow-lg text-white">
      <h2 className="text-4xl font-bold text-yellow-300 mb-10 text-center drop-shadow-lg">
        My Order History
      </h2>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, i) => (
            <div
              key={order._id || i}
              className="bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-700 hover:border-yellow-400 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center gap-4">
                  {order.book?.url ? (
                    <img
                      src={
                        order.book.url.startsWith("http")
                          ? order.book.url
                          : `http://localhost:1000/${order.book.url}`
                      }
                      alt={order.book.title}
                      className="h-20 w-16 object-cover rounded-lg border border-zinc-600"
                    />
                  ) : (
                    <div className="h-20 w-16 bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-400">
                      📖
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-300">
                      {order.book?.title || "Untitled Book"}
                    </h3>
                    <p className="text-zinc-400">
                      {order.book?.author || "Unknown Author"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-sm text-zinc-400">
                    Ordered on:{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "Unknown Date"}
                  </p>
                  <p
                    className={`font-semibold mt-1 ${
                      order.status === "Delivered"
                        ? "text-green-400"
                        : order.status === "Order placed"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {order.status || "Pending"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-400 text-center text-lg mt-20">
          You have no orders yet. Place your first order to see it here!
        </p>
      )}
    </div>
  );
};

export default OrderHistory;
