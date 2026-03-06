import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Tag, Star, ArrowRight } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="glass glass-hover rounded-2xl overflow-hidden flex flex-col h-full animate-fade-in group">
            {/* Product Image */}
            <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden bg-white/5">
                <img
                    src={product.images?.[0] || 'https://via.placeholder.com/300?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                />
                {product.bestPrice && (
                    <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-blue-400/30 tracking-tighter shadow-blue-900/40">
                        BEST DEAL
                    </div>
                )}
            </Link>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">{product.category}</span>
                    <div className="flex items-center text-yellow-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-current mr-1 text-yellow-500" />
                        {product.averageRating || '4.5'}
                    </div>
                </div>

                <Link to={`/product/${product._id}`}>
                    <h3 className="text-lg font-black text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300 leading-tight">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-slate-400 text-xs mb-6 line-clamp-2 flex-grow leading-relaxed">
                    {product.brand && <span className="font-bold text-slate-300 uppercase mr-1">{product.brand}</span>}
                    {product.description}
                </p>

                {/* Pricing & CTA */}
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">Starts at</span>
                        <span className="text-2xl font-black text-white leading-none">
                            {product.bestPrice
                                ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(product.bestPrice)
                                : 'Check Price'}
                        </span>
                        {product.bestStore && (
                            <span className="text-[10px] text-blue-400 font-bold mt-1 uppercase">at {product.bestStore}</span>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Link
                            to={`/product/${product._id}`}
                            title="Compare Prices"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700/50"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        {product.bestPriceUrl && (
                            <a
                                href={product.bestPriceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`Buy on ${product.bestStore}`}
                                className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg active:scale-95"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
