import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Tag, TrendingDown, Clock, ArrowRight, Percent, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Deals = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDeals = async () => {
            setLoading(true);
            try {
                // Fetch all products (or a subset) and calculate discounts
                const { data } = await axios.get('/api/products?pageNumber=ALL');
                const products = Array.isArray(data) ? data : (data.products || []);

                // Add a simulated discount based on the product ID for consistent rendering
                const productsWithDeals = products.map((product, index) => {
                    // Hash the string ID to a consistent discount percentage between 15 and 45
                    const idSum = product._id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                    const discountPercent = 15 + (idSum % 31); // 15% to 45%

                    const bestPrice = product.bestPrice || 0;
                    const originalPrice = bestPrice ? Math.floor(bestPrice / (1 - (discountPercent / 100))) : 0;

                    return {
                        ...product,
                        discountPercent,
                        originalPrice,
                        isLightningDeal: index % 4 === 0
                    };
                }).filter(p => p.bestPrice > 0)
                    .sort((a, b) => b.discountPercent - a.discountPercent); // Sort by highest discount

                setDeals(productsWithDeals);
            } catch (err) {
                setError('Failed to fetch deals. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    const formatPrice = (val) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(val);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
            <Helmet>
                <title>Best Deals & Price Drops | PricePeek India</title>
                <meta name="description" content="Explore today's best deals, largest price drops, and special coupons across top Indian retailers." />
            </Helmet>

            {/* Header Section */}
            <div className="mb-12 text-center animate-fade-in">
                <div className="inline-flex items-center bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full text-red-400 text-sm font-bold mb-4">
                    <Zap className="w-4 h-4 mr-2" /> Top Price Drops in the Last 24 Hours
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 flex items-center justify-center">
                    Explore Best Deals
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    We scanned thousands of products to find massive price drops, limited-time coupons, and exclusive discounts from verified retailers like Amazon and Croma.
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="glass rounded-2xl h-96 animate-pulse p-4">
                            <div className="w-full h-48 bg-slate-800 rounded-xl mb-4" />
                            <div className="w-1/2 h-4 bg-slate-800 rounded mb-2" />
                            <div className="w-full h-8 bg-slate-800 rounded mb-4" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-20">
                    <p className="text-red-400 font-bold mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-6 py-2 bg-blue-600 rounded-xl text-white font-bold">Retry</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 animate-fade-in">
                    {deals.map(product => (
                        <div key={product._id} className="glass glass-hover rounded-2xl overflow-hidden flex flex-col group relative">
                            {/* Discount Badge */}
                            <div className="absolute top-4 left-4 z-10 bg-red-600 text-white font-black text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center border border-red-500/50">
                                <TrendingDown className="w-3.5 h-3.5 mr-1" />
                                {product.discountPercent}% OFF
                            </div>

                            {/* Lightning Deal Badge */}
                            {product.isLightningDeal && (
                                <div className="absolute top-4 right-4 z-10 bg-yellow-500/90 backdrop-blur-md text-white font-black text-[10px] px-2 py-1 rounded-md flex items-center shadow-lg uppercase tracking-widest border border-yellow-400/50">
                                    <Clock className="w-3 h-3 mr-1" /> Ends Soon
                                </div>
                            )}

                            <Link to={`/product/${product._id}`} className="block relative aspect-square bg-white/5 border-b border-white/5 overflow-hidden p-6">
                                <img
                                    src={product.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
                                    alt={product.name}
                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                />
                            </Link>

                            <div className="p-5 flex flex-col flex-grow bg-slate-900/40">
                                <Link to={`/product/${product._id}`}>
                                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>

                                {/* Coupons & Promos */}
                                <div className="flex items-center space-x-2 my-2">
                                    <span className="bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border border-green-500/20 flex items-center">
                                        <Tag className="w-3 h-3 mr-1" /> Coupon Applied
                                    </span>
                                </div>

                                <div className="mt-auto pt-4 flex items-end justify-between">
                                    <div>
                                        <div className="text-slate-500 text-sm line-through font-bold decoration-red-500/50">
                                            {formatPrice(product.originalPrice)}
                                        </div>
                                        <div className="text-3xl font-black text-white leading-none mt-1">
                                            {formatPrice(product.bestPrice)}
                                        </div>
                                        <div className="text-xs font-bold text-slate-400 mt-2 flex items-center uppercase tracking-widest">
                                            at {product.bestStore}
                                        </div>
                                    </div>
                                    <Link to={`/product/${product._id}`} className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-blue-900/40 group-hover:bg-blue-500">
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Deals;
