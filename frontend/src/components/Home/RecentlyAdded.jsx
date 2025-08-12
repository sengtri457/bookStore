// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import BookCard from '../BookCard/BookCard';

// const RecentlyAdded = () => {
//   const [Data, setData] = useState();

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/v1/get-recent-books');
//         console.log(response);
//         setData(response.data.data); // this is correct if response.data = { status: 'Success', data: [...] }
//       } catch (error) {
//         console.error("Error fetching books:", error);
//       }
//     };
//     fetch();
//   }, []);

//   return (
//     <div className="w-full bg-zinc-900 py-12 px-6 md:px-12">
//       <h4 className="text-3xl text-yellow-100 mb-6">Recently Added Books</h4>
//       <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {Data && Data.map((item, i) => (
//           <BookCard key={i} data={item} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentlyAdded;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:1000/api/v1/get-recent-books');
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load recent books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecentBooks();
  }, []);

  // Loading skeleton with muted yellow-gray colors
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-yellow-700/30 rounded-xl overflow-hidden">
        <div className="aspect-[3/4] bg-yellow-600/20"></div>
        <div className="p-4 space-y-3">
          <div className="h-5 bg-yellow-600/20 rounded w-3/4"></div>
          <div className="h-4 bg-yellow-600/20 rounded w-1/2"></div>
          <div className="h-4 bg-yellow-600/20 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );

  // Error component with yellow text accents
  const ErrorDisplay = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-6xl text-yellow-400">⚠️</div>
      <h3 className="text-xl font-semibold text-yellow-300 mb-2">Oops! Something went wrong</h3>
      <p className="text-yellow-200 mb-6 max-w-md">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className=" px-6 py-3 rounded-lg font-medium hover:from-yellow-400 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
      >
        Try Again
      </button>
    </div>
  );

  // Empty state with yellow emoji and text
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-6xl text-yellow-400">📖</div>
      <h3 className="text-xl font-semibold text-yellow-300 mb-2">No Books Yet</h3>
      <p className="text-yellow-200 mb-6 max-w-md">
        We're working on adding some amazing books to our collection. Check back soon!
      </p>
    </div>
  );

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-6 rounded-xl shadow-lg">
      {/* Statistics Bar */}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <LoadingSkeleton key={i} />)
        ) : error ? (
          <ErrorDisplay />
        ) : data.length === 0 ? (
          <EmptyState />
        ) : (
          data.map((item, i) => (
            <div
              key={item._id || item.id || i}
              className="transform transition-all duration-500"
              style={{
                animationDelay: `${i * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              <BookCard data={item} />
            </div>
          ))
        )}
      </div>

      {/* View All Button */}
      {!loading && !error && data.length > 0 && (
        <div className="mt-12 text-center">
          <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-300 to-yellow-400 text-zinc-900 px-8 py-4 rounded-xl font-medium border border-yellow-500 hover:border-yellow-400 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
            <span>View All Books</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </button>
        </div>
      )}

      {/* CSS animations */}
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
      `}</style>
    </div>
  );
};

export default RecentlyAdded;


