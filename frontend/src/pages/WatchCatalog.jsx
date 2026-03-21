import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Watch, ArrowRight, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const WatchCatalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWatches = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch all products with 'Watch' keyword
                const { data } = await axios.get('/api/products?keyword=Watch&limit=50');
                const productList = Array.isArray(data) ? data : data.products;
                setProducts(productList || []);
            } catch (err) {
                setError('Failed to load the watch catalog. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWatches();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <Helmet>
                <title>Premium Wrist Watch Collection | PricePeek India</title>
                <meta name="description" content="Browse our complete collection of premium wrist watches. Compare prices from Amazon, Flipkart, Croma and more." />
            </Helmet>

            {/* Breadcrumbs / Back button */}
            <div className="mb-8">
                <Link to="/" className="inline-flex items-center text-slate-400 hover:text-blue-400 transition-colors group text-sm font-bold">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>
            </div>

            {/* Header Section */}
            <div className="mb-12 relative overflow-hidden glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                 <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
                 
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                    <div>
                        <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 text-xs font-black uppercase tracking-widest mb-4">
                            Premium Collection
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">
                            All Wrist <span className="text-blue-500">Watches</span>
                        </h1>
                        <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
                            Discover the finest timepieces from top Indian retailers. We've aggregated every deal so you can find the perfect watch at the perfect price.
                        </p>
                    </div>
                    <div className="flex -space-x-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-16 h-16 rounded-full border-4 border-slate-900 bg-slate-800 overflow-hidden shadow-xl">
                                <img src={`https://images.unsplash.com/photo-1544117518-30df57809ca7?auto=format&fit=crop&q=80&w=200`} alt="Watch preview" className="w-full h-full object-cover opacity-50" />
                            </div>
                        ))}
                    </div>
                 </div>
            </div>

            {/* Catalog Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="glass rounded-3xl h-96 animate-pulse p-6 border border-white/5">
                            <div className="w-full h-48 bg-slate-800/50 rounded-2xl mb-6" />
                            <div className="h-6 bg-slate-800/50 rounded-full w-3/4 mb-4" />
                            <div className="h-4 bg-slate-800/50 rounded-full w-full mb-2" />
                            <div className="h-4 bg-slate-800/50 rounded-full w-2/3" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="glass p-16 text-center rounded-[2rem] border-red-500/20 shadow-2xl">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4">Connection Issue</h3>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-8 py-3 rounded-2xl bg-white text-slate-900 font-black hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                        Try Again
                    </button>
                </div>
            ) : products.length === 0 ? (
                <div className="glass p-24 text-center rounded-[2rem] border-dashed border-slate-700/50 shadow-inner">
                    <Watch className="w-20 h-20 text-slate-700 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-white mb-4">No Watches Found</h2>
                    <p className="text-slate-400 mb-10 max-w-lg mx-auto">It looks like we're currently out of stock for watches in our local catalog. Please check back later or try searching for something else.</p>
                    <Link to="/" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-900/40">
                        Go Home
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 animate-fade-in">
                    {products.map((product) => (
                        <div key={product._id} className="transform hover:-translate-y-2 transition-transform duration-300">
                           <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}

            {/* Footer Banner */}
            {!loading && products.length > 0 && (
                <div className="mt-20 glass p-12 rounded-[2.5rem] text-center border border-white/10 relative overflow-hidden bg-gradient-to-br from-blue-600/5 to-transparent">
                     <h3 className="text-3xl font-black text-white mb-4">Looking for something else?</h3>
                     <p className="text-slate-400 mb-8 text-lg">Use our global search to find live prices across the entire web.</p>
                     <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/search" className="px-10 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-xl">
                            Open Global Search
                        </Link>
                     </div>
                </div>
            )}
        </div>
    );
};

export default WatchCatalog;
