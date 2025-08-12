import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { authAction } from "../store/auth";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({ username: "", password: "" });

  const change = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const { username, password } = values;
    if (!username || !password) {
      alert("Both username and password are required!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:1000/api/v1/signin", values);

      if (res.status === 200) {
        const data = res.data;

        // Save in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("avatar", data.avatar || "");

        // Update Redux
        dispatch(authAction.login());
        dispatch(authAction.changeRole(data.role || "user"));
        dispatch(authAction.setUser({
          id: data.id,
          username: data.username,
          email: data.email,
          avatar: data.avatar || "",
        }));

        alert("Login successful!");
        navigate("/profile");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Login</p>

        <div className="mt-4">
          <label className="text-zinc-400">Username</label>
          <input
            name="username"
            type="text"
            value={values.username}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="username"
          />
        </div>

        <div className="mt-4">
          <label className="text-zinc-400">Password</label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="password"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={submit}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-400"
          >
            Log In
          </button>
        </div>

        <p className="mt-4 text-center text-zinc-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
