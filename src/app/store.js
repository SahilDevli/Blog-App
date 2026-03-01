import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../features/blog/blogSlice';

/**
 * Redux store configuration
 * Combines all reducers and configures middleware
 */
export const store = configureStore({
  reducer: {
    blog: blogReducer,
  },
});
