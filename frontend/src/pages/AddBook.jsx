import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const res = await axios.post(
        "http://localhost:1000/api/v1/add-book",
        formData,
        { headers }
      );

      setMessage(res.data.message);
      setFormData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
    } catch (error) {
      console.error("Add Book Error:", error);
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-zinc-800 rounded-md shadow-lg text-white">
      <h2 className="text-3xl font-semibold mb-6 text-center">Add New Book</h2>

      {message && (
        <p className="mb-6 text-center text-green-400 font-medium">{message}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="url"
          placeholder="Image URL"
          value={formData.url}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          name="desc"
          placeholder="Description"
          value={formData.desc}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
        ></textarea>

        <input
          type="text"
          name="language"
          placeholder="Language"
          value={formData.language}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded-md bg-zinc-700 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors py-3 rounded-md font-semibold text-lg"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
