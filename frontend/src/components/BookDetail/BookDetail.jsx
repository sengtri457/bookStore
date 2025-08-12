import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GrLanguage } from "react-icons/gr";
import { IoArrowBack } from "react-icons/io5";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFavorited, setIsFavorited] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const isLoggedIn = useSelector((state) => state.auth.isloggedIn);
  const role = useSelector((state) => state.auth.role);
  const isAdmin = role && role.toLowerCase() === "admin";

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
        setEditData(response.data.data); // Initialize edit form with current data
      } catch (err) {
        setError('Failed to fetch book data');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  // User handlers
  const handleFavorite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-book-to-favorite",
        {},
        { headers }
      );
      alert(response.data.message || "Book added to your favorites");
      setIsFavorited(true);
    } catch (error) {
      alert("Failed to add book to favorites");
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      alert(response.data.message || "Book added to cart");
      setIsInCart(true);
    } catch (error) {
      alert("Failed to add book to cart");
    }
  };

  // Admin handlers
  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:1000/api/v1/update-book",
        editData,
        { headers }
      );
      alert(res.data.message || "Book updated successfully");
      setData(editData);
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update book");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const res = await axios.delete(
        "http://localhost:1000/api/v1/delete-book",
        { headers }
      );
      alert(res.data.message || "Book deleted successfully");
      navigate("/"); // Redirect after delete (adjust as needed)
    } catch (error) {
      alert("Failed to delete book");
    }
  };

  if (loading) {
    return <div className="text-white p-6 text-center text-xl">Loading...</div>;
  }

  if (error || !data) {
    return <div className="text-red-500 p-6 text-center text-lg">{error || 'Book not found'}</div>;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white px-6 py-12 md:px-24 md:py-20 flex flex-col md:flex-row gap-12 relative bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
      {/* Back button */}
      {/* Back button */}
<button
  onClick={() => navigate(-1)}
  className="absolute top-6 left-6 md:top-10 md:left-10  flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/70 text-white border border-zinc-700 backdrop-blur-md hover:bg-zinc-700 hover:scale-105 transition-all duration-200 shadow-lg"
>
  <IoArrowBack size={20} />
  <span className="hidden sm:inline">Back</span>
</button>

      {/* Image section */}
      <div className="bg-zinc-800 rounded-lg p-6 flex items-center mt-10 justify-center md:w-1/2 shadow-lg relative bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
        <img
          src={data?.url || ""}
          alt={data?.title || "Book cover"}
          className="max-h-[75vh] w-auto object-contain rounded-md text-yellow-200"
        />

        {/* Icons for users */}
        {isLoggedIn && !isAdmin && (
          <div className="absolute top-4 right-4 flex flex-col gap-3">
            <button
              className={`p-2 rounded-full transition-all ${isFavorited ? "bg-red-700" : "bg-zinc-700 hover:bg-red-500"}`}
              onClick={handleFavorite}
              disabled={isFavorited}
            >
              <FaHeart size={20} />
            </button>
            <button
              className={`p-2 rounded-full transition-all ${isInCart ? "bg-green-700" : "bg-zinc-700 hover:bg-green-500"}`}
              onClick={handleCart}
              disabled={isInCart}
            >
              <FaCartShopping size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Details section */}
      <div className="md:w-1/2 flex flex-col justify-center">
        {!isEditing ? (
          <>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight text-yellow-300">{data?.title}</h1>
            <p className="text-xl mb-3">
              <span className="font-semibold">Author:</span> {data?.author}
            </p>
            <p className="text-base text-gray-300 leading-relaxed whitespace-pre-wrap">{data?.desc}</p>
            <div className="flex items-center text-gray-400 mt-4 mb-4 space-x-2">
              <GrLanguage size={20} />
              <span>{data?.language || "English"}</span>
            </div>
            <p className="text-xl mb-6 text-yellow-400 font-semibold">${data?.price}</p>

            {/* Buttons for users */}
            {isLoggedIn && !isAdmin && (
              <div className="flex gap-4">
                <button
                  className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-400 transition-all"
                  onClick={handleFavorite}
                  disabled={isFavorited}
                >
                  <FaHeart /> {isFavorited ? "Favorited" : "Add to Favourites"}
                </button>
                <button
                  className="flex items-center gap-2 rounded px-4 py-2 transition-all text-white"
                  onClick={handleCart}
                  disabled={isInCart}
                  style={{
                    backgroundColor: isInCart ? '#15803d' : '#22c55e',
                  }}
                  onMouseEnter={e => {
                    if (!isInCart) e.currentTarget.style.backgroundColor = '#16a34a';
                  }}
                  onMouseLeave={e => {
                    if (!isInCart) e.currentTarget.style.backgroundColor = '#22c55e';
                  }}
                >
                  <FaCartShopping />
                  {isInCart ? " Added to Cart" : " Add to Cart"}
                </button>
              </div>
            )}

            {/* Buttons for admins */}
            {isLoggedIn && isAdmin && (
              <div className="flex gap-4">
                <button
                  className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-400 transition-all"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="flex items-center gap-2 bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition-all"
                  onClick={handleDelete}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </>
        ) : (
          // Edit form for admins
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
            <label>
              Title:
              <input
                name="title"
                value={editData.title || ""}
                onChange={handleInputChange}
                className="w-full rounded px-2 py-1 text-black"
                required
              />
            </label>
            <label>
              Author:
              <input
                name="author"
                value={editData.author || ""}
                onChange={handleInputChange}
                className="w-full rounded px-2 py-1 text-black"
                required
              />
            </label>
            <label>
              Price:
              <input
                name="price"
                type="number"
                value={editData.price || ""}
                onChange={handleInputChange}
                className="w-full rounded px-2 py-1 text-black"
                required
              />
            </label>
            <label>
              Image URL:
              <input
                name="url"
                value={editData.url || ""}
                onChange={handleInputChange}
                className="w-full rounded px-2 py-1 text-black"
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="desc"
                value={editData.desc || ""}
                onChange={handleInputChange}
                className="w-full rounded px-2 py-1 text-black"
                required
              />
            </label>
            <label>
              Language:
              <input
                name="language"
                value={editData.language || ""}
                onChange={handleInputChange}
                className="w-full rounded px-2 py-1 text-black"
                required
              />
            </label>

            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition-all"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-700 transition-all"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
