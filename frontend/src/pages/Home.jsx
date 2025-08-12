// import React from 'react'
// import Hero from '../components/Home/Hero'
// import RecentlyAdded from '../components/Home/RecentlyAdded'

// const Home = () => {
//   return (
//     <div className='bg-zinc-900 text-white px-10 py-8'>
//       <Hero />
//       <RecentlyAdded />
//     </div>
//   )
// }

// export default Home
import React from 'react';
import Hero from '../components/Home/Hero';
import RecentlyAdded from '../components/Home/RecentlyAdded';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #facc15 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, #f59e0b 0%, transparent 50%),
                              radial-gradient(circle at 75% 25%, #fbbf24 0%, transparent 50%),
                              radial-gradient(circle at 25% 75%, #f97316 0%, transparent 50%)`,
          }}
        ></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-20 h-20 bg-yellow-500/20 rounded-full blur-lg animate-bounce"
        style={{ animationDuration: '3s' }}
      ></div>
      <div
        className="absolute bottom-32 left-1/4 w-16 h-16 bg-yellow-400/20 rounded-full blur-md animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-10 pt-8 pb-12">
          <div className="max-w-7xl mx-auto">
            <Hero />
          </div>
        </section>

        {/* Divider */}
        <div className="relative px-4 sm:px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="h-px  bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900mb-12"></div>
          </div>
        </div>

        {/* Recently Added Section */}
        <section className="px-4 sm:px-6 lg:px-10 pb-16">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-gray-600 rounded-full"></div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-300  to-gray-600 bg-clip-text text-transparent">
                    Recently Added
                  </h2>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent"></div>
              </div>
              
            </div>

            {/* Component */}
            <div className="relative">
              {/* Background glow for the section */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/10 via-yellow-600/10 to-yellow-700/10 rounded-2xl blur-xl"></div>
              <div className="relative">
                <RecentlyAdded />
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-4 sm:px-6 lg:px-10 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="relative overflow-hidden bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-2xl  backdrop-blur-sm">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z" fill="url(#newsletter-gradient)" />
                </svg>
                <defs>
                  <linearGradient id="newsletter-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </div>

              <div className="relative p-8 text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-yellow-300 mb-3">
                     Stay Updated with BookStore
                  </h3>
                  <p className="text-gray-300 max-w-xl mx-auto">
                    Get notified about new releases, exclusive deals, and curated reading recommendations.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-slate-700/50 border border-yellow-200 rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:border-blue-500/50 transition-all duration-300"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-600 text-zinc-900 rounded-lg font-medium hover:from-yellow-400 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Home;

