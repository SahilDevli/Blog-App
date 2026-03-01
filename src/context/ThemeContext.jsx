import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Theme Context for managing light/dark grayscale theme across the app
 * Persists theme preference in localStorage
 */
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('blog-theme');
      return savedTheme || 'light';
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
      return 'light';
    }
  });

  // Update localStorage and document class when theme changes
  useEffect(() => {
    try {
      localStorage.setItem('blog-theme', theme);
      // Apply theme class to document root for global styling
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    } catch (error) {
      console.error('Error saving theme to localStorage:', error);
    }
  }, [theme]);

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
