import { createSelector } from '@reduxjs/toolkit';

/**
 * Memoized selectors for blog data
 * Optimizes performance by preventing unnecessary re-renders
 */

// Base selector to get all blogs
export const selectAllBlogs = (state) => state.blog.blogs;

/**
 * Selector to filter blogs by search query
 * Searches in both title and description (case-insensitive)
 */
export const selectFilteredBlogs = createSelector(
  [selectAllBlogs, (state, searchQuery) => searchQuery],
  (blogs, searchQuery) => {
    if (!searchQuery || searchQuery.trim() === '') {
      return blogs;
    }
    
    const query = searchQuery.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query)
    );
  }
);

/**
 * Selector to get a single blog by ID
 */
export const selectBlogById = createSelector(
  [selectAllBlogs, (state, blogId) => blogId],
  (blogs, blogId) => blogs.find((blog) => blog.id === blogId)
);
