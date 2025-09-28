import React, { useState, useEffect } from 'react';
import { 
  FiMessageSquare, 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiTrash2, 
  FiCheckCircle, 
  FiXCircle,
  FiFlag,
  FiUser,
  FiClock,
  FiChevronDown,
  FiChevronUp
} from 'react-icons/fi';

const QAManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchQuestionsAnswers = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = [
          {
            id: 1,
            question: "How long do the chicks need to be kept under a heat lamp?",
            category: "usage",
            status: "approved",
            reportCount: 0,
            author: {
              name: "John Doe",
              email: "john@example.com",
              id: "user123"
            },
            product: {
              id: "prod1",
              name: "Day-Old Broiler Chicks"
            },
            createdAt: "2024-01-15T10:30:00Z",
            helpfulCount: 12,
            answers: [
              {
                id: 1,
                answer: "Typically, chicks need heat lamps for about 4-6 weeks. Start with 95°F in the first week and reduce by 5°F each week until they're fully feathered.",
                status: "approved",
                reportCount: 0,
                author: {
                  name: "Admin Expert",
                  email: "expert@sanichfarms.com",
                  isExpert: true
                },
                createdAt: "2024-01-15T14:20:00Z",
                helpfulCount: 8
              }
            ]
          },
          {
            id: 2,
            question: "Do you provide vaccination records with the chicks?",
            category: "quality",
            status: "pending",
            reportCount: 0,
            author: {
              name: "Sarah Wilson",
              email: "sarah@example.com",
              id: "user456"
            },
            product: {
              id: "prod1",
              name: "Day-Old Broiler Chicks"
            },
            createdAt: "2024-01-10T08:45:00Z",
            helpfulCount: 3,
            answers: []
          },
          {
            id: 3,
            question: "This is inappropriate content that should be moderated",
            category: "general",
            status: "flagged",
            reportCount: 3,
            author: {
              name: "Bad User",
              email: "bad@example.com",
              id: "user789"
            },
            product: {
              id: "prod2",
              name: "Layer Feed"
            },
            createdAt: "2024-01-08T16:20:00Z",
            helpfulCount: 0,
            answers: [
              {
                id: 2,
                answer: "This is also inappropriate content",
                status: "flagged",
                reportCount: 2,
                author: {
                  name: "Another Bad User",
                  email: "bad2@example.com"
                },
                createdAt: "2024-01-09T10:15:00Z",
                helpfulCount: 0
              }
            ]
          }
        ];
        
        setQuestions(mockData);
      } catch (error) {
        console.error('Failed to fetch Q&A data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsAnswers();
  }, []);

  // Filter questions
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         question.product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || question.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  // Handle question approval/rejection
  const handleQuestionStatus = async (questionId, newStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setQuestions(prev => prev.map(q => 
        q.id === questionId ? { ...q, status: newStatus } : q
      ));
    } catch (error) {
      console.error('Failed to update question status:', error);
    }
  };

  // Handle answer approval/rejection
  const handleAnswerStatus = async (questionId, answerId, newStatus) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setQuestions(prev => prev.map(q => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: q.answers.map(a => 
              a.id === answerId ? { ...a, status: newStatus } : a
            )
          };
        }
        return q;
      }));
    } catch (error) {
      console.error('Failed to update answer status:', error);
    }
  };

  // Handle deletion
  const handleDelete = async (type, questionId, answerId = null) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (type === 'question') {
        setQuestions(prev => prev.filter(q => q.id !== questionId));
      } else {
        setQuestions(prev => prev.map(q => {
          if (q.id === questionId) {
            return {
              ...q,
              answers: q.answers.filter(a => a.id !== answerId)
            };
          }
          return q;
        }));
      }
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  // Toggle question expansion
  const toggleExpanded = (questionId) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      flagged: 'bg-red-100 text-red-800'
    };
    
    return `px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`;
  };

  const stats = {
    total: questions.length,
    approved: questions.filter(q => q.status === 'approved').length,
    pending: questions.filter(q => q.status === 'pending').length,
    flagged: questions.filter(q => q.status === 'flagged').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FiMessageSquare className="text-blue-600" />
            Questions & Answers Management
          </h1>
          <p className="text-gray-600 mt-1">Moderate customer questions and answers</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiMessageSquare className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Questions</dt>
              <dd className="text-2xl font-bold text-gray-900">{stats.total}</dd>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiCheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">Approved</dt>
              <dd className="text-2xl font-bold text-gray-900">{stats.approved}</dd>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiClock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">Pending Review</dt>
              <dd className="text-2xl font-bold text-gray-900">{stats.pending}</dd>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiFlag className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">Flagged</dt>
              <dd className="text-2xl font-bold text-gray-900">{stats.flagged}</dd>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search questions, users, or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending Review</option>
            <option value="rejected">Rejected</option>
            <option value="flagged">Flagged</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="general">General Questions</option>
            <option value="shipping">Shipping & Delivery</option>
            <option value="usage">Usage & Care</option>
            <option value="quality">Quality & Ingredients</option>
            <option value="availability">Stock & Availability</option>
            <option value="pricing">Pricing & Offers</option>
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="bg-white rounded-lg border border-gray-200">
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading questions...</p>
          </div>
        ) : filteredQuestions.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="p-6">
                {/* Question Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={getStatusBadge(question.status)}>
                        {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                      </span>
                      {question.reportCount > 0 && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <FiFlag className="w-3 h-3" />
                          {question.reportCount} report{question.reportCount !== 1 ? 's' : ''}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {formatTimeAgo(question.createdAt)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {question.question}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FiUser className="w-4 h-4" />
                        <span>{question.author.name} ({question.author.email})</span>
                      </div>
                      <span>Product: {question.product.name}</span>
                      <span>Category: {question.category}</span>
                      <span>{question.helpfulCount} helpful votes</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 ml-4">
                    {question.answers.length > 0 && (
                      <button
                        onClick={() => toggleExpanded(question.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                        title={expandedQuestions.has(question.id) ? 'Collapse' : 'Expand'}
                      >
                        {expandedQuestions.has(question.id) ? (
                          <FiChevronUp className="w-4 h-4" />
                        ) : (
                          <FiChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                    
                    {question.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleQuestionStatus(question.id, 'approved')}
                          className="p-2 text-green-600 hover:text-green-800 rounded-full hover:bg-green-100"
                          title="Approve"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleQuestionStatus(question.id, 'rejected')}
                          className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
                          title="Reject"
                        >
                          <FiXCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => handleDelete('question', question.id)}
                      className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
                      title="Delete"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Answers */}
                {expandedQuestions.has(question.id) && question.answers.length > 0 && (
                  <div className="ml-4 pl-4 border-l-2 border-gray-200 space-y-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Answers ({question.answers.length})
                    </h4>
                    
                    {question.answers.map((answer) => (
                      <div key={answer.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={getStatusBadge(answer.status)}>
                                {answer.status.charAt(0).toUpperCase() + answer.status.slice(1)}
                              </span>
                              {answer.reportCount > 0 && (
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                  <FiFlag className="w-3 h-3" />
                                  {answer.reportCount} report{answer.reportCount !== 1 ? 's' : ''}
                                </span>
                              )}
                              {answer.author.isExpert && (
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                  Expert
                                </span>
                              )}
                              <span className="text-sm text-gray-500">
                                {formatTimeAgo(answer.createdAt)}
                              </span>
                            </div>
                            
                            <p className="text-gray-800 mb-2">{answer.answer}</p>
                            
                            <div className="text-sm text-gray-600">
                              <span>By: {answer.author.name}</span>
                              <span className="ml-4">{answer.helpfulCount} helpful votes</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            {answer.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleAnswerStatus(question.id, answer.id, 'approved')}
                                  className="p-1 text-green-600 hover:text-green-800 rounded-full hover:bg-green-100"
                                  title="Approve"
                                >
                                  <FiCheckCircle className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleAnswerStatus(question.id, answer.id, 'rejected')}
                                  className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
                                  title="Reject"
                                >
                                  <FiXCircle className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            
                            <button
                              onClick={() => handleDelete('answer', question.id, answer.id)}
                              className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-100"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <FiMessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
            <p>No questions match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QAManagement;
