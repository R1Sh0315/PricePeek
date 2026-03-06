import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ShoppingCart, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);
        setError('');

        const result = await register(name, email, password);
        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20">
            <div className="w-full max-w-md glass p-8 rounded-2xl animate-fade-in shadow-gray-900/50">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center text-2xl font-bold gradient-text mb-2">
                        <ShoppingCart className="w-8 h-8 mr-2 text-blue-500" />
                        PricePeek
                    </Link>
                    <h2 className="text-2xl font-bold text-white">Create Account</h2>
                    <p className="text-slate-400 mt-2">Join PricePeek and start saving</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center text-red-400">
                        <AlertCircle className="w-5 h-5 mr-3" />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500 focus:outline-none"
                                placeholder="John Doe"
                            />
                            <UserIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500 focus:outline-none"
                                placeholder="name@example.com"
                            />
                            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500 focus:outline-none"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-500 focus:outline-none"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 mt-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
