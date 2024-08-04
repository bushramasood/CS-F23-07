import React, { useEffect, useState } from 'react';
import VendorUploadProduct from '../components/VendorUploadProduct ';
import SummaryApi from '../common';
import { MdModeEdit, MdDelete } from "react-icons/md";
import VendorEditProduct from '../components/VendorEditProduct ';
import { toast } from 'react-toastify';

const VendorProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchProducts = async () => {
        const response = await fetch(SummaryApi.vendorProduct.url, { credentials: 'include' });
        const dataResponse = await response.json();
        setProducts(dataResponse?.data || []);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setEditProduct(true);
    };

    const handleDeleteProduct = async (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.productName}?`)) {
            const response = await fetch(`${SummaryApi.vendorDeleteProduct.url}/${product._id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const dataResponse = await response.json();
            if (dataResponse.success) {
                toast.success('Product deleted successfully');
                fetchProducts();
            } else {
                toast.error(dataResponse.message || 'Error deleting product');
            }
        }
    };

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>Your Products</h2>
                <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
            </div>

            <div className='bg-white mt-4'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='px-4 py-2'>Product Name</th>
                            <th className='px-4 py-2'>Category</th>
                            <th className='px-4 py-2'>Price</th>
                            <th className='px-4 py-2'>Selling Price</th>
                            <th className='px-4 py-2'>Stock</th>
                            <th className='px-4 py-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className='px-4 py-2'>{product.productName}</td>
                                <td className='px-4 py-2'>{product.category}</td>
                                <td className='px-4 py-2'>{product.price}</td>
                                <td className='px-4 py-2'>{product.sellingPrice}</td>
                                <td className='px-4 py-2'>{product.stock}</td>
                                <td className='px-4 py-2'>
                                    <button className='bg-yellow-500 text-white py-1 px-3 mr-2 rounded-full hover:bg-goldenrod-darker' onClick={() => handleEditProduct(product)}>
                                        <MdModeEdit />
                                    </button>
                                    <button className='bg-red-500 text-white py-1 px-3 rounded-full hover:bg-red-600' onClick={() => handleDeleteProduct(product)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editProduct && <VendorEditProduct productData={selectedProduct} onClose={() => setEditProduct(false)} fetchData={fetchProducts} />}
            {openUploadProduct && <VendorUploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchProducts} />}
        </div>
    );
};

export default VendorProducts;
