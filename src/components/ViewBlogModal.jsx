import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBlog, deleteBlog, toggleLike } from '../features/blog/blogSlice';

/**
 * ViewBlogModal Component
 * Modal for viewing, editing, and deleting blog posts (90vh x 90vw)
 */
const ViewBlogModal = ({ isOpen, onClose, blog }) => {
  const dispatch = useDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedContent, setEditedContent] = useState('');

  // Initialize edit fields when blog changes
  useEffect(() => {
    if (blog) {
      setEditedTitle(blog.title);
      setEditedDescription(blog.description);
      setEditedContent(blog.content);
    }
  }, [blog]);

  if (!isOpen || !blog) return null;

  // Handle like toggle
  const handleLike = () => {
    dispatch(toggleLike(blog.id));
  };

  // Handle edit mode toggle
  const handleEditClick = () => {
    setIsEditMode(true);
  };

  // Handle save changes
  const handleSaveChanges = () => {
    // Validation
    if (!editedTitle.trim()) {
      alert('Title cannot be empty');
      return;
    }
    if (!editedDescription.trim()) {
      alert('Description cannot be empty');
      return;
    }
    if (!editedContent.trim()) {
      alert('Content cannot be empty');
      return;
    }

    // Dispatch update action
    dispatch(
      updateBlog({
        id: blog.id,
        title: editedTitle.trim(),
        description: editedDescription.trim(),
        content: editedContent.trim(),
      })
    );

    setIsEditMode(false);
  };

  // Handle discard changes
  const handleDiscardChanges = () => {
    if (window.confirm('Are you sure you want to discard your changes?')) {
      // Reset to original values
      setEditedTitle(blog.title);
      setEditedDescription(blog.description);
      setEditedContent(blog.content);
      setIsEditMode(false);
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
      dispatch(deleteBlog(blog.id));
      onClose();
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 
                   animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   w-[90vw] h-[90vh] 
                   bg-white dark:bg-gray-900 
                   rounded-2xl shadow-2xl z-50 
                   animate-scale-in
                   flex flex-col
                   border-2 border-gray-300 dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-gray-300 dark:border-gray-700">
          {/* Close Button (Left) */}
          <button
            onClick={onClose}
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

          {/* Action Buttons (Right) */}
          <div className="flex items-center space-x-3">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`p-2 rounded-lg transition-all duration-300 
                         hover:scale-110 hover:shadow-lg
                         ${
                           blog.liked
                             ? 'bg-gray-800 dark:bg-gray-200'
                             : 'bg-gray-200 dark:bg-gray-700'
                         }`}
              aria-label="Like blog"
              title={blog.liked ? 'Unlike' : 'Like'}
            >
              <svg
                className={`w-6 h-6 transition-all duration-300 ${
                  blog.liked
                    ? 'text-white dark:text-gray-900'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                fill={blog.liked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth={blog.liked ? 0 : 2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Edit Button */}
            {!isEditMode && (
              <button
                onClick={handleEditClick}
                className="p-2 rounded-lg transition-all duration-300 
                           hover:scale-110 hover:shadow-lg
                           bg-gray-200 dark:bg-gray-700"
                aria-label="Edit blog"
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            )}

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg transition-all duration-300 
                         hover:scale-110 hover:shadow-lg
                         bg-gray-200 dark:bg-gray-700
                         hover:bg-red-100 dark:hover:bg-red-900"
              aria-label="Delete blog"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300 
                           hover:text-red-600 dark:hover:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Date */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {formatDate(blog.createdAt)}
          </p>

          {/* Title */}
          {isEditMode ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg 
                       bg-gray-100 dark:bg-gray-800 
                       text-2xl md:text-3xl font-bold
                       text-gray-900 dark:text-gray-100 
                       border-2 border-gray-300 dark:border-gray-700
                       focus:border-gray-500 dark:focus:border-gray-500
                       focus:outline-none
                       transition-all duration-300"
            />
          ) : (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {blog.title}
            </h2>
          )}

          {/* Description */}
          {isEditMode ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-lg 
                       bg-gray-100 dark:bg-gray-800 
                       text-gray-900 dark:text-gray-100 
                       border-2 border-gray-300 dark:border-gray-700
                       focus:border-gray-500 dark:focus:border-gray-500
                       focus:outline-none
                       transition-all duration-300
                       resize-none"
            />
          ) : (
            <p className="text-lg text-gray-700 dark:text-gray-300 italic">
              {blog.description}
            </p>
          )}

          {/* Divider */}
          <hr className="border-gray-300 dark:border-gray-700" />

          {/* Content */}
          {isEditMode ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={15}
              className="w-full px-4 py-3 rounded-lg 
                       bg-gray-100 dark:bg-gray-800 
                       text-gray-900 dark:text-gray-100 
                       border-2 border-gray-300 dark:border-gray-700
                       focus:border-gray-500 dark:focus:border-gray-500
                       focus:outline-none
                       transition-all duration-300
                       resize-none"
            />
          ) : (
            <div className="text-base md:text-lg text-gray-800 dark:text-gray-200 
                           whitespace-pre-wrap leading-relaxed">
              {blog.content}
            </div>
          )}
        </div>

        {/* Footer (Edit Mode Actions) */}
        {isEditMode && (
          <div className="p-6 border-t-2 border-gray-300 dark:border-gray-700 
                         flex justify-end space-x-4">
            <button
              onClick={handleDiscardChanges}
              className="px-6 py-2.5 
                       bg-gray-300 dark:bg-gray-700 
                       text-gray-900 dark:text-gray-100 
                       rounded-lg font-medium
                       transition-all duration-300 ease-in-out 
                       hover:scale-105 hover:shadow-lg
                       active:scale-95"
            >
              Discard Changes
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-6 py-2.5 
                       bg-gray-800 dark:bg-gray-200 
                       text-white dark:text-gray-900 
                       rounded-lg font-bold
                       transition-all duration-300 ease-in-out 
                       hover:scale-105 hover:shadow-xl
                       active:scale-95"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewBlogModal;
