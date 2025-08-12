// App.jsx
import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store/auth";

// Eager UI (kept outside Suspense)
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Lazy pages/components
const Home = lazy(() => import("./pages/Home"));
const AllBooks = lazy(() => import("./pages/AllBooks"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const LogIn = lazy(() => import("./pages/LogIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Cart = lazy(() => import("./pages/Cart"));
const Profile = lazy(() => import("./pages/Profile"));
const AllOrders = lazy(() => import("./pages/AllOrders"));
const AddBook = lazy(() => import("./pages/AddBook"));
const BookDetail = lazy(() => import("./components/BookDetail/BookDetail"));
const Favourites = lazy(() => import("./components/Profile/Favourites"));
const UserOrderHistory = lazy(() =>
  import("./components/Profile/UserOrderHistory")
);
const Settings = lazy(() => import("./components/Profile/Settings"));

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isloggedIn);
  const role =
    useSelector((state) => state.auth.role) || localStorage.getItem("role");

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!isLoggedIn && id && token && storedRole) {
      dispatch(authAction.login());
      dispatch(authAction.setRole(storedRole));

      if (["/", "/login", "/signup"].includes(window.location.pathname)) {
        navigate("/profile");
      }
    }
  }, [dispatch, navigate, isLoggedIn]);

  return (
    <div className="flex flex-col min-h-screen text-white bg-zinc-900">
      <Navbar />

      <Suspense fallback={<div className="p-6 text-center">Loading…</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-books" element={<AllBooks />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/profile" element={<Profile />}>
            {/* Index route based on role */}
            {role === "user" ? (
              <Route index element={<Favourites />} />
            ) : (
              <Route index element={<AllOrders />} />
            )}

            {/* Admin-only */}
            {role === "admin" && (
              <Route path="add-book" element={<AddBook />} />
            )}

            <Route path="orderHistory" element={<UserOrderHistory />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;
