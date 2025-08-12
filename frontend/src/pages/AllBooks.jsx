// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import BookCard from '../components/BookCard/BookCard';

// const AllBooks = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAllBooks = async () => {
//       try {
//         const response = await axios.get('http://localhost:1000/api/v1/get-all-books');
//         setBooks(response.data.data); // adjust if API response structure is different
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch books');
//         setLoading(false);
//       }
//     };

//     fetchAllBooks();
//   }, []);

//   return (
//     <div className="w-full bg-zinc-900 text-white min-h-screen py-12 px-6 md:px-12">
//       <h2 className="text-4xl font-bold text-yellow-100 mb-6">All Books</h2>

//       {loading && <p className="text-white">Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       {!loading && !error && books.length === 0 && (
//         <p className="text-white">No books available.</p>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {books.map((book, index) => (
//           <BookCard key={index} data={book} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllBooks;
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const booksPerPage = 12;

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:1000/api/v1/get-all-books');
        setBooks(response.data.data || []);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, []);

  const genres = useMemo(() => {
    const allGenres = books.map(book => book.genre || book.category).filter(Boolean);
    return ['all', ...new Set(allGenres)];
  }, [books]);

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || (book.genre || book.category) === selectedGenre;
      return matchesSearch && matchesGenre;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'author':
          aValue = a.author.toLowerCase();
          bValue = b.author.toLowerCase();
          break;
        case 'price':
          aValue = parseFloat(a.price);
          bValue = parseFloat(b.price);
          break;
        case 'date':
          aValue = new Date(a.createdAt || a.publishedDate || 0);
          bValue = new Date(b.createdAt || b.publishedDate || 0);
          break;
        default:
          return 0;
      }
      if (sortOrder === 'asc') return aValue > bValue ? 1 : -1;
      else return aValue < bValue ? 1 : -1;
    });

    return filtered;
  }, [books, searchQuery, selectedGenre, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedBooks.length / booksPerPage);
  const currentBooks = filteredAndSortedBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const LoadingSkeleton = () => (
    <div className="animate-pulse bg-slate-700 rounded-xl overflow-hidden shadow-md">
      <div className="aspect-[3/4] bg-slate-600"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-slate-600 rounded w-3/4"></div>
        <div className="h-4 bg-slate-600 rounded w-1/2"></div>
        <div className="h-4 bg-slate-600 rounded w-1/3"></div>
      </div>
    </div>
  );

  const handleRetry = () => window.location.reload();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-12 bg-gradient-to-b from-yellow-400 to-gray-500 rounded-full"></div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-400 to-gray-400 bg-clip-text text-transparent">
              All Books
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl">
            Explore our complete collection of books. Use filters to find exactly what you're looking for.
          </p>
        </header>

        {/* Stats & Controls */}
        <section className="mb-8 space-y-6">
        {!loading && !error && (
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Books count */}
            <div className="bg-yellow-300 text-black rounded px-5 py-2 flex items-center space-x-2 select-none">
              <span className="text-sm font-medium">{filteredAndSortedBooks.length} Books Found</span>
            </div>

            {/* Categories count */}
          
          </div>
        )}

          <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-5 border border-slate-700/60">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-7 gap-4 items-center">
              {/* Search */}
              <div className="md:col-span-2 lg:col-span-2 xl:col-span-3">
                <div className="relative text-white">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search books, authors..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Genre Filter */}
              <div className="lg:col-span-1 xl:col-span-1">
                <select
                  value={selectedGenre}
                  onChange={(e) => {
                    setSelectedGenre(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition-all duration-300"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>
                      {genre === 'all' ? 'All Genres' : genre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="lg:col-span-1 xl:col-span-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/80 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 transition-all duration-300"
                >
                  <option value="title">Sort by Title</option>
                  <option value="author">Sort by Author</option>
                  <option value="price">Sort by Price</option>
                  <option value="date">Sort by Date</option>
                </select>
              </div>

              {/* Sort Order & View Mode */}
              <div className="flex gap-3 justify-end xl:col-span-1">
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="w-14 h-14 rounded-lg bg-slate-700/80 border border-slate-600 flex items-center justify-center text-white hover:bg-slate-600/80 transition duration-300"
                  aria-label="Toggle sort order"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  className="w-14 h-14 rounded-lg bg-slate-700/80 border border-slate-600 flex items-center justify-center text-white hover:bg-slate-600/80 transition duration-300"
                  aria-label="Toggle view mode"
                >
                  {viewMode === 'grid' ? '☰' : '⊞'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        {loading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
            {Array.from({ length: 8 }).map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6 text-6xl">😔</div>
            <h3 className="text-2xl font-semibold text-white mb-4">Oops! Something went wrong</h3>
            <p className="text-slate-400 mb-8 max-w-md">{error}</p>
            <button
              onClick={handleRetry}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        ) : filteredAndSortedBooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6 text-6xl">📚</div>
            <h3 className="text-2xl font-semibold text-white mb-4">No Books Found</h3>
            <p className="text-slate-400 mb-8 max-w-md">
              {searchQuery || selectedGenre !== 'all'
                ? "Try adjusting your search or filters to find more books."
                : "We're working on adding books to our collection. Check back soon!"
              }
            </p>
            {(searchQuery || selectedGenre !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre('all');
                  setCurrentPage(1);
                }}
                className="bg-gradient-to-r from-slate-700 to-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:from-slate-600 hover:to-slate-500 transition-all duration-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={`grid gap-6 mb-8 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 lg:grid-cols-2'
            }`}>
              {currentBooks.map((book, index) => (
                <div
                  key={book._id || book.id || index}
                  className={`transform transition-all duration-500 ${
                    viewMode === 'list' ? 'bg-slate-800 rounded-lg p-4 shadow-md flex gap-6 items-center' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards',
                  }}
                >
                  <BookCard data={book} viewMode={viewMode} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-700/50">
                <div className="text-slate-400 text-sm">
                  Showing {(currentPage - 1) * booksPerPage + 1} to {Math.min(currentPage * booksPerPage, filteredAndSortedBooks.length)} of {filteredAndSortedBooks.length} books
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-slate-700/80 border border-slate-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600/80 transition-all duration-300"
                    aria-label="Previous page"
                  >
                    Previous
                  </button>

                  {(() => {
                    const maxButtons = 5;
                    const half = Math.floor(maxButtons / 2);
                    let start = Math.max(1, Math.min(currentPage - half, totalPages - maxButtons + 1));
                    let end = Math.min(totalPages, start + maxButtons - 1);

                    return Array.from({ length: end - start + 1 }, (_, i) => {
                      const pageNum = start + i;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            currentPage === pageNum
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                              : 'bg-slate-700/80 border border-slate-600 text-white hover:bg-slate-600/80'
                          }`}
                          aria-current={currentPage === pageNum ? 'page' : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    });
                  })()}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-slate-700/80 border border-slate-600 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600/80 transition-all duration-300"
                    aria-label="Next page"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AllBooks;

