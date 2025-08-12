
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { AiFillDelete } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const [cart, setCart] = useState(null);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalBooks, setTotalBooks] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   // Fetch cart
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
//         const cartData = res.data.data || [];
//         setCart(cartData);
//         calculateTotals(cartData);
//       } catch (error) {
//         console.error("Error fetching cart:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCart();
//   }, []);

//   // Calculate totals
//   const calculateTotals = (items) => {
//     const priceSum = items.reduce((acc, item) => acc + (item.price || 0), 0);
//     const bookCount = items.length;
//     setTotalPrice(priceSum);
//     setTotalBooks(bookCount);
//   };

//   // Remove book from cart
//   const deleteItem = async (bookId) => {
//     try {
//       await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookId}`, {}, { headers });
//       const updatedCart = cart.filter(item => item._id !== bookId);
//       setCart(updatedCart);
//       calculateTotals(updatedCart);
//     } catch (error) {
//       console.error("Error removing book:", error);
//     }
//   };

//   // Place order
//   const placeOrder = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:1000/api/v1/place-order",
//         { order: cart },
//         { headers }
//       );
//       if (res.data.status === "success") {
//         alert("Order placed successfully!");
//         setCart([]);
//         setTotalPrice(0);
//         setTotalBooks(0);
//         navigate("/profile/orderhistory"); // ✅ Redirect to order history
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       alert("Failed to place order.");
//     }
//   };

//   // Loader
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-yellow-300 text-xl font-semibold">
//         Loading Cart...
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* Empty Cart */}
//       {cart && cart.length === 0 && (
//         <div className='h-screen'>
//           <div className='h-full flex items-center justify-center flex-col'>
//             <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
//               Empty Cart
//             </h1>
//             <img src="/empty-cart.png" alt="empty cart" className='lg:h-[50vh]' />
//           </div>
//         </div>
//       )}

//       {/* Cart with items */}
//       {cart && cart.length > 0 && (
//         <>
//           <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
//             Your Cart
//           </h1>

//           {cart.map((item, i) => (
//             <div
//               className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center'
//               key={i}
//             >
//               <img src={item.url} alt={item.title} className='h-[20vh] md:h-[10vh] object-cover' />
//               <div className='w-full md:w-auto'>
//                 <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
//                   {item.title}
//                 </h1>
//                 <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
//                   {item.desc.slice(0, 100)}...
//                 </p>
//               </div>
//               <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
//                 <h2 className='text-zinc-100 text-3xl font-semibold flex'>
//                   ${item.price}
//                 </h2>
//                 <button
//                   className='bg-red-100 text-red-700 border border-red-700 p-2 ms-12 rounded'
//                   onClick={() => deleteItem(item._id)}
//                 >
//                   <AiFillDelete />
//                 </button>
//               </div>
//             </div>
//           ))}

//           {/* Totals */}
//           <div className='text-right text-2xl font-semibold text-yellow-400 mt-8'>
//             Total Price: ${totalPrice.toFixed(2)}  
//             <br />
//             Total Books: {totalBooks} {totalBooks === 1 ? 'Book' : 'Books'}
//           </div>

