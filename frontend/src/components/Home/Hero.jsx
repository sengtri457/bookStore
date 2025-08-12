import React from 'react';
import hero from '../../assets/images/hero.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="min-h-[75vh] flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
      {/* Left Section: Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center text-center lg:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-yellow-300">
          Dive Into a World of Stories & Ideas
        </h1>
        <p className="mt-4 text-base md:text-lg lg:text-xl text-gray-300 max-w-xl">
          Explore thought-provoking reads, timeless classics, and fresh perspectives in our carefully curated collection.
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-yellow-300 text-lg md:text-xl font-semibold border border-yellow-300 px-8 py-3 hover:bg-yellow-300 hover:text-zinc-900 rounded-full transition"
          >
            Discover Books
          </Link>
        </div>
      </div>

      {/* Right Section: Image */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0 flex justify-center bg-transparent">
        <img
          src={hero}
          alt="Books"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
