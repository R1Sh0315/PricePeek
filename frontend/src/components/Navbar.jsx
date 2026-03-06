import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, LogOut, Menu, X, ChevronDown, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [keyword, setKeyword] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/search?keyword=${keyword}`);
            setIsOpen(false);
        }
    };

    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold gradient-text tracking-tight flex items-center">
                            <ShoppingCart className="w-8 h-8 mr-2 text-blue-500" />
                            PricePeek
                        </Link>
                    </div>

                    {/* Desktop Search */}
                    <div className="hidden md:flex flex-1 justify-center px-8">
                        <form onSubmit={handleSearch} className="relative w-full max-w-lg">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
                            />
                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                        </form>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/compare" className="text-slate-300 hover:text-white transition-colors">Compare</Link>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span>{user.name.split(' ')[0]}</span>
                                    <ChevronDown className="w-4 h-4" />
                                </button>

                                {showUserMenu && (
                                    <div className="absolute right-0 mt-2 w-56 glass rounded-2xl overflow-hidden shadow-2xl animate-fade-in py-2 border border-white/10">
                                        <div className="px-4 py-3 border-b border-white/5 mb-2">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Logged in as</p>
                                            <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                        </div>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-all">My Profile</Link>
                                        {user.role === 'admin' && (
                                            <Link to="/dashboard" className="block px-4 py-2 text-sm text-blue-400 font-bold hover:bg-white/5 transition-all flex items-center">
                                                <LayoutDashboard className="w-4 h-4 mr-2" /> Admin Dashboard
                                            </Link>
                                        )}
                                        <div className="border-t border-white/5 mt-2 pt-2">
                                            <button
                                                onClick={() => { logout(); setShowUserMenu(false); navigate('/'); }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center transition-all"
                                            >
                                                <LogOut className="w-4 h-4 mr-2" /> Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-slate-300 hover:text-white font-medium">Login</Link>
                                <Link to="/signup" className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-white/5 animate-fade-in">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <form onSubmit={handleSearch} className="px-3 mb-3 relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 text-slate-100 focus:outline-none"
                            />
                            <Search className="absolute left-6 top-2.5 h-5 w-5 text-slate-400" />
                        </form>
                        <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Home</Link>
                        <Link to="/compare" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Compare</Link>
                        {user ? (
                            <>
                                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300">My Profile</Link>
                                <button
                                    onClick={() => { logout(); setIsOpen(false); navigate('/'); }}
                                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300">Login</Link>
                                <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-blue-400">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
