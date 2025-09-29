import React, { useState } from 'react';
import { FiX, FiUser, FiTag, FiMessageSquare } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

const AskQuestionModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  productId, 
  categories = [], 
  currentUser, 
  isAuthenticated 
}) => {
  const { addToast } = useToast();
  
  const [formData, setFormData] = useState({
    question: '',
    category: categories[0]?.value || 'general',
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.question.trim()) {
      addToast('Please enter your question', 'error');
      return;
    }

    if (!isAuthenticated) {
      addToast('Please log in to ask a question', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newQuestion = {
        id: Date.now(), // In real app, this would come from the server
        question: formData.question.trim(),
        category: formData.category,
        productId: productId, // Associate question with the product
        author: {
          name: formData.isAnonymous ? 'Anonymous' : (currentUser?.name || 'User'),
          avatar: formData.isAnonymous 
            ? "https://placehold.co/40x40/9ca3af/ffffff?text=A"
            : (currentUser?.avatar || "https://placehold.co/40x40/6b7280/ffffff?text=" + (currentUser?.name?.[0] || 'U'))
        },
        createdAt: new Date().toISOString(),
        helpfulCount: 0,
        isHelpfulByUser: false,
        answers: []
      };

      onSubmit(newQuestion);
      
      // Reset form
      setFormData({
        question: '',
        category: categories[0]?.value || 'general',
        isAnonymous: false
      });
      
    } catch (error) {
      console.error('Failed to submit question:', error);
      addToast('Failed to submit question. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay - Modern blur effect */}
        <div 
          className="fixed inset-0 transition-opacity backdrop-blur-md bg-white/20"
          onClick={handleClose}
        />

        {/* Modal positioning */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal panel - Enhanced with backdrop blur */}
        <div className="inline-block w-full max-w-2xl px-6 py-6 my-8 text-left align-middle transition-all transform bg-white/95 backdrop-blur-lg border border-white/30 shadow-2xl rounded-2xl sm:align-middle">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <FiMessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Ask a Question
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Get answers from other customers and our experts
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Authentication check */}
          {!isAuthenticated ? (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <FiUser className="w-5 h-5" />
                <p className="font-medium">Login Required</p>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                You need to be logged in to ask a question. 
                <button 
                  onClick={() => window.location.href = '/login'}
                  className="font-medium underline hover:no-underline ml-1"
                >
                  Login here
                </button>
              </p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Question field */}
            <div>
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                Your Question *
              </label>
              <textarea
                id="question"
                name="question"
                rows={4}
                value={formData.question}
                onChange={handleInputChange}
                placeholder="What would you like to know about this product?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                disabled={!isAuthenticated || isSubmitting}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Be specific and clear. This will help you get better answers.
              </p>
            </div>

            {/* Category selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                <FiTag className="inline w-4 h-4 mr-1" />
                Category (Optional)
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={!isAuthenticated || isSubmitting}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Help categorize your question for better organization.
              </p>
            </div>

            {/* Anonymous option */}
            {isAuthenticated && (
              <div className="flex items-start gap-3">
                <input
                  id="isAnonymous"
                  name="isAnonymous"
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  className="mt-1 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <div className="flex-1">
                  <label htmlFor="isAnonymous" className="text-sm font-medium text-gray-700">
                    Post anonymously
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Your name won't be shown with this question
                  </p>
                </div>
              </div>
            )}

            {/* Guidelines */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Community Guidelines</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Be respectful and courteous to other community members</li>
                <li>• Ask specific questions about the product</li>
                <li>• Avoid promotional content or spam</li>
                <li>• Don't share personal information</li>
              </ul>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isAuthenticated || isSubmitting || !formData.question.trim()}
                className="px-6 py-3 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Question'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestionModal;
