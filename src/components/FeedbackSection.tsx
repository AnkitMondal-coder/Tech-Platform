import React, { useState, useEffect } from 'react';
import { Star, MessageCircle, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getCurrentUser } from '../utils/auth';

interface Feedback {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

const FeedbackSection: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [newFeedback, setNewFeedback] = useState({ rating: 5, comment: '' });
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from('user_feedback')
        .select(`
          id,
          rating,
          comment,
          created_at,
          users!inner(name)
        `)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      const formattedFeedbacks = data.map(item => ({
        id: item.id,
        user_name: item.users.name,
        rating: item.rating,
        comment: item.comment,
        created_at: item.created_at
      }));

      setFeedbacks(formattedFeedbacks);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  const submitFeedback = async () => {
    if (!currentUser || !newFeedback.comment.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_feedback')
        .insert([
          {
            user_id: currentUser.id,
            rating: newFeedback.rating,
            comment: newFeedback.comment.trim()
          }
        ]);

      if (error) throw error;

      setNewFeedback({ rating: 5, comment: '' });
      setShowForm(false);
      fetchFeedbacks();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
          />
        ))}
      </div>
    );
  };

  const averageRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : '0.0';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">What Our Community Says</h3>
          <div className="flex items-center justify-center mb-4">
            {renderStars(Math.round(parseFloat(averageRating)))}
            <span className="ml-3 text-2xl font-bold text-gray-900">{averageRating}</span>
            <span className="ml-2 text-gray-600">({feedbacks.length} reviews)</span>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real feedback from people who have used our platform to make a difference
          </p>
        </div>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {feedback.user_name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{feedback.user_name}</h4>
                  <div className="flex items-center">
                    {renderStars(feedback.rating)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">"{feedback.comment}"</p>
              <p className="text-sm text-gray-400">
                {new Date(feedback.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Add Feedback Button */}
        {currentUser && (
          <div className="text-center">
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center mx-auto"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Share Your Experience
              </button>
            ) : (
              <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Share Your Feedback</h4>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  {renderStars(newFeedback.rating, true, (rating) => 
                    setNewFeedback({ ...newFeedback, rating })
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                  <textarea
                    value={newFeedback.comment}
                    onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    placeholder="Tell us about your experience..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitFeedback}
                    disabled={loading || !newFeedback.comment.trim()}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackSection;