import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const id = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:1000/api/v1/get-user-information", {
          headers: { id, authorization: `Bearer ${token}` },
        });
        setUserInfo({
          username: res.data.username || "",
          email: res.data.email || "",
          address: res.data.address || "",
        });
      } catch (error) {
        console.error("Failed to load user info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, address: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:1000/api/v1/update-address",
        { address: userInfo.address },
        {
          headers: { id, authorization: `Bearer ${token}` },
        }
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error("Failed to update address:", error);
      setMessage("Failed to update address");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-yellow-400 text-xl font-semibold">
        Loading your settings...
      </div>
    );

  return (
    <div className="flex min-h-screen text-white font-sans">

      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-semibold mb-10 text-gray-300">Settings</h1>

        <div className="mb-8 flex gap-12">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">Username</label>
            <div className="px-3 py-1 rounded bg-gray-700 text-yellow-400 font-semibold text-sm max-w-max">
              {userInfo.username}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">Email</label>
            <div className="px-3 py-1 rounded bg-gray-700 text-yellow-400 font-semibold text-sm max-w-max break-all">
              {userInfo.email}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-xs font-bold text-gray-400 mb-2">Address</label>
          <textarea
            rows={6}
            value={userInfo.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
            className="w-full bg-gray-800 border border-yellow-500 rounded p-3 mb-4 text-sm resize-none focus:outline-yellow-400"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded font-semibold transition"
            >
              Update
            </button>
          </div>
        </form>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.toLowerCase().includes("failed") ? "text-red-500" : "text-green-400"
            }`}
          >
            {message}
          </p>
        )}
      </main>
    </div>
  );
};

export default Settings;
