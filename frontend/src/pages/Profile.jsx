// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Profile/Sidebar";
// import { Outlet, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { authAction } from "../store/auth";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const isLoggedIn = useSelector((state) => state.auth.isloggedIn);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const id = localStorage.getItem("id");

//     if (token && id) {
//       dispatch(authAction.login());
//       fetchProfile(token, id);
//     } else {
//       navigate("/login");
//     }
//   }, [dispatch, navigate]);

//   const fetchProfile = async (token, id) => {
//     try {
//       const res = await axios.get("http://localhost:1000/api/v1/get-user-information", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           id,
//         },
//       });
//       setProfile(res.data);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   return (
//     <div className="bg-zinc-900 px-4 md:px-12 flex flex-col md:flex-row h-screen py-8 text-white gap-6">
//       {/* Sidebar */}
//       <aside className="w-full md:w-1/6">
//         <Sidebar data={profile} />
//       </aside>

//       {/* Main Content Area */}
//       <main className="w-full md:w-5/6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl p-6 md:p-12 shadow-lg overflow-auto">
//         <Outlet context={{ profile }} />
//       </main>
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authAction } from "../store/auth";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  // Fix typo: use "isloggedIn" to match your Redux slice
  const isLoggedIn = useSelector((state) => state.auth.isloggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

    if (token && id) {
      dispatch(authAction.login());
      // Set the role from localStorage if it exists
      if (role) {
        dispatch(authAction.changeRole(role));
      }
      fetchProfile(token, id);
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  const fetchProfile = async (token, id) => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/get-user-information", {
        headers: {
          Authorization: `Bearer ${token}`,
          id,
        },
      });
      setProfile(res.data);
      
      // Update the role in Redux state based on the profile data
      if (res.data.role) {
        dispatch(authAction.changeRole(res.data.role));
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      // If there's an error (like invalid token), redirect to login
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        navigate("/login");
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-zinc-900 h-screen flex items-center justify-center">
        <div className="text-white text-xl">Please log in to access your profile.</div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 px-4 md:px-12 flex flex-col md:flex-row h-screen py-8 text-white gap-6 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
      {/* Sidebar */}
      <aside className="w-full md:w-1/6">
        <Sidebar data={profile} />
      </aside>

      {/* Main Content Area */}
      <main className="w-full md:w-5/6 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl p-6 md:p-12 shadow-lg overflow-auto">
        <Outlet context={{ profile }} />
      </main>
    </div>
  );
};

export default Profile;
