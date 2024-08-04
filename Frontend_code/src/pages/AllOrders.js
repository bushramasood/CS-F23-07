import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import SummaryApi from '../common'; // Ensure this path is correct
import { toast } from 'react-toastify';
import moment from 'moment';
import UpdateOrderModal from '../pages/UpdateOrderModal'; // Ensure this path is correct

const AllOrders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [openUpdateOrder, setOpenUpdateOrder] = useState(false);
    const [updateOrderDetails, setUpdateOrderDetails] = useState({
        status: '',
        _id: ''
    });

    const fetchAllOrders = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allOrders.url, {
                method: SummaryApi.allOrders.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();

            if (dataResponse.success) {
                setAllOrders(dataResponse.data);
            } else if (dataResponse.error) {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error fetching all orders:', error);
            toast.error('Failed to fetch all orders.');
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleEditOrder = (order) => {
        setUpdateOrderDetails(order);
        setOpenUpdateOrder(true);
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;

        try {
            const response = await fetch(`${SummaryApi.deleteOrder.url}/${orderId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            const dataResponse = await response.json();

            if (dataResponse.success) {
                toast.success('Order deleted successfully');
                setAllOrders(allOrders.filter(order => order._id !== orderId));
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error('Error deleting order:', error);
            toast.error('Failed to delete order.');
        }
    };

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th className='px-1 py-1'>Sr.</th>
                        <th className='px-1 py-1'>User</th>
                        <th className='px-1 py-1'>Order Id</th>
                        <th className='px-1 py-1'>Items</th>
                        <th className='px-1 py-1'>Amount</th>
                        <th className='px-1 py-1'>Created Date</th>
                        <th className='px-1 py-1'>Status</th>
                        <th className='px-1 py-1'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders.map((order, index) => (
                        <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            <td>{index + 1}</td>
                            <td>{order.user?.email || 'No email'}</td>
                            <td>{order._id}</td>
                            <td>
                                {order.orderItems.map((item, index) => (
                                    <div key={index}>
                                       {item.quantity}
                                    </div>
                                ))}
                            </td>
                            <td>
                                ${order.totalPrice != null && !isNaN(Number(order.totalPrice))
                                    ? parseFloat(order.totalPrice).toFixed(2)
                                    : 'N/A'}
                            </td>
                            <td>{order.createdAt ? moment(order.createdAt).format('LL') : 'Unknown'}</td>
                            <td>{order.status || 'No status'}</td>
                            <td className='flex justify-around'>
                                <button className='bg-yellow-100 p-2 rounded-full cursor-pointer hover:bg-goldenrod-darker hover:text-white' onClick={() => handleEditOrder(order)}>
                                    <FaEdit />
                                </button>
                                <button className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white ml-2' onClick={() => handleDeleteOrder(order._id)}>
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openUpdateOrder && (
                <UpdateOrderModal
                    onClose={() => setOpenUpdateOrder(false)}
                    orderId={updateOrderDetails._id}
                    currentStatus={updateOrderDetails.status}
                    callFunc={fetchAllOrders}
                />
            )}
        </div>
    );
};

export default AllOrders;