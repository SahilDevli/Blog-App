import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from './context/ThemeContext';
import { loadFromLocalStorage } from './features/blog/blogSlice';
import Landing from './pages/Landing';

/**
 * LocalStorageSync Component
 * Handles synchronization between Redux store and localStorage
 */
const LocalStorageSync = () => {
  const dispatch = useDispatch();

  // Load blogs from localStorage on mount
  useEffect(() => {
    try {
      const savedBlogs = localStorage.getItem('blogs');
      if (savedBlogs) {
        dispatch(loadFromLocalStorage(JSON.parse(savedBlogs)));
      }
    } catch (error) {
      console.error('Error loading blogs from localStorage:', error);
    }
  }, [dispatch]);

  // Subscribe to Redux store changes and save to localStorage
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      try {
        const state = store.getState();
        localStorage.setItem('blogs', JSON.stringify(state.blog.blogs));
      } catch (error) {
        console.error('Error saving blogs to localStorage:', error);
      }
    });

    return unsubscribe;
  }, []);

  return <Landing />;
};

/**
 * App Component
 * Root component with Redux and Theme providers
 */
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LocalStorageSync />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
