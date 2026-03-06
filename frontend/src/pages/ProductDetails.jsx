import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingCart, ExternalLink, Star, ChevronLeft, Calendar, Info, CheckCircle2, AlertTriangle, TrendingDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ReviewSection from '../components/ReviewSection';
import PriceHistoryChart from '../components/PriceHistoryChart';
import { Helmet } from 'react-helmet-async';

const ProductDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [redirecting, setRedirecting] = useState(false);
    const [targetPrice, setTargetPrice] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertLoading, setAlertLoading] = useState(false);

    const formatPrice = (val) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(val);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data } = await axios.get(`/api/products/${id}`);
                setProduct(data);
            } catch (err) {
                setError(err.response?.data?.message || 'Product not found');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAlertSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to set price alerts');
            return;
        }

        setAlertLoading(true);
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/alerts', {
                productId: id,
                targetPrice: Number(targetPrice)
            }, config);
            setAlertSuccess(true);
            setTargetPrice('');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to set alert');
        } finally {
            setAlertLoading(false);
        }
    };

    const handleBuyClick = async (storeId, price) => {
        setRedirecting(true);
        try {
            // 1. Track the click and get the affiliate URL
            const { data } = await axios.post('/api/clicks', {
                productId: id,
                storeId,
                price
            });

            // 2. Redirect the user in a new tab
            if (data.affiliateUrl) {
                window.open(data.affiliateUrl, '_blank', 'noopener,noreferrer');
            }
        } catch (err) {
            console.error('Click tracking failed', err);
            // Fallback: If tracking fails, alert the user but don't block them if we had a direct URL
            // (though in a production app we'd have a secondary way)
        } finally {
            setRedirecting(false);
        }
    };

    if (loading) return (
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-400 font-medium">Fetching details & latest prices...</p>
        </div>
    );

    if (error) return (
        <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-fade-in">
            <AlertTriangle className="w-20 h-20 text-red-500/50 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Product Not Found</h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">{error}</p>
            <Link to="/" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all">Go Back Home</Link>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in mb-20">
            <Helmet>
                <title>{product ? `${product.name} Best Price in India | PricePeek` : 'Product Details | PricePeek'}</title>
                <meta name="description" content={product ? `Compare ${product.name} prices across Amazon, Flipkart, Croma and more. Find the best deals in India on PricePeek.` : 'Compare product prices and find the best deals.'} />
            </Helmet>
            {/* Breadcrumbs */}
            <nav className="flex mb-8 text-sm">
                <Link to="/search" className="text-slate-400 hover:text-white flex items-center transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Products
                </Link>
            </nav>

            {/* Main Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left: Images */}
                <div className="lg:col-span-5">
                    <div className="glass rounded-3xl overflow-hidden p-8 flex items-center justify-center bg-white/5 border border-white/5 relative shadow-2xl">
                        <img
                            src={product.images?.[0] || 'https://via.placeholder.com/500'}
                            alt={product.name}
                            className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl"
                        />
                        <div className="absolute top-6 left-6 flex space-x-2">
                            <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">{product.category}</span>
                            {product.brand && (
                                <span className="glass backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 capitalize">{product.brand}</span>
                            )}
                        </div>
                    </div>

                    {/* Features/Description */}
                    <div className="mt-10 glass p-8 rounded-3xl border border-white/5">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                            <Info className="w-5 h-5 mr-3 text-blue-400" />
                            Product Overview
                        </h3>
                        <p className="text-slate-400 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>
                </div>

                {/* Right: Info & Price Comparison */}
                <div className="lg:col-span-7 flex flex-col space-y-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="flex items-center text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                                <Star className="w-4 h-4 fill-current mr-2" />
                                <span className="font-bold">{product.averageRating}</span>
                            </div>
                            <span className="text-slate-500 text-sm font-medium">({product.numReviews} buyer reviews)</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">{product.name}</h1>

                        {product.bestPrice && (
                            <div className="inline-flex items-center bg-green-500/10 text-green-400 px-4 py-2 rounded-2xl border border-green-500/20 font-bold animate-pulse mb-6">
                                <TrendingDown className="w-5 h-5 mr-2" />
                                Best Price in India: {formatPrice(product.bestPrice)}
                            </div>
                        )}
                    </div>

                    {/* Comparison Table */}
                    <div className="glass rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                        <div className="bg-slate-800/50 px-8 py-5 border-b border-white/5 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                <ShoppingCart className="w-5 h-5 mr-3 text-blue-400" />
                                Compare All Stores
                            </h3>
                            <span className="text-xs text-slate-500 bg-black/40 px-3 py-1 rounded-full border border-white/5 font-mono">LIVE UPDATES</span>
                        </div>

                        <div className="divide-y divide-white/5">
                            {product.stores && product.stores.length > 0 ? (
                                product.stores.map((entry, idx) => (
                                    <div key={idx} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/5 transition-all">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-16 h-16 bg-white/5 rounded-2xl p-3 flex-shrink-0 flex items-center justify-center border border-white/5 shadow-inner">
                                                {entry.store.logo ? (
                                                    <img src={entry.store.logo} alt={entry.store.name} className="w-full h-full object-contain filter invert" />
                                                ) : (
                                                    <span className="font-bold text-slate-500">{entry.store.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{entry.store.name}</h4>
                                                <div className="flex items-center mt-1">
                                                    {entry.isAvailable ? (
                                                        <span className="flex items-center text-green-400 text-xs font-bold uppercase tracking-wider">
                                                            <CheckCircle2 className="w-3 h-3 mr-1" /> In Stock
                                                        </span>
                                                    ) : (
                                                        <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Out of Stock</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-10">
                                            <div className="text-right">
                                                <span className="text-3xl font-black text-white">{formatPrice(entry.price)}</span>
                                                <p className="text-slate-500 text-xs font-bold font-mono">INC. GST</p>
                                            </div>

                                            <button
                                                onClick={() => handleBuyClick(entry.store._id, entry.price)}
                                                disabled={!entry.isAvailable || redirecting}
                                                className={`group flex items-center px-6 py-4 rounded-2xl font-black transition-all ${entry.price === product.bestPrice
                                                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/50'
                                                    } active:scale-95 disabled:opacity-50 disabled:pointer-events-none`}
                                            >
                                                <span>BUY NOW</span>
                                                <ExternalLink className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-12 text-center text-slate-500 italic">No store prices found for this product.</div>
                            )}
                        </div>
                    </div>

                    {/* Price Performance Chart */}
                    <PriceHistoryChart
                        historyData={product.stores.map(s => ({
                            storeName: s.store.name,
                            history: s.history || []
                        }))}
                    />

                    {/* Simple Price History Visualizer */}
                    <div className="glass p-8 rounded-3xl border border-white/5">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                            <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                            Price Insights
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-slate-800/30 p-5 rounded-2xl border border-white/5 flex flex-col justify-center">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Lowest Recorded</span>
                                <span className="text-2xl font-black text-green-400">{formatPrice(product.bestPrice)}</span>
                            </div>
                            <div className="bg-slate-800/30 p-5 rounded-2xl border border-white/5 flex flex-col justify-center">
                                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Set Price Alert</span>
                                {alertSuccess ? (
                                    <div className="text-green-400 text-sm font-bold flex items-center">
                                        <CheckCircle2 className="w-4 h-4 mr-2" /> Alert set successfully!
                                    </div>
                                ) : (
                                    <form onSubmit={handleAlertSubmit} className="flex gap-2 mt-2">
                                        <input
                                            type="number"
                                            required
                                            placeholder="Target Price (₹)"
                                            value={targetPrice}
                                            onChange={(e) => setTargetPrice(e.target.value)}
                                            className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white text-sm w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <button
                                            disabled={alertLoading}
                                            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all"
                                        >
                                            {alertLoading ? '...' : 'Notify Me'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <ReviewSection productId={id} />
        </div>
    );
};

export default ProductDetails;
