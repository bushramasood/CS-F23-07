import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const UpdateOrderModal = ({ onClose, orderId, currentStatus, callFunc }) => {
    const [status, setStatus] = useState(currentStatus);

    const handleUpdateOrder = async () => {
        try {
            const response = await fetch(SummaryApi.updateOrder.url, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderId, status })
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                toast.success('Order updated successfully');
                callFunc(); // Refresh the list after update
                onClose();
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error updating order:', error);
            toast.error('Failed to update order.');
        }
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded w-1/3'> {/* Increased the width */}
                <h2 className='text-lg mb-4'>Manage Order Status</h2>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700'>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className='flex justify-end'>
                    <button
                        onClick={onClose}
                        className='bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateOrder}
                        className='bg-goldenrod hover:bg-goldenrod-darker text-white px-4 py-2 rounded'
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateOrderModal;