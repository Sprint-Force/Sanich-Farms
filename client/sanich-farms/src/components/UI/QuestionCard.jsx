import React, { useState } from 'react';
import { 
  FiThumbsUp, 
  FiThumbsDown, 
  FiMessageCircle, 
  FiFlag, 
  FiChevronDown, 
  FiChevronUp,
  FiClock,
  FiUser,
  FiShield,
  FiCornerUpLeft
} from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

const QuestionCard = ({ question, onUpdate, currentUser, isAuthenticated }) => {
  const { addToast } = useToast();
  
  const [showAnswers, setShowAnswers] = useState(question.answers.length > 0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [processingVotes, setProcessingVotes] = useState(new Set());

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  };

  // Handle helpful vote for question
  const handleQuestionVote = async (isHelpful) => {
    if (!isAuthenticated) {
      addToast('Please log in to vote', 'error');
      return;
    }

    const voteKey = `question-${question.id}`;
    if (processingVotes.has(voteKey)) return;

    setProcessingVotes(prev => new Set(prev).add(voteKey));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedQuestion = {
        ...question,
        helpfulCount: isHelpful ? question.helpfulCount + 1 : Math.max(0, question.helpfulCount - 1),
        isHelpfulByUser: isHelpful
      };
      
      onUpdate(updatedQuestion);
      addToast(isHelpful ? 'Marked as helpful!' : 'Vote removed', 'success');
      
    } catch (error) {
      console.error('Failed to vote:', error);
      addToast('Failed to record vote', 'error');
    } finally {
      setProcessingVotes(prev => {
        const newSet = new Set(prev);
        newSet.delete(voteKey);
        return newSet;
      });
    }
  };

  // Handle helpful vote for answer
  const handleAnswerVote = async (answerId, isHelpful) => {
    if (!isAuthenticated) {
      addToast('Please log in to vote', 'error');
      return;
    }

    const voteKey = `answer-${answerId}`;
    if (processingVotes.has(voteKey)) return;

    setProcessingVotes(prev => new Set(prev).add(voteKey));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedAnswers = question.answers.map(answer => {
        if (answer.id === answerId) {
          return {
            ...answer,
            helpfulCount: isHelpful ? answer.helpfulCount + 1 : Math.max(0, answer.helpfulCount - 1),
            isHelpfulByUser: isHelpful
          };
        }
        return answer;
      });
      
      const updatedQuestion = {
        ...question,
        answers: updatedAnswers
      };
      
      onUpdate(updatedQuestion);
      addToast(isHelpful ? 'Marked as helpful!' : 'Vote removed', 'success');
      
    } catch (error) {
      console.error('Failed to vote:', error);
      addToast('Failed to record vote', 'error');
    } finally {
      setProcessingVotes(prev => {
        const newSet = new Set(prev);
        newSet.delete(voteKey);
        return newSet;
      });
    }
  };

  // Handle reply submission
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    
    if (!replyText.trim()) {
      addToast('Please enter your answer', 'error');
      return;
    }

    if (!isAuthenticated) {
      addToast('Please log in to answer', 'error');
      return;
    }

    setIsSubmittingReply(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newAnswer = {
        id: Date.now(),
        answer: replyText.trim(),
        author: {
          name: currentUser?.name || 'User',
          avatar: currentUser?.avatar || `https://placehold.co/40x40/6b7280/ffffff?text=${currentUser?.name?.[0] || 'U'}`
        },
        createdAt: new Date().toISOString(),
        helpfulCount: 0,
        isHelpfulByUser: false
      };

      const updatedQuestion = {
        ...question,
        answers: [...question.answers, newAnswer]
      };

      onUpdate(updatedQuestion);
      setReplyText('');
      setShowReplyForm(false);
      setShowAnswers(true);
      addToast('Your answer has been posted!', 'success');
      
    } catch (error) {
      console.error('Failed to submit answer:', error);
      addToast('Failed to post answer', 'error');
    } finally {
      setIsSubmittingReply(false);
    }
  };

  // Handle report
  const handleReport = async (type, id) => {
    if (!isAuthenticated) {
      addToast('Please log in to report content', 'error');
      return;
    }

    try {
      // Simulate API call with the provided parameters
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Reporting ${type} with ID: ${id}`);
      addToast('Content reported. Thank you for helping keep our community safe.', 'success');
    } catch (error) {
      console.error('Failed to report:', error);
      addToast('Failed to report content', 'error');
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-gray-300 transition-colors">
      {/* Question Header */}
      <div className="flex items-start gap-3 mb-4">
        <img
          src={question.author.avatar}
          alt={question.author.name}
          className="w-10 h-10 rounded-full flex-shrink-0"
          onError={(e) => {
            e.target.src = "https://placehold.co/40x40/6b7280/ffffff?text=U";
          }}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 leading-relaxed">
                {question.question}
              </h3>
              
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FiUser className="w-3 h-3" />
                  <span className="font-medium">{question.author.name}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  <span>{formatTimeAgo(question.createdAt)}</span>
                </div>
                
                {question.category && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {question.category.charAt(0).toUpperCase() + question.category.slice(1)}
                  </span>
                )}
              </div>
            </div>

            {/* Report button */}
            <button
              onClick={() => handleReport('question', question.id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Report inappropriate content"
            >
              <FiFlag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Question Actions */}
      <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleQuestionVote(!question.isHelpfulByUser)}
            disabled={processingVotes.has(`question-${question.id}`)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              question.isHelpfulByUser
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <FiThumbsUp className={`w-4 h-4 ${question.isHelpfulByUser ? 'fill-current' : ''}`} />
            Helpful ({question.helpfulCount})
          </button>
        </div>

        <button
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
        >
          <FiCornerUpLeft className="w-4 h-4" />
          Answer
        </button>

        {question.answers.length > 0 && (
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className="flex items-center gap-1 text-gray-600 text-sm font-medium hover:text-gray-800 transition-colors"
          >
            <FiMessageCircle className="w-4 h-4" />
            {question.answers.length} Answer{question.answers.length !== 1 ? 's' : ''}
            {showAnswers ? (
              <FiChevronUp className="w-4 h-4 ml-1" />
            ) : (
              <FiChevronDown className="w-4 h-4 ml-1" />
            )}
          </button>
        )}
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <form onSubmit={handleReplySubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Answer
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Share your knowledge or experience..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={!isAuthenticated || isSubmittingReply}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowReplyForm(false);
                  setReplyText('');
                }}
                disabled={isSubmittingReply}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isAuthenticated || isSubmittingReply || !replyText.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmittingReply ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Posting...
                  </>
                ) : (
                  'Post Answer'
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Answers */}
      {showAnswers && question.answers.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FiMessageCircle className="w-4 h-4" />
            Answers ({question.answers.length})
          </h4>
          
          {question.answers.map((answer) => (
            <div key={answer.id} className="pl-4 border-l-2 border-gray-200">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={answer.author.avatar}
                    alt={answer.author.name}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/32x32/6b7280/ffffff?text=U";
                    }}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900 text-sm">
                        {answer.author.name}
                      </span>
                      {answer.author.isExpert && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <FiShield className="w-3 h-3" />
                          Expert
                        </div>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(answer.createdAt)}
                      </span>
                    </div>
                    
                    <p className="text-gray-800 text-sm leading-relaxed mb-3">
                      {answer.answer}
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleAnswerVote(answer.id, !answer.isHelpfulByUser)}
                        disabled={processingVotes.has(`answer-${answer.id}`)}
                        className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full transition-colors ${
                          answer.isHelpfulByUser
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <FiThumbsUp className={`w-3 h-3 ${answer.isHelpfulByUser ? 'fill-current' : ''}`} />
                        Helpful ({answer.helpfulCount})
                      </button>
                      
                      <button
                        onClick={() => handleReport('answer', answer.id)}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                        title="Report inappropriate content"
                      >
                        <FiFlag className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
