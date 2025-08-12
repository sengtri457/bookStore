// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
// import { authAction } from "../../store/auth";
// import { useDispatch, useSelector } from "react-redux";

// const Sidebar = ({ data }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const role = useSelector((state) => state.auth.role);

//   if (!data) {
//     return <p className="text-white p-4 select-none">Loading...</p>;
//   }

//   return (
//     <div className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 rounded-xl flex flex-col items-center min-h-full shadow-lg border border-zinc-700">
//       {data.avatar ? (
//         <img
//           src={
//             data.avatar.startsWith("http")
//               ? data.avatar
//               : `http://localhost:1000/${data.avatar}`
//           }
//           alt="User Avatar"
//           className="h-[12vh] w-[12vh] rounded-full object-cover border-2 border-zinc-700 shadow-md"
//         />
//       ) : (
//         <div className="h-[12vh] w-[12vh] bg-zinc-700 rounded-full flex items-center justify-center text-zinc-400 text-3xl font-bold select-none">
//           {data.username ? data.username[0].toUpperCase() : "?"}
//         </div>
//       )}

//       <p className="mt-4 text-2xl text-zinc-100 font-semibold select-text">
//         {data.username || "Guest"}
//       </p>
//       <p className="mt-1 text-sm text-zinc-400 font-medium select-text">
//         {data.email || "No email"}
//       </p>

//       <div className="w-full mt-6 h-[1px] bg-zinc-700"></div>

//       <nav className="w-full flex flex-col items-center mt-6 space-y-3">
//         <Link
//           to="/profile"
//           className="text-zinc-100 font-semibold w-full py-3 text-center rounded-lg hover:bg-zinc-900 transition-colors duration-300"
//         >
//           Favorites
//         </Link>
//         <Link
//           to="/profile/orderHistory"
//           className="text-zinc-100 font-semibold w-full py-3 text-center rounded-lg hover:bg-zinc-900 transition-colors duration-300"
//         >
//           Order History
//         </Link>
//         <Link
//           to="/profile/settings"
//           className="text-zinc-100 font-semibold w-full py-3 text-center rounded-lg hover:bg-zinc-900 transition-colors duration-300"
//         >
//           Settings
//         </Link>
        

//         <button
//           className="mt-8 bg-red-600 hover:bg-red-700 w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg"
//           onClick={() => {
//             dispatch(authAction.logout());
//             dispatch(authAction.changeRole("user"));
//             localStorage.removeItem("id");
//             localStorage.removeItem("token");
//             localStorage.removeItem("role");
//             navigate("/");
//           }}
//           type="button"
//         >
//           <FiLogOut size={20} />
//           Log Out
//         </button>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { authAction } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  if (!data) {
    return <p className="text-white p-4 select-none">Loading...</p>;
  }

  // Different sidebar links based on role
  const getSidebarLinks = () => {
    if (role === "admin") {
      return [
        { title: "All Orders", link: "/profile" },
        { title: "Add Book", link: "/profile/add-book" },
      ];
    } else {
      return [
        { title: "Favorites", link: "/profile" },
        { title: "Order History", link: "/profile/orderHistory" },
        { title: "Settings", link: "/profile/settings" },
      ];
    }
  };

  const sidebarLinks = getSidebarLinks();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 p-6 rounded-xl flex flex-col items-center min-h-full shadow-lg border border-zinc-700">
      {data.avatar ? (
        <img
          src={
            data.avatar.startsWith("http")
              ? data.avatar
              : `http://localhost:1000/${data.avatar}`
          }
          alt="User Avatar"
          className="h-[12vh] w-[12vh] rounded-full object-cover border-2 border-zinc-700 shadow-md"
        />
      ) : (
        <div className="h-[12vh] w-[12vh] bg-zinc-700 rounded-full flex items-center justify-center text-zinc-400 text-3xl font-bold select-none">
          {data.username ? data.username[0].toUpperCase() : "?"}
        </div>
      )}

      <p className="mt-4 text-2xl text-zinc-100 font-semibold select-text">
        {data.username || "Guest"}
      </p>
      <p className="mt-1 text-sm text-zinc-400 font-medium select-text">
        {data.email || "No email"}
      </p>
      <p className="mt-1 text-xs text-zinc-500 font-medium capitalize select-text">
        {role === "admin" ? "Administrator" : "User"}
      </p>

      <div className="w-full mt-6 h-[1px] bg-zinc-700"></div>

      <nav className="w-full flex flex-col items-center mt-6 space-y-3">
        {sidebarLinks.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="text-zinc-100 font-semibold w-full py-3 text-center rounded-lg hover:bg-zinc-900 transition-colors duration-300"
          >
            {item.title}
          </Link>
        ))}

        <button
          className="mt-8 bg-red-600 hover:bg-red-700 w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-md hover:shadow-lg"
          onClick={() => {
            dispatch(authAction.logout());
            dispatch(authAction.changeRole("user"));
            localStorage.removeItem("id");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/");
          }}
          type="button"
        >
          <FiLogOut size={20} />
          Log Out
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
