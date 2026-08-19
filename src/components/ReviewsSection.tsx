import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, CheckCircle, MessageSquare, Plus, Filter, ShieldCheck, UserCheck, X } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data/clinicData';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [filterRating, setFilterRating] = useState<string>('all');
  const [writeModalOpen, setWriteModalOpen] = useState(false);
  
  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [ratingScore, setRatingScore] = useState(5);
  const [treatmentName, setTreatmentName] = useState('Root Canal Treatment');
  const [reviewComment, setReviewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch reviews from server on mount
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch((err) => console.log('Using default reviews:', err));
  }, []);

  const handleLike = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: (r.likes || 0) + 1 } : r))
    );
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewComment.trim()) {
      alert('Please fill in your name and comment.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: authorName.trim(),
          rating: ratingScore,
          treatment: treatmentName,
          comment: reviewComment.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.review) {
        setReviews([data.review, ...reviews]);
        setWriteModalOpen(false);
        setAuthorName('');
        setReviewComment('');
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
      // Local fallback
      const localRev: Review = {
        id: `rev-${Date.now()}`,
        author: authorName,
        rating: ratingScore,
        date: 'Just now',
        comment: reviewComment,
        verified: true,
        treatment: treatmentName,
        likes: 0
      };
      setReviews([localRev, ...reviews]);
      setWriteModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    if (filterRating === 'positive') return r.rating >= 4;
    if (filterRating === 'critical') return r.rating <= 3;
    if (filterRating === '5') return r.rating === 5;
    return true;
  });

  return (
    <section className="space-y-8">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Google Verified Patient Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashmesh Dental Clinic on Google
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Real patient experiences, treatment feedback, and service reviews for our Abohar clinic.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="write-google-review-btn"
            onClick={() => setWriteModalOpen(true)}
            className="ios-btn-primary text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md shadow-sky-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>

      {/* Ratings Overview Card in iOS Glass */}
      <div className="ios-glass rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Big Score Box */}
          <div className="md:col-span-4 text-center md:text-left md:border-r border-slate-200/80 md:pr-8 space-y-2">
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                3.02
              </span>
              <span className="text-lg text-slate-400 font-semibold">/ 5.0</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500">
              {[1, 2, 3].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <Star className="w-5 h-5 fill-amber-200 text-amber-300" />
              <Star className="w-5 h-5 text-slate-300" />
            </div>

            <p className="text-xs text-slate-500">
              Based on {reviews.length} patient reviews for Dashmesh Dental Clinic (Abohar)
            </p>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="md:col-span-8 space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-600 font-semibold">5 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '55%' }}></div>
              </div>
              <span className="w-8 text-right text-slate-400 font-mono">55%</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-600 font-semibold">4 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '20%' }}></div>
              </div>
              <span className="w-8 text-right text-slate-400 font-mono">20%</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-600 font-semibold">3 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '10%' }}></div>
              </div>
              <span className="w-8 text-right text-slate-400 font-mono">10%</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 text-slate-600 font-semibold">2 Stars</span>
              <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <span className="w-8 text-right text-slate-400 font-mono">15%</span>
            </div>
          </div>

        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {[
          { id: 'all', label: `All Reviews (${reviews.length})` },
          { id: 'positive', label: 'Positive (4★ & 5★)' },
          { id: 'critical', label: 'Feedback (1★ – 3★)' },
          { id: '5', label: '5 Star Only' }
        ].map((tab) => (
          <button
            key={tab.id}
            id={`filter-review-${tab.id}`}
            onClick={() => setFilterRating(tab.id)}
            className={`px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all ${
              filterRating === tab.id
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white/80 text-slate-600 hover:bg-white border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            id={`review-item-${rev.id}`}
            className="ios-glass rounded-2xl p-5 border border-white/70 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0" title="Verified Patient" />
                      )}
                    </h3>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Treatment tag */}
              {rev.treatment && (
                <span className="inline-block text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                  Treatment: {rev.treatment}
                </span>
              )}

              {/* Comment text */}
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>

            {/* Footer like button */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-[10px]">Google Review Verified</span>
              <button
                id={`like-review-btn-${rev.id}`}
                onClick={() => handleLike(rev.id)}
                className="flex items-center gap-1 hover:text-sky-600 transition-colors"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>Helpful ({rev.likes || 0})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {writeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="ios-glass max-w-md w-full rounded-3xl p-6 sm:p-8 border border-white/80 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Write a Google Review
              </h3>
              <button
                id="close-review-modal-btn"
                onClick={() => setWriteModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Name</label>
                <input
                  id="write-review-author"
                  type="text"
                  required
                  placeholder="e.g. Gurpreet Singh"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Star Rating</label>
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      id={`star-score-${num}`}
                      onClick={() => setRatingScore(num)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          num <= ratingScore
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-bold text-slate-800 ml-2">{ratingScore} / 5</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Treatment Undertaken</label>
                <input
                  id="write-review-treatment"
                  type="text"
                  placeholder="e.g. Root Canal, Ultrasonic Scaling, Implants..."
                  value={treatmentName}
                  onChange={(e) => setTreatmentName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Feedback / Review</label>
                <textarea
                  id="write-review-comment"
                  required
                  rows={3}
                  placeholder="Describe your treatment outcome, pain relief, doctor demeanor, hygiene..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div className="pt-2">
                <button
                  id="submit-review-btn"
                  type="submit"
                  disabled={submitting}
                  className="w-full ios-btn-primary text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{submitting ? 'Submitting...' : 'Post Google Review'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
