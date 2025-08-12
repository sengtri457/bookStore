import React from 'react';
import { FaBook, FaHeart, FaUsers, FaShippingFast } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className='min-h-screen bg-zinc-900 text-zinc-100'>
      {/* Hero Section */}
      <div className='relative bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 py-20 px-4'>
        <div className='max-w-6xl mx-auto text-center'>
          <h1 className='text-4xl md:text-6xl font-bold mb-6 text-yellow-300'>
            About Our Story
          </h1>
          <p className='text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto leading-relaxed'>
            Connecting book lovers with their next great adventure, one page at a time
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-4 py-16'>
        
        {/* Our Mission */}
        <section className='mb-16'>
          <div className='grid md:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-3xl md:text-4xl font-semibold mb-6 text-yellow-300'>
                Our Mission
              </h2>
              <p className='text-lg text-zinc-400 mb-6 leading-relaxed'>
                We believe that books have the power to transform lives, spark imagination, and connect communities. Our mission is to make quality literature accessible to everyone, whether you're a casual reader or a devoted bibliophile.
              </p>
              <p className='text-lg text-zinc-400 leading-relaxed'>
                From timeless classics to contemporary bestsellers, we curate a diverse collection that celebrates the written word and the joy of discovery that comes with finding your next favorite book.
              </p>
            </div>
            <div className='bg-zinc-800 rounded-lg p-8 text-center'>
              <FaBook className='text-6xl text-blue-400 mx-auto mb-4' />
              <h3 className='text-2xl font-semibold mb-4'>10,000+</h3>
              <p className='text-zinc-400'>Books in our collection</p>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className='mb-16'>
          <h2 className='text-3xl md:text-4xl font-semibold mb-12 text-center text-yellow-300'>
            What We Offer
          </h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <div className='bg-zinc-800 rounded-lg p-6 text-center hover:bg-zinc-700 transition-colors'>
              <FaBook className='text-4xl text-blue-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-3'>Vast Collection</h3>
              <p className='text-zinc-400'>
                From fiction to non-fiction, academic texts to graphic novels - we have something for every reader.
              </p>
            </div>
            <div className='bg-zinc-800 rounded-lg p-6 text-center hover:bg-zinc-700 transition-colors'>
              <FaShippingFast className='text-4xl text-green-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-3'>Fast Delivery</h3>
              <p className='text-zinc-400'>
                Quick and reliable shipping to get your books to you as soon as possible.
              </p>
            </div>
            <div className='bg-zinc-800 rounded-lg p-6 text-center hover:bg-zinc-700 transition-colors'>
              <FaHeart className='text-4xl text-red-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-3'>Personalized</h3>
              <p className='text-zinc-400'>
                Create wishlists, track your reading progress, and get personalized recommendations.
              </p>
            </div>
            <div className='bg-zinc-800 rounded-lg p-6 text-center hover:bg-zinc-700 transition-colors'>
              <FaUsers className='text-4xl text-purple-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold mb-3'>Community</h3>
              <p className='text-zinc-400'>
                Join a community of passionate readers sharing reviews and recommendations.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className='mb-16'>
          <div className='bg-zinc-800 rounded-lg p-8 md:p-12'>
            <h2 className='text-3xl md:text-4xl font-semibold mb-8 text-center text-yellow-300'>
              Our Story
            </h2>
            <div className='grid md:grid-cols-2 gap-12 items-center'>
              <div className='space-y-6'>
                <p className='text-lg text-zinc-400 leading-relaxed'>
                  Founded in 2020 by a group of passionate book lovers, our online bookstore started as a small project to share our favorite reads with friends and family. What began as a simple idea quickly grew into something much bigger.
                </p>
                <p className='text-lg text-zinc-400 leading-relaxed'>
                  Today, we're proud to serve thousands of readers worldwide, helping them discover new authors, revisit beloved classics, and find exactly the book they need for any moment in their lives.
                </p>
                <p className='text-lg text-zinc-400 leading-relaxed'>
                  Our team carefully selects each title in our collection, ensuring quality and diversity in every genre. We're not just selling books - we're fostering a love of reading and learning.
                </p>
              </div>
              <div className='bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 rounded-lg p-8 text-center'>
                <div className='mb-6'>
                  <span className='text-4xl font-bold text-white'>50,000+</span>
                  <p className='text-zinc-300 mt-2'>Happy Customers</p>
                </div>
                <div className='mb-6'>
                  <span className='text-4xl font-bold text-white'>4.8/5</span>
                  <p className='text-zinc-300 mt-2'>Average Rating</p>
                </div>
                <div>
                  <span className='text-4xl font-bold text-white'>24/7</span>
                  <p className='text-zinc-300 mt-2'>Customer Support</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className='mb-16'>
          <h2 className='text-3xl md:text-4xl font-semibold mb-12 text-center text-yellow-300'>
            Our Values
          </h2>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaBook className='text-2xl text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Quality</h3>
              <p className='text-zinc-400'>
                We carefully curate our collection to ensure every book meets our high standards for content and condition.
              </p>
            </div>
            <div className='text-center'>
              <div className='bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaUsers className='text-2xl text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Community</h3>
              <p className='text-zinc-400'>
                Building connections between readers and fostering a supportive community of book enthusiasts.
              </p>
            </div>
            <div className='text-center'>
              <div className='bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <FaHeart className='text-2xl text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-3'>Passion</h3>
              <p className='text-zinc-400'>
                Our love for books drives everything we do, from selection to customer service.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className='text-center bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 rounded-lg p-12'>
          <h2 className='text-3xl md:text-4xl font-semibold mb-6 text-yellow-300'>
            Join Our Reading Community
          </h2>
          <p className='text-xl text-zinc-200 mb-8 max-w-2xl mx-auto'>
            Ready to discover your next great read? Browse our collection and become part of a community that celebrates the magic of books.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-zinc-100 transition-colors'>
              Browse Books
            </button>
            <button className='border-2 border-yellow-300 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors'>
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;