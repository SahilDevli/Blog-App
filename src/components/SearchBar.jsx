import { useState } from 'react';

/**
 * SearchBar Component
 * Modern expandable search bar with live filtering
 */
const SearchBar = ({ onSearch, searchQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  const toggleExpand = () => {
    if (isExpanded && searchQuery) {
      // Don't collapse if there's a search query
      return;
    }
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      onSearch(''); // Clear search when collapsing
    }
  };

  return (
    <div className="relative flex items-center">
      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search blogs..."
        className={`
          absolute right-0 py-2 px-4 pr-12 rounded-lg
          bg-gray-200 dark:bg-gray-700
          text-gray-800 dark:text-gray-200
          placeholder-gray-500 dark:placeholder-gray-400
          border-2 border-transparent
          focus:border-gray-400 dark:focus:border-gray-500
          focus:outline-none
          transition-all duration-300 ease-in-out
          ${isExpanded ? 'w-64 opacity-100' : 'w-12 opacity-0 pointer-events-none'}
        `}
      />
      
      {/* Search Button */}
      <button
        onClick={toggleExpand}
        className="relative z-10 p-2 rounded-lg transition-all duration-300 ease-in-out 
                   hover:scale-110 hover:shadow-lg
                   bg-gray-200 dark:bg-gray-700
                   text-gray-800 dark:text-gray-200"
        aria-label="Search"
        title="Search blogs"
      >
        {isExpanded && searchQuery ? (
          // Close icon when search is active
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            onClick={(e) => {
              e.stopPropagation();
              onSearch('');
              setIsExpanded(false);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Search icon
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default SearchBar;
