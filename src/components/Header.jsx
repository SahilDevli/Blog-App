import { useState } from 'react';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

/**
 * Header Component
 * Fixed header (25vh) with logo, compose button, search, and theme toggle
 */
const Header = ({ onComposeClick, onSearch, searchQuery }) => {
  return (
    <header className="h-[25vh] bg-white dark:bg-gray-900 border-b-2 border-gray-300 dark:border-gray-700 
                       flex items-center justify-between px-6 md:px-12 
                       transition-colors duration-300">
      {/* Logo / Title */}
      <div className="flex items-center space-x-3 cursor-pointer">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 dark:bg-gray-200 rounded-lg 
                        flex items-center justify-center transition-all duration-300 
                        hover:scale-110 hover:rotate-3">
          <span className="text-2xl md:text-3xl font-bold text-white dark:text-gray-900">B</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 
                       transition-colors duration-300">
          BlogApp
        </h1>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Compose Button */}
        <button
          onClick={onComposeClick}
          className="flex items-center space-x-2 px-4 py-2 md:px-6 md:py-2.5 
                     bg-gray-800 dark:bg-gray-200 
                     text-white dark:text-gray-900 
                     rounded-lg font-medium
                     transition-all duration-300 ease-in-out 
                     hover:scale-105 hover:shadow-xl
                     active:scale-95"
          aria-label="Compose new blog"
        >
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="hidden md:inline">Compose</span>
        </button>

        {/* Search Bar */}
        <SearchBar onSearch={onSearch} searchQuery={searchQuery} />

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
