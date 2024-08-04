import React, { useEffect, useState } from 'react';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import SummaryApi from '../common'; // Ensure this path is correct
import UploadProduct from '../components/UploadProduct';
import AdminEditProduct from '../components/AdminEditProduct';
import { toast } from 'react-toastify';

const AllProducts = () => {
    const [openUploadProduct, setOpenUploadProduct] = useState(false);
    const [allProduct, setAllProduct] = useState([]);
    const [editProduct, setEditProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchAllProduct = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allProduct.url, {
                method: SummaryApi.allProduct.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllProduct(dataResponse.data);
            } else if (dataResponse.error) {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error('Failed to fetch products.');
        }
    };

    useEffect(() => {
        fetchAllProduct();
    }, []);

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setEditProduct(true);
    };

    const handleDeleteProduct = async (product) => {
        if (window.confirm(`Are you sure you want to delete ${product.productName}?`)) {
            try {
                const response = await fetch(`${SummaryApi.deleteProduct.url}/${product._id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                const dataResponse = await response.json();
                if (dataResponse.success) {
                    toast.success('Product deleted successfully');
                    fetchAllProduct();
                } else {
                    toast.error(dataResponse.message);
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                toast.error('Failed to delete product.');
            }
        }
    };

    return (
        <div className='bg-white pb-4'>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Products</h2>
                <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
            </div>

            <div className='bg-white mt-4'>
                <table className='w-full userTable'>
                    <thead>
                        <tr className='bg-black text-white'>
                            <th className='px-1 py-1'>Product Id</th>
                            <th className='px-1 py-1'>Product Name</th>
                            <th className='px-1 py-1'>Category</th>
                            <th className='px-1 py-1'>Price</th>
                            <th className='px-1 py-1'>Selling Price</th>
                            <th className='px-1 py-1'>Stock</th>
                            <th className='px-1 py-1'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {allProduct.map((product, index) => (
                            <tr key={product._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className='px-3 py-2'>{product._id}</td>
                                <td className='px-3 py-2'>{product.productName}</td>
                                <td className='px-3 py-2'>{product.category}</td>
                                <td className='px-3 py-2'>{product.price}</td>
                                <td className='px-3 py-2'>{product.sellingPrice}</td>
                                <td className='px-3 py-2'>{product.stock}</td>
                                <td className='px-3 py-2 flex justify-center'>
                                    <button className='bg-yellow-100 p-2 rounded-full cursor-pointer hover:bg-goldenrod-darker hover:text-white mr-2' onClick={() => handleEditProduct(product)}>
                                        <MdModeEdit />
                                    </button>
                                    <button className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white' onClick={() => handleDeleteProduct(product)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editProduct && <AdminEditProduct productData={selectedProduct} onClose={() => setEditProduct(false)} fetchdata={fetchAllProduct} />}
            {openUploadProduct && <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAllProduct} />}
        </div>
    );
};

export default AllProducts;