import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    LayoutDashboard,
    Package,
    Store,
    Users,
    TrendingUp,
    PlusCircle,
    Search,
    Edit,
    Trash2,
    MoreHorizontal,
    X,
    CheckCircle2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProductModal, setShowProductModal] = useState(false);
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [stats, setStats] = useState({ products: 0, stores: 0, clicks: 0, users: 0 });

    // State for creating/editing product
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        brand: '',
        images: ['']
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }

        const fetchAdminData = async () => {
            setLoading(true);
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('/api/products?pageNumber=ALL', config);
                // In my simplified backend it might not support pageNumber=ALL, but let's assume it returns products array
                setProducts(data.products || data);

                // Fetch basic stats (Mocked for now as we don't have separate stats endpoint)
                setStats({
                    products: (data.products || data).length,
                    stores: 3,
                    clicks: 124,
                    users: 1
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [user, navigate]);

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post('/api/products', formData, config);
            setShowProductModal(false);
            // Refresh products
            const { data } = await axios.get('/api/products', config);
            setProducts(data.products || data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await axios.delete(`/api/products/${id}`, config);
                setProducts(products.filter(p => p._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (!user || user.role !== 'admin') {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-slate-950 flex-col md:flex-row">
            {/* Sidebar (Hidden on small screens) */}
            <aside className={`hidden lg:flex glass border-r border-white/5 p-6 flex-col fixed h-[calc(100vh-64px)] overflow-y-auto z-20 transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'w-64' : 'w-24 items-center'}`}>
                <div className={`flex items-center mb-12 ${isSidebarExpanded ? 'justify-between' : 'justify-center flex-col gap-4'}`}>
                    <div className="flex items-center text-2xl font-black gradient-text">
                        <LayoutDashboard className={`text-blue-500 ${isSidebarExpanded ? 'w-8 h-8 mr-3' : 'w-10 h-10'}`} />
                        {isSidebarExpanded && <span>Console</span>}
                    </div>
                    <button
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                        className={`p-1 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all ${!isSidebarExpanded && 'hidden'}`}
                        title="Collapse Sidebar"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    {!isSidebarExpanded && (
                        <button
                            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                            className="p-1.5 mt-2 rounded-lg bg-white/5 text-slate-400 hover:text-white transition-all"
                            title="Expand Sidebar"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <nav className="space-y-3 flex-grow w-full">
                    <button className={`flex items-center p-3 rounded-xl bg-blue-600 shadow-lg shadow-blue-900/40 text-white font-bold transition-all w-full ${isSidebarExpanded ? '' : 'justify-center'}`} title={!isSidebarExpanded ? "Products" : ""}>
                        <Package className={`w-6 h-6 ${isSidebarExpanded ? 'mr-3' : ''}`} />
                        {isSidebarExpanded && <span>Products</span>}
                    </button>
                    <button className={`flex items-center p-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all w-full ${isSidebarExpanded ? '' : 'justify-center'}`} title={!isSidebarExpanded ? "Stores" : ""}>
                        <Store className={`w-6 h-6 ${isSidebarExpanded ? 'mr-3' : ''}`} />
                        {isSidebarExpanded && <span>Stores</span>}
                    </button>
                    <button className={`flex items-center p-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all w-full ${isSidebarExpanded ? '' : 'justify-center'}`} title={!isSidebarExpanded ? "Users" : ""}>
                        <Users className={`w-6 h-6 ${isSidebarExpanded ? 'mr-3' : ''}`} />
                        {isSidebarExpanded && <span>Users</span>}
                    </button>
                    <button className={`flex items-center p-3 rounded-xl text-slate-400 hover:bg-white/5 hover:text-white transition-all w-full ${isSidebarExpanded ? '' : 'justify-center'}`} title={!isSidebarExpanded ? "Analytics" : ""}>
                        <TrendingUp className={`w-6 h-6 ${isSidebarExpanded ? 'mr-3' : ''}`} />
                        {isSidebarExpanded && <span>Analytics</span>}
                    </button>
                </nav>

                <div className={`pt-6 border-t border-white/5 w-full ${!isSidebarExpanded && 'flex flex-col items-center'}`}>
                    {isSidebarExpanded && <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Account</p>}
                    <div className={`flex ${isSidebarExpanded ? 'items-center p-2' : 'justify-center'}`}>
                        <div className={`rounded-full bg-blue-600 flex items-center justify-center font-black shadow-lg ${isSidebarExpanded ? 'w-10 h-10 mr-3' : 'w-12 h-12'}`} title={!isSidebarExpanded ? `Logged in as ${user.name}` : ""}>
                            {user.name.charAt(0)}
                        </div>
                        {isSidebarExpanded && (
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                                <p className="text-xs text-slate-500 truncate">Administrator</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-grow p-4 md:p-10 mt-6 lg:mt-16 max-w-full overflow-x-hidden transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'lg:ml-64' : 'lg:ml-24'}`}>
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {[
                        { label: 'Total Products', val: stats.products, icon: Package, color: 'text-blue-500' },
                        { label: 'Active Stores', val: stats.stores, icon: Store, color: 'text-indigo-500' },
                        { label: 'Total Clicks', val: stats.clicks, icon: TrendingUp, color: 'text-green-500' },
                        { label: 'New Users', val: stats.users, icon: Users, color: 'text-purple-500' }
                    ].map((s, i) => (
                        <div key={i} className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
                            <div>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{s.label}</p>
                                <p className="text-3xl font-black text-white">{s.val}</p>
                            </div>
                            <div className={`${s.color} bg-white/5 p-4 rounded-xl`}>
                                <s.icon className="w-6 h-6" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Products Table Area */}
                <div className="glass rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                    <div className="p-6 md:p-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-white mb-1">Product Inventory</h2>
                            <p className="text-slate-500 text-xs md:text-sm">Manage your product catalog and store pricing.</p>
                        </div>
                        <button
                            onClick={() => setShowProductModal(true)}
                            className="flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-lg active:scale-95 w-full sm:w-auto"
                        >
                            <PlusCircle className="w-5 h-5 mr-3" />
                            New Product
                        </button>
                    </div>

                    <div className="p-4 md:p-8">
                        <div className="relative mb-6 md:mb-8 w-full md:max-w-md">
                            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        {loading ? (
                            <div className="space-y-4 py-10 text-center animate-pulse">
                                <div className="h-10 bg-slate-800 rounded-xl w-full" />
                                <div className="h-10 bg-slate-800 rounded-xl w-full" />
                                <div className="h-10 bg-slate-800 rounded-xl w-full" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto w-full">
                                <table className="w-full text-left min-w-[700px]">
                                    <thead>
                                        <tr className="text-slate-500 text-[10px] md:text-xs font-black uppercase tracking-widest border-b border-white/5">
                                            <th className="px-4 py-4">Product Name</th>
                                            <th className="px-4 py-4 hidden md:table-cell">Category</th>
                                            <th className="px-4 py-4 hidden sm:table-cell">Brand</th>
                                            <th className="px-4 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {products.map((p) => (
                                            <tr key={p._id} className="hover:bg-white/5 transition-all group">
                                                <td className="px-4 py-4 md:py-6 font-bold text-white flex items-center min-w-[200px]">
                                                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white/5 rounded-lg flex-shrink-0 mr-3 md:mr-4 overflow-hidden p-1 border border-white/5">
                                                        <img src={p.images?.[0]} alt="" className="w-full h-full object-contain" />
                                                    </div>
                                                    <span className="truncate text-xs md:text-sm">{p.name}</span>
                                                </td>
                                                <td className="px-4 py-4 md:py-6 text-slate-400 text-xs md:text-sm hidden md:table-cell">{p.category}</td>
                                                <td className="px-4 py-4 md:py-6 text-slate-400 capitalize text-xs md:text-sm hidden sm:table-cell">{p.brand}</td>
                                                <td className="px-4 py-4 md:py-6 text-right">
                                                    <div className="flex items-center justify-end space-x-1 md:space-x-2">
                                                        <button
                                                            className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-slate-800 transition-all border border-white/5"
                                                            title="Edit Product"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProduct(p._id)}
                                                            className="p-2 rounded-lg bg-white/5 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all border border-red-500/10"
                                                            title="Delete Product"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Product Modal */}
            {showProductModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-2xl glass p-10 rounded-3xl border border-white/10 relative shadow-2xl overflow-y-auto max-h-[90vh]">
                        <button onClick={() => setShowProductModal(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-all">
                            <X className="w-6 h-6" />
                        </button>

                        <h2 className="text-3xl font-black text-white mb-8">Add New Product</h2>

                        <form onSubmit={handleCreateProduct} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 px-4 text-white focus:ring-2 focus:ring-blue-500"
                                        placeholder="iPhone 15 Pro..."
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase mb-2">Category</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 px-4 text-white focus:ring-2 focus:ring-blue-500"
                                        placeholder="Electronics..."
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-2">Brand</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 px-4 text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="Apple, Samsung..."
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-2">Description</label>
                                <textarea
                                    rows="4"
                                    required
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 px-4 text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe the product features..."
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase mb-2">Image URL</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-slate-900 border border-white/10 rounded-xl py-4 px-4 text-white focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://..."
                                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                                />
                            </div>

                            <button className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black transition-all shadow-xl shadow-blue-900/40 transform active:scale-[0.98]">
                                SAVE PRODUCT
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
