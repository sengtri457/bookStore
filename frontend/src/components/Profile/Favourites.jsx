import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favorite-books",
          { headers }
        );
        setFavoriteBooks(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favorite books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-yellow-400 rounded-full animate-spin mx-auto"></div>
            <div className="text-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">📚</div>
          </div>
          <p className="text-yellow-300 text-xl font-semibold">Loading favorite books...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-6 md:p-12 rounded-xl border border-zinc-700 shadow-lg text-white">
      <h2 className="text-4xl font-bold text-yellow-300 mb-10 text-center drop-shadow-lg">
        My Favorite Books
      </h2>

      {favoriteBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favoriteBooks.map((item, i) => (
            <div
              key={item._id || i}
              className="transform transition hover:scale-105 hover:shadow-xl"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <BookCard
                data={item}
                favorite={true} // ✅ Show Remove button only in Favourites
                onRemove={(id) =>
                  setFavoriteBooks(prev => prev.filter(book => book._id !== id))
                }
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-400 text-center text-lg mt-20">
          You have no favorite books yet. Start exploring and add some!
        </p>
      )}
    </div>
  );
};

export default Favourites;
