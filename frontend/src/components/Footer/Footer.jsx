// import React from 'react';
// import { FaHeart } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-zinc-900 text-white py-6 mt-10">
//       <div className="max-w-6xl mx-auto px-4 text-center border-t border-zinc-700 pt-6">
//         <h1 className="text-lg md:text-xl font-medium text-gray-300 flex justify-center items-center gap-2">
//           &copy; 2025 · Made with <FaHeart className="text-red-500" /> by <span className="font-semibold text-white">Ren Sodalin</span>
//         </h1>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="border-t border-zinc-700/50 pt-8 pb-6">
          <div className="text-center space-y-4">
            {/* Main copyright text */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm sm:text-base lg:text-lg">
              <span className="text-gray-300">
                &copy; 2025 · Made with
              </span>
              <div className="flex items-center gap-2">
                <FaHeart 
                  className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 animate-pulse" 
                  aria-label="love"
                />
                <span className="text-gray-300">by</span>
                <span className="font-semibold text-white bg-gradient-to-r from-yellow-400 to-gray-500 bg-clip-text text-transparent">
                  Ren Sodalin
                </span>
              </div>
            </div>
            
            {/* Additional footer links or info */}
            
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-zinc-800/50 py-4">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Crafted with passion and attention to detail
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
