import { createSlice } from '@reduxjs/toolkit';

/**
 * Blog slice for managing blog state
 * Handles all blog CRUD operations and like functionality
 */
const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogs: [],
  },
  reducers: {
    /**
     * Load blogs from localStorage on app initialization
     */
    loadFromLocalStorage: (state, action) => {
      state.blogs = action.payload;
    },

    /**
     * Add a new blog post
     * Automatically generates ID and timestamp
     */
    addBlog: (state, action) => {
      const newBlog = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description,
        content: action.payload.content,
        createdAt: new Date().toISOString(),
        liked: false,
      };
      state.blogs.unshift(newBlog); // Add to beginning of array
    },

    /**
     * Update an existing blog post
     */
    updateBlog: (state, action) => {
      const { id, title, description, content } = action.payload;
      const blog = state.blogs.find((b) => b.id === id);
      if (blog) {
        blog.title = title;
        blog.description = description;
        blog.content = content;
      }
    },

    /**
     * Delete a blog post by ID
     */
    deleteBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
    },

    /**
     * Toggle like status for a blog post
     */
    toggleLike: (state, action) => {
      const blog = state.blogs.find((b) => b.id === action.payload);
      if (blog) {
        blog.liked = !blog.liked;
      }
    },
  },
});

export const { addBlog, deleteBlog, updateBlog, toggleLike, loadFromLocalStorage } = blogSlice.actions;
export default blogSlice.reducer;
