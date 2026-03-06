import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchResults from './pages/SearchResults';
import ProductDetails from './pages/ProductDetails';
import AdminDashboard from './pages/AdminDashboard';

import { ShoppingCart, Search, ArrowRight, ShieldCheck, Zap, BarChart3, TrendingDown } from 'lucide-react';
import ProductCard from './components/ProductCard';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axios.get('/api/products?limit=4');
        const productList = Array.isArray(data) ? data : data.products;
        setFeatured((productList || []).slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>PricePeek India | Best Price Comparison & Price Tracker</title>
        <meta name="description" content="Compare prices across Amazon India, Flipkart, Croma, and more. Track price history and set alerts for the best deals in India." />
      </Helmet>
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px]" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-blue-400 text-sm font-bold mb-6 animate-fade-in shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            🚀 PricePeek v1.0 is now live in India
          </div>
          <h1 className="text-6xl md:text-8xl font-black gradient-text mb-8 tracking-tighter animate-fade-in leading-[1.1]">
            Stop Overpaying.<br />Start Peekin'.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in">
            Peek across thousands of Indian e-commerce stores instantly. Compare prices on Amazon, Flipkart, Croma and more. Track history and grab the absolute best deals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in">
            <Link to="/search" className="group px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-900/40 flex items-center">
              Explore Best Deals
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/search" className="px-8 py-4 glass border border-white/10 text-white font-black rounded-2xl hover:bg-white/5 transition-all">
              See Live Prices
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Features Section */}
      <section className="py-20 border-y border-white/5 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: ShieldCheck, title: "Verified Links", desc: "Every affiliate link is hand-verified for your safety and trust." },
            { icon: BarChart3, title: "Price Tracking", desc: "Watch how prices fluctuate over time with our deep history engine." },
            { icon: Zap, title: "Real-time Peek", desc: "Ultra-fast comparison engine that pulls data from top Indian retailers." }
          ].map((f, i) => (
            <div key={i} className="text-center group">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <f.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black text-white flex items-center">
            <TrendingDown className="w-10 h-10 mr-4 text-blue-500" />
            Trending Deals
          </h2>
          <Link to="/search" className="text-blue-400 font-bold hover:text-blue-300 transition-colors flex items-center group">
            View all Catalog
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
                {/* Other routes will be added here */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
