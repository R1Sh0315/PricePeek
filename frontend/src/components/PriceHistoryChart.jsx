import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const PriceHistoryChart = ({ historyData }) => {
    // If there's no data, don't render
    if (!historyData || historyData.length === 0) return null;

    // Format data for Recharts
    // Input: [{ storeName: 'Amazon', history: [{ price, date }] }]
    // Output: [{ date: '2024-03-01', Amazon: 1200, Flipkart: 1100 }]

    const allDates = new Set();
    const storeMap = {};

    historyData.forEach(store => {
        storeMap[store.storeName] = store.history;
        store.history.forEach(point => {
            allDates.add(new Date(point.date).toLocaleDateString());
        });
    });

    const sortedDates = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));

    const chartData = sortedDates.map(date => {
        const entry = { date };
        historyData.forEach(store => {
            const match = store.history.find(p => new Date(p.date).toLocaleDateString() === date);
            if (match) entry[store.storeName] = match.price;
        });
        return entry;
    });

    // Pick colors for different stores
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
        <div className="w-full h-80 mt-6 glass p-6 rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
            <h3 className="text-white font-bold mb-4 flex items-center">
                <div className="w-2 h-6 bg-blue-600 rounded-full mr-3" />
                Price Performance (INR)
            </h3>
            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="#94a3b8"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                        width={80}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#0f172a',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)',
                            color: 'white'
                        }}
                        labelStyle={{ color: '#94a3b8', fontWeight: 'bold', marginBottom: '4px' }}
                        formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }} />
                    {historyData.map((store, index) => (
                        <Line
                            key={store.storeName}
                            type="monotone"
                            dataKey={store.storeName}
                            stroke={colors[index % colors.length]}
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            animationDuration={1500}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceHistoryChart;
