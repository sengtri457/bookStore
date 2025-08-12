// import axios from 'axios';
// import React, { useEffect, useState, useCallback } from 'react';
// import { FaUserLarge } from 'react-icons/fa6';

// const AllOrders = () => {
//   const [allOrders, setAllOrders] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Safely get localStorage values
//   const getAuthHeaders = useCallback(() => {
//     try {
//       const id = localStorage.getItem("id");
//       const token = localStorage.getItem("token");
      
//       if (!id || !token) {
//         throw new Error("Missing authentication credentials");
//       }
      
//       return {
//         id: id,
//         authorization: `Bearer ${token}`,
//       };
//     } catch (error) {
//       console.error("Error accessing localStorage:", error);
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         const headers = getAuthHeaders();
//         if (!headers) {
//           throw new Error("Unable to get authentication headers");
//         }

//         const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", { 
//           headers 
//         });
        
//         setAllOrders(response.data.data);
//       } catch (error) {
//         console.error("Failed to fetch orders", error);
//         setError(error.response?.data?.message || error.message || "Failed to fetch orders");
//         setAllOrders([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [getAuthHeaders]);

//   if (loading) {
//     return (
//       <div className='h-[100%] flex items-center justify-center text-white'>
//         <div className='text-center'>
//           <div className='animate-pulse'>Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className='h-[100%] flex items-center justify-center text-white'>
//         <div className='text-center'>
//           <div className='text-red-400 mb-2'>Error: {error}</div>
//           <button 
//             onClick={() => window.location.reload()} 
//             className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded'
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!allOrders || allOrders.length === 0) {
//     return (
//       <div className='h-[100%] flex items-center justify-center text-white'>
//         <div className='text-center'>
//           <div className='text-zinc-400'>No orders found.</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className='h-[100%] p-4 text-zinc-100'>
//       <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
//         All Orders
//       </h1>

//       <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 font-semibold'>
//         <div className='w-[3%] text-center'>Sr.</div>
//         <div className='w-[40%] md:w-[22%]'>Books</div>
//         <div className='w-0 md:w-[45%] hidden md:block'>Descriptions</div>
//         <div className='w-[17%] md:w-[9%]'>Price</div>
//         <div className='w-[30%] md:w-[16%]'>Status</div>
//         <div className='w-[10%] md:w-[5%] text-center'><FaUserLarge /></div>
//       </div>

//       {allOrders.map((order, index) => (
//         <div
//           key={order._id}
//           className='mt-2 bg-zinc-700 w-full rounded py-2 px-4 flex gap-2 items-center text-white hover:bg-zinc-600 transition-colors'
//         >
//           <div className='w-[3%] text-center'>{index + 1}</div>
//           <div className='w-[40%] md:w-[22%]'>
//             {order.book?.title || "Unknown"}
//           </div>
//           <div className='w-0 md:w-[45%] hidden md:block truncate'>
//             {order.book?.desc || "No description"}
//           </div>
//           <div className='w-[17%] md:w-[9%]'>
//             ${order.book?.price?.toFixed(2) || "0.00"}
//           </div>
//           <div className='w-[30%] md:w-[16%]'>
//             <span className={`px-2 py-1 rounded text-xs ${
//               order.status === 'delivered' ? 'bg-green-600' :
//               order.status === 'shipped' ? 'bg-blue-600' :
//               order.status === 'cancelled' ? 'bg-red-600' :
//               'bg-yellow-600'
//             }`}>
//               {order.status || "Pending"}
//             </span>
//           </div>
//           <div className='w-[10%] md:w-[5%] text-center'>
//             {order.user?.username || order.user?.name || "Unknown"}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AllOrders;
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { FaUserLarge } from 'react-icons/fa6';

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null); // Track which order is being updated

  // Safely get localStorage values
  const getAuthHeaders = useCallback(() => {
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      
      if (!id || !token) {
        throw new Error("Missing authentication credentials");
      }
      
      return {
        id: id,
        authorization: `Bearer ${token}`,
      };
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const headers = getAuthHeaders();
        if (!headers) {
          throw new Error("Unable to get authentication headers");
        }

        const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", { 
          headers 
        });
        
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setError(error.response?.data?.message || error.message || "Failed to fetch orders");
        setAllOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [getAuthHeaders]);

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdating(orderId);
      
      const headers = getAuthHeaders();
      if (!headers) {
        throw new Error("Unable to get authentication headers");
      }

      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${orderId}`, 
        { status: newStatus },
        { headers }
      );

      if (response.data.status === "success") {
        // Update the local state
        setAllOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Failed to update order status", error);
      alert("Failed to update order status: " + (error.response?.data?.message || error.message));
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className='h-[100%] flex items-center justify-center text-white'>
        <div className='text-center'>
          <div className='animate-pulse'>Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-[100%] flex items-center justify-center text-white'>
        <div className='text-center'>
          <div className='text-red-400 mb-2'>Error: {error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className='bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!allOrders || allOrders.length === 0) {
    return (
      <div className='h-[100%] flex items-center justify-center text-white'>
        <div className='text-center'>
          <div className='text-zinc-400'>No orders found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className='h-[100%] p-4 text-zinc-100 '>
      <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
        All Orders
      </h1>

      <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 font-semibold'>
        <div className='w-[3%] text-center'>Sr.</div>
        <div className='w-[40%] md:w-[22%]'>Books</div>
        <div className='w-0 md:w-[45%] hidden md:block'>Descriptions</div>
        <div className='w-[17%] md:w-[9%]'>Price</div>
        <div className='w-[30%] md:w-[16%]'>Status</div>
        <div className='w-[10%] md:w-[5%] text-center'><FaUserLarge /></div>
      </div>

      {allOrders.map((order, index) => (
        <div
          key={order._id}
          className='mt-2 bg-zinc-700 w-full rounded py-2 px-4 flex gap-2 items-center text-white hover:bg-zinc-600 transition-colors'
        >
          <div className='w-[3%] text-center'>{index + 1}</div>
          <div className='w-[40%] md:w-[22%]'>
            {order.book?.title || "Unknown"}
          </div>
          <div className='w-0 md:w-[45%] hidden md:block truncate'>
            {order.book?.desc || "No description"}
          </div>
          <div className='w-[17%] md:w-[9%]'>
            ${order.book?.price?.toFixed(2) || "0.00"}
          </div>
          <div className='w-[30%] md:w-[16%]'>
            <select
              value={order.status || "order placed"}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              disabled={updating === order._id}
              className={`px-2 py-1 rounded text-xs border-none outline-none cursor-pointer ${
                updating === order._id ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                order.status === 'delivered' ? 'bg-green-600' :
                order.status === 'out for delivery' ? 'bg-blue-600' :
                order.status === 'cancelled' ? 'bg-red-600' :
                'bg-yellow-600'
              }`}
            >
              <option value="order placed">Order Placed</option>
              <option value="out for delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className='w-[10%] md:w-[5%] text-center'>
            {order.user?.username || order.user?.name || "Unknown"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllOrders;