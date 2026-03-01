/**
 * BlogCard Component
 * Displays individual blog in card format with alternating shading
 */
const BlogCard = ({ blog, index, onViewClick }) => {
  // Determine card background based on index (alternating pattern)
  const isEven = index % 2 === 0;
  const bgClass = isEven
    ? 'bg-gray-200 dark:bg-gray-800'
    : 'bg-gray-100 dark:bg-gray-900';

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get first letter of title for profile icon
  const firstLetter = blog.title.charAt(0).toUpperCase();

  return (
    <div
      className={`
        ${bgClass}
        p-6 rounded-lg mb-6
        transition-all duration-300 ease-in-out
        hover:scale-[1.02] hover:shadow-2xl
        cursor-pointer
        border border-transparent hover:border-gray-400 dark:hover:border-gray-600
      `}
      onClick={() => onViewClick(blog)}
    >
      <div className="flex items-start space-x-4">
        {/* Left: Profile Icon and Date */}
        <div className="flex flex-col items-center space-y-2 flex-shrink-0">
          {/* Circle Profile Icon */}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full 
                         bg-gray-700 dark:bg-gray-300 
                         flex items-center justify-center
                         transition-all duration-300 hover:scale-110">
            <span className="text-xl md:text-2xl font-bold text-white dark:text-gray-900">
              {firstLetter}
            </span>
          </div>
          {/* Date */}
          <span className="text-xs text-gray-600 dark:text-gray-400 text-center">
            {formatDate(blog.createdAt)}
          </span>
        </div>

        {/* Center: Title and Description */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 
                         mb-2 truncate">
            {blog.title}
          </h3>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 
                       line-clamp-2">
            {blog.description}
          </p>
        </div>

        {/* Right: View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewClick(blog);
          }}
          className="flex-shrink-0 px-4 py-2 md:px-6 md:py-2.5 
                     bg-gray-700 dark:bg-gray-300 
                     text-white dark:text-gray-900 
                     rounded-lg font-medium
                     transition-all duration-300 ease-in-out 
                     hover:scale-105 hover:shadow-xl
                     active:scale-95"
          aria-label="View blog"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
