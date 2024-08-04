import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        totalOutOfStockProducts: 0,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const productResponse = await fetch(SummaryApi.productCount.url, {
                    method: SummaryApi.productCount.method,
                    credentials: 'include'
                });
                const productData = await productResponse.json();

                const userResponse = await fetch(SummaryApi.userCount.url, {
                    method: SummaryApi.userCount.method,
                    credentials: 'include'
                });
                const userData = await userResponse.json();

                const outOfStockResponse = await fetch(SummaryApi.outOfStockProductCount.url, {
                    method: SummaryApi.outOfStockProductCount.method,
                    credentials: 'include'
                });
                const outOfStockData = await outOfStockResponse.json();

                console.log("Product Data:", productData); // Debug log
                console.log("User Data:", userData); // Debug log
                console.log("Out of Stock Data:", outOfStockData); // Debug log

                setStats({
                    totalProducts: productData.data,
                    totalUsers: userData.data,
                    totalOutOfStockProducts: outOfStockData.data,
                });
            } catch (error) {
                console.error("Failed to fetch stats:", error);
                setError(error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
        {error && <div className="text-red-500">Failed to load statistics. Please try again later.</div>}
        <div className='flex gap-4'>
            <div className='relative p-4 bg-red-500 rounded shadow w-1/3 h-48 flex flex-col justify-center items-center' style={{ borderColor: '#1F2937' }}>
                <h2 className='text-lg text-white text-center'>Total Products: <span className='text-xl font-semibold'>{stats.totalProducts}</span></h2>
                <button 
                    className='mt-4 text-sm font-semibold text-black' 
                    onClick={() => navigate('/admin-panel/all-products')}
                >
                    View Details
                </button>
            </div>

            <div className='relative p-4 bg-goldenrod rounded shadow w-1/3 h-48 flex flex-col justify-center items-center' style={{ borderColor: '#1F2937' }}>
                <h2 className='text-lg text-white text-center'>Total Users: <span className='text-xl font-semibold'>{stats.totalUsers}</span></h2>
                <button 
                    className='mt-4 text-sm font-semibold text-black' 
                    onClick={() => navigate('/admin-panel/all-users')}
                >
                    View Details
                </button>
            </div>

            <div className='relative p-4 bg-red-500 rounded shadow w-1/3 h-48 flex flex-col justify-center items-center' style={{ borderColor: '#1F2937' }}>
                <h2 className='text-lg text-white text-center'>Total Out of Stock Products: <span className='text-xl font-semibold'>{stats.totalOutOfStockProducts}</span></h2>
            </div>
        </div>
    </div>
    );
};

export default Dashboard;