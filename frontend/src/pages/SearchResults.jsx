import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search as SearchIcon, Filter, Layers, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(`/api/products?keyword=${keyword}`);
                setProducts(data.products || data);
            } catch (err) {
                setError('Failed to fetch products. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [keyword]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <Helmet>
                <title>{keyword ? `Search Results for "${keyword}" | PricePeek India` : "All Products | PricePeek India"}</title>
                <meta name="description" content={`Find the best prices for ${keyword || 'products'} across major Indian retailers likes Amazon, Flipkart, and Croma.`} />
            </Helmet>
            {/* Page Header */}
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {keyword ? `Results for "${keyword}"` : "All Products"}
                    </h1>
                    <p className="text-slate-400">Found {products.length} matching products in our database.</p>
                </div>

                {/* Toolbar (Filters Placeholder) */}
                <div className="flex items-center space-x-3">
                    <button className="flex items-center glass p-3 rounded-xl text-slate-300 hover:text-white transition-all text-sm font-medium border border-white/5">
                        <SlidersHorizontal className="w-4 h-4 mr-2 text-blue-400" />
                        Filters
                    </button>
                    <button className="flex items-center glass p-3 rounded-xl text-slate-300 hover:text-white transition-all text-sm font-medium border border-white/5">
                        <ArrowUpDown className="w-4 h-4 mr-2 text-blue-400" />
                        Sort By
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="glass rounded-2xl h-96 animate-pulse p-5">
                            <div className="w-full h-48 bg-slate-800 rounded-xl mb-4" />
                            <div className="w-1/2 h-4 bg-slate-800 rounded mb-2" />
                            <div className="w-full h-8 bg-slate-800 rounded mb-4" />
                            <div className="w-2/3 h-4 bg-slate-800 rounded" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="glass p-12 text-center rounded-2xl border-red-500/20 max-w-2xl mx-auto">
                    <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
                    <p className="text-slate-400 mb-6">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all">Retry</button>
                </div>
            ) : products.length === 0 ? (
                <div className="glass p-20 text-center rounded-2xl border-dashed border-slate-700/50">
                    <SearchIcon className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">No products found</h2>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">We couldn't find any products matching your search. Try different keywords or check out our top categories.</p>
                    <Link to="/" className="text-blue-400 font-bold hover:underline underline-offset-4">Return Home</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
