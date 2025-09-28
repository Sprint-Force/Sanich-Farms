import { useState, useEffect, useCallback } from 'react';

// Custom hook for managing Questions & Answers functionality
export const useQuestionsAnswers = (productId) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch questions for a specific product
  const fetchQuestions = useCallback(async () => {
    if (!productId) return;

    setLoading(true);
    setError(null);

    try {
      // Replace with actual API endpoint
      const response = await fetch(`/api/products/${productId}/questions`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      setQuestions(Array.isArray(data) ? data : data.questions || []);
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError(err.message);
      
      // Fallback to mock data for development
      setQuestions([
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
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  // Submit a new question
  const submitQuestion = useCallback(async (questionData) => {
    try {
      const response = await fetch(`/api/products/${productId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers as needed
        },
        body: JSON.stringify(questionData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit question');
      }

      const newQuestion = await response.json();
      
      // Add the new question to the beginning of the list
      setQuestions(prev => [newQuestion, ...prev]);
      
      return newQuestion;
    } catch (err) {
      console.error('Error submitting question:', err);
      
      // For development, create a mock question
      const mockQuestion = {
        id: Date.now(),
        question: questionData.question,
        category: questionData.category || 'general',
        author: {
          name: questionData.author?.name || 'Anonymous',
          avatar: questionData.author?.avatar || "https://placehold.co/40x40/9ca3af/ffffff?text=A"
        },
        createdAt: new Date().toISOString(),
        helpfulCount: 0,
        isHelpfulByUser: false,
        answers: []
      };
      
      setQuestions(prev => [mockQuestion, ...prev]);
      return mockQuestion;
    }
  }, [productId]);

  // Submit an answer to a question
  const submitAnswer = useCallback(async (questionId, answerData) => {
    try {
      const response = await fetch(`/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers as needed
        },
        body: JSON.stringify(answerData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit answer');
      }

      const newAnswer = await response.json();
      
      // Update the question with the new answer
      setQuestions(prev => prev.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            answers: [...question.answers, newAnswer]
          };
        }
        return question;
      }));
      
      return newAnswer;
    } catch (err) {
      console.error('Error submitting answer:', err);
      
      // For development, create a mock answer
      const mockAnswer = {
        id: Date.now(),
        answer: answerData.answer,
        author: {
          name: answerData.author?.name || 'Anonymous',
          avatar: answerData.author?.avatar || "https://placehold.co/40x40/6b7280/ffffff?text=U"
        },
        createdAt: new Date().toISOString(),
        helpfulCount: 0,
        isHelpfulByUser: false
      };
      
      setQuestions(prev => prev.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            answers: [...question.answers, mockAnswer]
          };
        }
        return question;
      }));
      
      return mockAnswer;
    }
  }, []);

  // Vote on a question (helpful/not helpful)
  const voteOnQuestion = useCallback(async (questionId, isHelpful) => {
    try {
      const response = await fetch(`/api/questions/${questionId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers as needed
        },
        body: JSON.stringify({ isHelpful })
      });

      if (!response.ok) {
        throw new Error('Failed to record vote');
      }

      const result = await response.json();
      
      // Update the question vote count
      setQuestions(prev => prev.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            helpfulCount: result.helpfulCount,
            isHelpfulByUser: isHelpful
          };
        }
        return question;
      }));
      
      return result;
    } catch (err) {
      console.error('Error voting on question:', err);
      throw err;
    }
  }, []);

  // Vote on an answer (helpful/not helpful)
  const voteOnAnswer = useCallback(async (questionId, answerId, isHelpful) => {
    try {
      const response = await fetch(`/api/answers/${answerId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers as needed
        },
        body: JSON.stringify({ isHelpful })
      });

      if (!response.ok) {
        throw new Error('Failed to record vote');
      }

      const result = await response.json();
      
      // Update the answer vote count
      setQuestions(prev => prev.map(question => {
        if (question.id === questionId) {
          return {
            ...question,
            answers: question.answers.map(answer => {
              if (answer.id === answerId) {
                return {
                  ...answer,
                  helpfulCount: result.helpfulCount,
                  isHelpfulByUser: isHelpful
                };
              }
              return answer;
            })
          };
        }
        return question;
      }));
      
      return result;
    } catch (err) {
      console.error('Error voting on answer:', err);
      throw err;
    }
  }, []);

  // Report inappropriate content
  const reportContent = useCallback(async (contentType, contentId, reason = '') => {
    try {
      const response = await fetch(`/api/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers as needed
        },
        body: JSON.stringify({
          contentType,
          contentId,
          reason
        })
      });

      if (!response.ok) {
        throw new Error('Failed to report content');
      }

      return await response.json();
    } catch (err) {
      console.error('Error reporting content:', err);
      throw err;
    }
  }, []);

  // Filter and search questions
  const filterQuestions = useCallback((searchQuery = '', category = 'all', sortBy = 'newest') => {
    let filtered = [...questions];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(question => 
        question.question.toLowerCase().includes(query) ||
        question.answers.some(answer => 
          answer.answer.toLowerCase().includes(query)
        )
      );
    }

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(question => question.category === category);
    }

    // Apply sorting
    filtered.sort((a, b) => {
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

    return filtered;
  }, [questions]);

  // Get question statistics
  const getStatistics = useCallback(() => {
    const totalQuestions = questions.length;
    const totalAnswers = questions.reduce((sum, q) => sum + q.answers.length, 0);
    const unansweredQuestions = questions.filter(q => q.answers.length === 0).length;
    const averageAnswersPerQuestion = totalQuestions > 0 ? (totalAnswers / totalQuestions).toFixed(1) : 0;

    return {
      totalQuestions,
      totalAnswers,
      unansweredQuestions,
      averageAnswersPerQuestion
    };
  }, [questions]);

  // Initialize data fetch
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return {
    questions,
    loading,
    error,
    statistics: getStatistics(),
    // Actions
    fetchQuestions,
    submitQuestion,
    submitAnswer,
    voteOnQuestion,
    voteOnAnswer,
    reportContent,
    filterQuestions,
    // Utilities
    updateQuestion: (updatedQuestion) => {
      setQuestions(prev => prev.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      ));
    },
    deleteQuestion: (questionId) => {
      setQuestions(prev => prev.filter(q => q.id !== questionId));
    }
  };
};
