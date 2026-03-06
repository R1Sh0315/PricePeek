import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, MessageSquare, User as UserIcon, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ReviewSection = ({ productId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const { data } = await axios.get(`/api/reviews/${productId}`);
                setReviews(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [productId, success]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert('Please login to write a review');

        setSubmitting(true);
        setError(null);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/reviews', { productId, rating, comment }, config);
            setSuccess(true);
            setComment('');
            setRating(5);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-16 glass p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-black text-white mb-10 flex items-center">
                <MessageSquare className="w-8 h-8 mr-4 text-blue-500" />
                Community Reviews
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Write a Review */}
                <div className="lg:col-span-5">
                    <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 sticky top-24">
                        <h3 className="text-xl font-bold text-white mb-6">Rate this product</h3>

                        {success && (
                            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center text-green-400 text-sm font-bold animate-bounce">
                                <CheckCircle2 className="w-5 h-5 mr-3" /> Review submitted!
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center text-red-400 text-sm font-bold">
                                <AlertCircle className="w-5 h-5 mr-3" /> {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-3">Rating</label>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setRating(s)}
                                            className={`p-2 rounded-lg transition-all ${rating >= s ? 'text-yellow-400 bg-yellow-400/10' : 'text-slate-600 bg-slate-800'}`}
                                        >
                                            <Star className={`w-6 h-6 ${rating >= s ? 'fill-current' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-3">Your Thoughts</label>
                                <textarea
                                    required
                                    rows="4"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full bg-slate-950 border border-white/10 rounded-xl py-4 px-4 text-white focus:ring-2 focus:ring-blue-500 text-sm focus:outline-none"
                                    placeholder="What did you think of this product?"
                                ></textarea>
                            </div>

                            <button
                                disabled={submitting}
                                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-xl shadow-blue-900/40 disabled:opacity-50 active:scale-95"
                            >
                                {submitting ? 'SUBMITTING...' : 'POST REVIEW'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right: Review List */}
                <div className="lg:col-span-7 space-y-6">
                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            {[1, 2, 3].map(i => <div key={i} className="h-32 bg-slate-900 rounded-2xl w-full" />)}
                        </div>
                    ) : reviews.length === 0 ? (
                        <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-white/5">
                            <Star className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                            <p className="text-slate-500 font-bold">No reviews yet. Be the first!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {reviews.map((r) => (
                                <div key={r._id} className="bg-slate-900/30 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mr-4 border border-white/5 text-blue-400">
                                                <UserIcon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-sm">{r.user.name}</h4>
                                                <p className="text-xs text-slate-500 font-mono">{new Date(r.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex text-yellow-500">
                                            {[...Array(r.rating)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-current" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed italic">
                                        "{r.comment}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;
