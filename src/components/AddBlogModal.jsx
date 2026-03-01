import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../features/blog/blogSlice';

/**
 * AddBlogModal Component
 * Modal for creating new blog posts (80vh x 90vw)
 */
const AddBlogModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  // Handle close with confirmation if there's unsaved data
  const handleClose = () => {
    if (title || description || content) {
      if (window.confirm('Are you sure you want to close? Unsaved changes will be lost.')) {
        resetForm();
        onClose();
      }
    } else {
      onClose();
    }
  };

  // Reset form fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setContent('');
  };

  // Handle post submission
  const handlePost = () => {
    // Validation
    if (!title.trim()) {
      alert('Please enter a title for your blog');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a description');
      return;
    }
    if (!content.trim()) {
      alert('Please write some content for your blog');
      return;
    }

    // Dispatch action to add blog
    dispatch(
      addBlog({
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
      })
    );

    // Reset form and close modal
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 
                   animate-fade-in"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   w-[90vw] h-[80vh] 
                   bg-white dark:bg-gray-900 
                   rounded-2xl shadow-2xl z-50 
                   animate-scale-in
                   flex flex-col
                   border-2 border-gray-300 dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-300 dark:border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create New Blog
          </h2>
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="p-2 rounded-lg transition-all duration-300 
                       hover:bg-gray-200 dark:hover:bg-gray-700 
                       hover:scale-110"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Title Input */}
          <div>
            <label
              htmlFor="blog-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Title *
            </label>
            <input
              id="blog-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title..."
              className="w-full px-4 py-3 rounded-lg 
                       bg-gray-100 dark:bg-gray-800 
                       text-gray-900 dark:text-gray-100 
                       placeholder-gray-500 dark:placeholder-gray-400
                       border-2 border-gray-300 dark:border-gray-700
                       focus:border-gray-500 dark:focus:border-gray-500
                       focus:outline-none
                       transition-all duration-300"
            />
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="blog-description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description *
            </label>
            <textarea
              id="blog-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a brief description that captures the essence of your blog post..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg 
                       bg-gray-100 dark:bg-gray-800 
                       text-gray-900 dark:text-gray-100 
                       placeholder-gray-500 dark:placeholder-gray-400
                       border-2 border-gray-300 dark:border-gray-700
                       focus:border-gray-500 dark:focus:border-gray-500
                       focus:outline-none
                       transition-all duration-300
                       resize-none"
            />
          </div>

          {/* Content Input */}
          <div>
            <label
              htmlFor="blog-content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Content *
            </label>
            <textarea
              id="blog-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start writing your blog content here... Share your thoughts, ideas, and stories."
              rows={12}
              className="w-full px-4 py-3 rounded-lg 
                       bg-gray-100 dark:bg-gray-800 
                       text-gray-900 dark:text-gray-100 
                       placeholder-gray-500 dark:placeholder-gray-400
                       border-2 border-gray-300 dark:border-gray-700
                       focus:border-gray-500 dark:focus:border-gray-500
                       focus:outline-none
                       transition-all duration-300
                       resize-none"
            />
          </div>
        </div>

        {/* Footer with Post Button */}
        <div className="p-6 border-t-2 border-gray-300 dark:border-gray-700 flex justify-end">
          <button
            onClick={handlePost}
            className="px-8 py-3 
                     bg-gray-800 dark:bg-gray-200 
                     text-white dark:text-gray-900 
                     rounded-lg font-bold text-lg
                     transition-all duration-300 ease-in-out 
                     hover:scale-105 hover:shadow-xl
                     active:scale-95"
          >
            Post Blog
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBlogModal;
