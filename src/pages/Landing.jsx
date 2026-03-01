import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredBlogs } from '../features/blog/blogSelectors';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import AddBlogModal from '../components/AddBlogModal';
import ViewBlogModal from '../components/ViewBlogModal';

/**
 * Landing Page Component
 * Main page with welcome animation and blog list
 */
const Landing = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get filtered blogs from Redux
  const blogs = useSelector((state) => selectFilteredBlogs(state, searchQuery));

  // Welcome animation: hide after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle compose button click
  const handleComposeClick = () => {
    setShowAddModal(true);
  };

  // Handle view blog click
  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
    setShowViewModal(true);
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Welcome Animation Overlay */}
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center 
                       bg-white dark:bg-gray-900 
                       animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 
                         animate-slide-up">
            Welcome to BlogPage
          </h1>
        </div>
      )}

      {/* Main Content */}
      <div className="h-screen flex flex-col overflow-hidden">
        {/* Header (25vh) */}
        <Header
          onComposeClick={handleComposeClick}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />

        {/* Blog List (75vh - scrollable) */}
        <main className="flex-1 overflow-y-auto px-6 md:px-12 py-6">
          <div className="max-w-5xl mx-auto">
            {blogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[50vh] space-y-4">
                <svg
                  className="w-24 h-24 text-gray-400 dark:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-xl text-gray-600 dark:text-gray-400 text-center">
                  {searchQuery
                    ? 'No blogs found matching your search'
                    : 'No blogs yet. Start by creating your first blog!'}
                </p>
                {!searchQuery && (
                  <button
                    onClick={handleComposeClick}
                    className="px-6 py-3 
                             bg-gray-800 dark:bg-gray-200 
                             text-white dark:text-gray-900 
                             rounded-lg font-medium
                             transition-all duration-300 ease-in-out 
                             hover:scale-105 hover:shadow-xl
                             active:scale-95"
                  >
                    Create Your First Blog
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-0">
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    index={index}
                    onViewClick={handleViewBlog}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <AddBlogModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />
      <ViewBlogModal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedBlog(null);
        }}
        blog={selectedBlog}
      />
    </div>
  );
};

export default Landing;
