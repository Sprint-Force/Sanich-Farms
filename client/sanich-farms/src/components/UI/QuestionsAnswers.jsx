import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiFilter, FiMessageSquare, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useToast } from '../../context/ToastContext';
import AskQuestionModal from './AskQuestionModal';
import QuestionCard from './QuestionCard';

const QuestionsAnswers = ({ productId, className = "" }) => {
  const { isAuthenticated, user } = useAuthContext();
  const { addToast } = useToast();

  // State management
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showAskModal, setShowAskModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const questionsPerPage = 10;

  // Categories for filtering
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'general', label: 'General Questions' },
    { value: 'shipping', label: 'Shipping & Delivery' },
    { value: 'usage', label: 'Usage & Care' },
    { value: 'quality', label: 'Quality & Ingredients' },
    { value: 'availability', label: 'Stock & Availability' },
    { value: 'pricing', label: 'Pricing & Offers' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most_helpful', label: 'Most Helpful' },
    { value: 'most_answered', label: 'Most Answered' }
  ];

  // Mock data - replace with API call
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockQuestions = [
          {
            id: 1,
            question: "How long do the chicks need to be kept under a heat lamp?",
            category: "usage",
            author: {
              name: "John Doe",
              avatar: "https://placehold.co/40x40/e5e7eb/6b7280?text=JD"
            },
            createdAt: "2024-01-15T10:30:00Z",
            helpfulCount: 12,
            isHelpfulByUser: false,
            answers: [
              {
                id: 1,
                answer: "Typically, chicks need heat lamps for about 4-6 weeks. Start with 95°F in the first week and reduce by 5°F each week until they're fully feathered.",
                author: {
                  name: "Sanich Farms Expert",
                  avatar: "https://placehold.co/40x40/10b981/ffffff?text=SF",
                  isExpert: true
                },
                createdAt: "2024-01-15T14:20:00Z",
                helpfulCount: 8,
                isHelpfulByUser: true
              },
              {
                id: 2,
                answer: "I usually keep mine under heat for 5 weeks. Make sure to watch their behavior - if they're huddling, they're cold; if they're panting, they're too hot.",
                author: {
                  name: "Mary Johnson",
                  avatar: "https://placehold.co/40x40/f59e0b/ffffff?text=MJ"
                },
                createdAt: "2024-01-16T09:15:00Z",
                helpfulCount: 3,
                isHelpfulByUser: false
              }
            ]
          },
          {
            id: 2,
            question: "What's the difference between your layer chicks and broiler chicks?",
            category: "general",
            author: {
              name: "Sarah Wilson",
              avatar: "https://placehold.co/40x40/8b5cf6/ffffff?text=SW"
            },
            createdAt: "2024-01-10T08:45:00Z",
            helpfulCount: 8,
            isHelpfulByUser: true,
            answers: [
              {
                id: 3,
                answer: "Layer chicks are bred specifically for egg production and will start laying eggs around 18-20 weeks. Broiler chicks are raised for meat and grow much faster, ready for processing in 6-8 weeks.",
                author: {
                  name: "Sanich Farms Expert",
                  avatar: "https://placehold.co/40x40/10b981/ffffff?text=SF",
                  isExpert: true
                },
                createdAt: "2024-01-10T12:30:00Z",
                helpfulCount: 15,
                isHelpfulByUser: false
              }
            ]
          },
          {
            id: 3,
            question: "Do you provide vaccination records with the chicks?",
            category: "quality",
            author: {
              name: "Michael Brown",
              avatar: "https://placehold.co/40x40/ef4444/ffffff?text=MB"
            },
            createdAt: "2024-01-08T16:20:00Z",
            helpfulCount: 5,
            isHelpfulByUser: false,
            answers: []
          }
        ];

        setQuestions(mockQuestions);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        addToast('Failed to load questions', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [productId, addToast]);

  // Filter and search questions
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.answers.some(answer => 
                           answer.answer.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Sort questions
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'most_helpful':
        return b.helpfulCount - a.helpfulCount;
      case 'most_answered':
        return b.answers.length - a.answers.length;
      default: // newest
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedQuestions.length / questionsPerPage);
  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const paginatedQuestions = sortedQuestions.slice(startIndex, endIndex);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleQuestionSubmitted = (newQuestion) => {
    setQuestions(prev => [newQuestion, ...prev]);
    setShowAskModal(false);
    addToast('Your question has been submitted successfully!', 'success');
  };

  const handleQuestionUpdate = (updatedQuestion) => {
    setQuestions(prev => 
      prev.map(q => q.id === updatedQuestion.id ? updatedQuestion : q)
    );
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <FiMessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Customer Questions & Answers
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {questions.length} question{questions.length !== 1 ? 's' : ''} about this product
              </p>
            </div>
          </div>

          {/* Ask Question Button */}
          <button
            onClick={() => setShowAskModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
          >
            <FiPlus className="w-4 h-4" />
            Ask a Question
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search in Q&A..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiFilter className="w-4 h-4" />
            Filters
            {showFilters ? (
              <FiChevronUp className="w-4 h-4" />
            ) : (
              <FiChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : paginatedQuestions.length > 0 ? (
          <div className="space-y-6">
            {paginatedQuestions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onUpdate={handleQuestionUpdate}
                currentUser={user}
                isAuthenticated={isAuthenticated}
              />
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const isCurrentPage = pageNum === currentPage;
                    
                    // Show first page, last page, current page, and pages around current
                    const showPage = pageNum === 1 || 
                                   pageNum === totalPages || 
                                   Math.abs(pageNum - currentPage) <= 1;
                    
                    if (!showPage && pageNum !== currentPage - 2 && pageNum !== currentPage + 2) {
                      return null;
                    }
                    
                    if (!showPage) {
                      return <span key={pageNum} className="px-2 text-gray-400">...</span>;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          isCurrentPage
                            ? 'bg-green-600 text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiMessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery || selectedCategory !== 'all' 
                ? 'No questions found' 
                : 'No questions yet'
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Be the first to ask a question about this product!'
              }
            </p>
            <button
              onClick={() => setShowAskModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <FiPlus className="w-4 h-4" />
              Ask the First Question
            </button>
          </div>
        )}
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <AskQuestionModal
          isOpen={showAskModal}
          onClose={() => setShowAskModal(false)}
          onSubmit={handleQuestionSubmitted}
          productId={productId}
          categories={categories.filter(c => c.value !== 'all')}
          currentUser={user}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
};

export default QuestionsAnswers;
