import React from 'react';
import { ShoppingCart, Mail, Globe, Twitter, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass border-t border-white/10 mt-20 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Logo and Info */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-bold gradient-text flex items-center mb-4">
                            <ShoppingCart className="w-6 h-6 mr-2 text-blue-500" />
                            PricePeek
                        </h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            PricePeek is India's premier destination for real-time price comparisons across top retailers like Amazon, Flipkart, and Croma. We save Indian shoppers both time and money.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
                            <li><a href="/search" className="hover:text-blue-400 transition-colors">Products</a></li>
                            <li><a href="/compare" className="hover:text-blue-400 transition-colors">Price Comparison</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 glass-hover rounded-full text-slate-400 hover:text-blue-400">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 glass-hover rounded-full text-slate-400 hover:text-white">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 glass-hover rounded-full text-slate-400 hover:text-red-400">
                                <Mail className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 glass-hover rounded-full text-slate-400 hover:text-indigo-400">
                                <Globe className="w-5 h-5" />
                            </a>
                        </div>
                        <p className="mt-4 text-slate-400 text-xs">
                            &copy; {new Date().getFullYear()} PricePeek. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
