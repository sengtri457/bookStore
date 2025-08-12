// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   // Fix typo here: use "isLoggedIn" exactly as in your Redux slice
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const role =  useSelector((state) => state.auth.role);
//   if(isLoggedIn == true && role === " admin"){
//     links.splice(3,1);
//   }
//   if(isLoggedIn == true && role === "user"){
//     links.splice(3,1);
//   }

//   const filteredLinks = isLoggedIn
//     ? [
//         { title: 'Home', link: '/' },
//         { title: 'About Us', link: '/about-us' },
//         { title: 'All Books', link: '/all-books' },
//         { title: 'Cart', link: '/cart' },
//         { title: 'Profile', link: '/profile' },
//         { title: 'Admin Profile', link: '/profile' },
//       ]
//     : [
//         { title: 'Home', link: '/' },
//         { title: 'All Books', link: '/all-books' },
//       ];

//   return (
//     <div className="bg-zinc-800 text-white px-6 py-4">
//       <div className="flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-3">
//           <img
//             src="https://img.freepik.com/free-vector/hand-drawn-flat-design-bookstore-logo-template_23-2149337115.jpg"
//             alt="BookStore Logo"
//             className="h-12 w-12 object-cover rounded-full border border-white"
//           />
//           <h1 className="text-2xl font-semibold">BookStore</h1>
//         </Link>

//         {/* Hamburger (mobile) */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               {isOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Desktop nav */}
//         <div className="hidden md:flex items-center gap-6">
//           <div className="flex gap-4">
//             {filteredLinks.map((item, i) => (
//               <Link
//                 to={item.link}
//                 key={i}
//                 className="hover:text-blue-500 transition-all duration-300"
//               >
//                 {item.title}
//               </Link>
//             ))}
//           </div>
//           <div className="flex gap-4">
//             {!isLoggedIn && (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
//                 >
//                   SignIn
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-2 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
//                 >
//                   SignUp
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile nav */}
//       {isOpen && (
//         <div className="mt-4 md:hidden flex flex-col gap-4">
//           {filteredLinks.map((item, i) => (
//             <Link
//               key={i}
//               to={item.link}
//               className="hover:text-blue-500 transition-all duration-300"
//             >
//               {item.title}
//             </Link>
//           ))}
//           {!isLoggedIn && (
//             <div className="flex flex-col gap-2 mt-2">
//               <Link
//                 to="/login"
//                 className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
//               >
//                 SignIn
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
//               >
//                 SignUp
//               </Link>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Fix typo: use "isloggedIn" to match your Redux slice
  const isLoggedIn = useSelector((state) => state.auth.isloggedIn);
  const role = useSelector((state) => state.auth.role);

  // Create different navigation links based on user role
  const getFilteredLinks = () => {
    if (isLoggedIn && role === "admin") {
      return [
        { title: 'Home', link: '/' },
        { title: 'All Books', link: '/all-books' },
        { title: 'Admin Profile', link: '/profile' },
      ];
    } else if (isLoggedIn && role === "user") {
      return [
        { title: 'Home', link: '/' },
        { title: 'About Us', link: '/about-us' },
        { title: 'All Books', link: '/all-books' },
        { title: 'Cart', link: '/cart' },
        { title: 'Profile', link: '/profile' },
      ];
    } else {
      return [
        { title: 'Home', link: '/' },
        { title: 'All Books', link: '/all-books' },
        { title: 'About Us', link: '/about-us' },
      ];
    }
  };

  const filteredLinks = getFilteredLinks();

  return (
    <div className="bg-zinc-800 text-white px-6 py-4 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://img.freepik.com/free-vector/hand-drawn-flat-design-bookstore-logo-template_23-2149337115.jpg"
            alt="BookStore Logo"
            className="h-12 w-12 object-cover rounded-full border border-white"
          />
          <h1 className="text-2xl font-semibold text-yellow-300">BookStore</h1>
        </Link>

        {/* Hamburger (mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-4">
            {filteredLinks.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                className="hover:text-blue-500 transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex gap-4">
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  SignIn
                </Link>
                <Link
                  to="/signup"
                  className="px-2 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <div className="mt-4 md:hidden flex flex-col gap-4">
          {filteredLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="hover:text-blue-500 transition-all duration-300"
            >
              {item.title}
            </Link>
          ))}
          {!isLoggedIn && (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignIn
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
