// import React from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const BookCard = ({ data, favorite, onRemove }) => {
//   const handleRemoveBook = async (e) => {
//     e.stopPropagation(); // Stop Link click bubbling
//     e.preventDefault();  // Prevent navigation

//     try {
//       await axios.put(
//         "http://localhost:1000/api/v1/remove-book-from-favorite",
//         {},
//         {
//           headers: {
//             id: localStorage.getItem("id"),
//             bookid: data._id || data.id,
//             authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (onRemove) onRemove(data._id || data.id); // Update UI
//     } catch (error) {
//       console.error("Error removing book:", error);
//     }
//   };

//   return (
//     <div className='bg-zinc-800 rounded p-4'>
//       <Link to={`/books/${data._id || data.id}`}>
//         <div className='bg-zinc-900'>
//           <img src={data.url} alt={data.title} />
//         </div>
//         <h3 className="text-lg font-semibold mt-2">{data.title}</h3>
//         <p className="text-sm text-gray-400">{data.author}</p>
//         <p className="text-sm text-gray-400">${data.price}</p>
//       </Link>

//       {favorite && (
//         <button
//           className="bg-yellow-50 py-2 px-4 rounded border border-yellow-500 text-yellow-500 mt-4"
//           onClick={handleRemoveBook}
//         >
//           Remove From Favorite
//         </button>
//       )}
//     </div>
//   );
// };

// export default BookCard;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookCard = ({ data, favorite, onRemove }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleRemoveBook = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRemoving) return;
    setIsRemoving(true);

    try {
      await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favorite",
        {},
        {
          headers: {
            id: localStorage.getItem("id"),
            bookid: data._id || data.id,
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (onRemove) onRemove(data._id || data.id);
    } catch (error) {
      console.error("Error removing book:", error);
      setIsRemoving(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-300/40 cursor-pointer overflow-hidden">
      <Link to={`/books/${data._id || data.id}`} className="block">
        {/* Image Container */}
        <div className="relative bg-slate-900 aspect-[3/4] overflow-hidden rounded">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700 animate-pulse flex items-center justify-center">
              <div className="text-slate-500 text-5xl select-none">📚</div>
            </div>
          )}

          {/* Book Image or fallback */}
          {!imageError ? (
            <img
              src={data.url}
              alt={data.title}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`w-full h-full object-cover transition-transform duration-700 ${
                imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'
              }`}
              loading="lazy"
              draggable={false}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-slate-800 text-slate-500 select-none">
              <div className="text-center">
                <div className="text-5xl mb-2">📖</div>
                <p className="text-sm">Image not available</p>
              </div>
            </div>
          )}

          {/* Price tag */}
          <div className="absolute top-3 left-3 bg-yellow-300 bg-opacity-90 text-zinc-900 px-2 py-0.5 rounded-md text-sm font-semibold shadow-md select-none">
            ${data.price}
          </div>

          {/* Favorite star */}
          {favorite && (
            <div className="absolute top-3 right-3 bg-yellow-400 bg-opacity-90 text-zinc-900 p-1.5 rounded-full shadow-md select-none">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-label="Favorite"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
            {data.title}
          </h3>
          <p className=" text-sm mt-1 line-clamp-1">
            by {data.author}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? 'text-yellow-400' : 'text-slate-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-slate-500 ml-1">(4.0)</span>
          </div>
        </div>
      </Link>

      {/* Remove from favorite button */}
      {favorite && (
        <div className="p-4 border-t border-slate-700/40">
          <button
            className={`w-full py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              isRemoving
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-zinc-900 shadow-md hover:shadow-lg transform hover:scale-105'
            }`}
            onClick={handleRemoveBook}
            disabled={isRemoving}
          >
            {isRemoving ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Removing...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Remove from Favorites
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;