//           {/* Place Order */}
//           <div className='flex justify-end mt-4'>
//             <button
//               onClick={placeOrder}
//               className='bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold'
//             >
//               Place Order
//             </button>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Cart;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [removingItems, setRemovingItems] = useState(new Set());
  const [placingOrder, setPlacingOrder] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });

  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
        const cartData = res.data.data || [];
        setCart(cartData);
        calculateTotals(cartData);
      } catch (error) {
        console.error("Error fetching cart:", error);
        showNotification('error', 'Failed to load cart. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Calculate totals
  const calculateTotals = (items) => {
    const priceSum = items.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);
    const bookCount = items.length;
    setTotalPrice(priceSum);
    setTotalBooks(bookCount);
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
  };

  // Remove book from cart
  const deleteItem = async (bookId) => {
    if (removingItems.has(bookId)) return; // Prevent double-clicks

    setRemovingItems(prev => new Set(prev).add(bookId));

    try {
      await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookId}`, {}, { headers });
      const updatedCart = cart.filter(item => item._id !== bookId);
      setCart(updatedCart);
      calculateTotals(updatedCart);
      showNotification('success', 'Book removed from cart');
    } catch (error) {
      console.error("Error removing book:", error);
      showNotification('error', 'Failed to remove book from cart');
    } finally {
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(bookId);
        return newSet;
      });
    }
  };

  // Place order
  const placeOrder = async () => {
    if (placingOrder) return;

    setPlacingOrder(true);
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: cart },
        { headers }
      );
      if (res.data.status === "success") {
        showNotification('success', 'Order placed successfully! Redirecting...');
        setCart([]);
        setTotalPrice(0);
        setTotalBooks(0);
        setTimeout(() => {
          navigate("/profile/orderhistory");
        }, 2000);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      showNotification('error', 'Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-slate-700/50 rounded-xl p-6 flex gap-4">
          <div className="w-24 h-32 bg-slate-600/50 rounded-lg"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-slate-600/50 rounded w-3/4"></div>
            <div className="h-4 bg-slate-600/50 rounded w-1/2"></div>
            <div className="h-4 bg-slate-600/50 rounded w-2/3"></div>
          </div>
          <div className="w-20 h-8 bg-slate-600/50 rounded"></div>
        </div>
      ))}
    </div>
  );

  // Empty cart component
  const EmptyCart = () => (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8 text-8xl">🛒</div>
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-400 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-slate-500 text-lg mb-8">
          Looks like you haven't added any books to your cart yet. Start exploring our collection!
        </p>
        <button
          onClick={() => navigate('/all-books')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Browse Books
        </button>
      </div>
    </div>
  );

  // Cart item component
  const CartItem = ({ item, index }) => (
    <div
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 transform hover:scale-[1.02]"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
      }}
    >
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
        {/* Book Image */}
        <div className="relative group">
          <div className="w-24 h-32 lg:w-28 lg:h-36 rounded-lg overflow-hidden shadow-lg">
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.src = '/placeholder-book.png';
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Book Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-slate-400 font-medium mb-2">
            by {item.author}
          </p>
          {item.desc && (
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 lg:line-clamp-3">
              {item.desc}
            </p>
          )}
          
          {/* Book Info Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {item.genre && (
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-400/30">
                {item.genre}
              </span>
            )}
            <span className="px-3 py-1 bg-yellow-500/20  text-xs rounded border border-yellow-400/30">
              In Stock
            </span>
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex flex-row lg:flex-col items-center gap-4 lg:gap-3 w-full lg:w-auto">
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-yellow-400">
              ${parseFloat(item.price).toFixed(2)}
            </div>
            <div className="text-xs text-slate-500">per book</div>
          </div>
          
          <button
            onClick={() => deleteItem(item._id)}
            disabled={removingItems.has(item._id)}
            className={`group relative p-3 rounded-xl transition-all duration-300 ${
              removingItems.has(item._id)
                ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-400/30 hover:border-red-400/50 transform hover:scale-110'
            }`}
          >
            {removingItems.has(item._id) ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Notification */}
      {notification.message && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-500 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className="text-xl">
              {notification.type === 'success' ? '✅' : '❌'}
            </div>
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-2 h-12 bg-gradient-to-b from-yellow-400 to-purple-200 rounded-full"></div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-pink-200 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
          </div>
          {!loading && cart && cart.length > 0 && (
            <p className="text-slate-400 text-lg">
              You have {totalBooks} {totalBooks === 1 ? 'book' : 'books'} in your cart
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Empty Cart */}
        {!loading && cart && cart.length === 0 && <EmptyCart />}

        {/* Cart with Items */}
        {!loading && cart && cart.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <CartItem key={item._id || index} item={item} index={index} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 sticky top-8">
                <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center gap-3">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">Books ({totalBooks})</span>
                    <span className="text-white font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">Shipping</span>
                    <span className="text-pink-400 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-slate-400">Tax</span>
                    <span className="text-white font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center py-3 text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-yellow-400">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={placeOrder}
                  disabled={placingOrder}
                  className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                    placingOrder
                      ? 'bg-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-pink-600 hover:to-gray-700 hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {placingOrder ? (
                    <div className="flex items-center justify-center gap-3">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Order...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <span>Place Order</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate('/all-books')}
                    className="text-gray-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                  >
                    ← Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Cart;
