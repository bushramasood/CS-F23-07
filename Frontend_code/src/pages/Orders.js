import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import moment from 'moment';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchData = await fetch(SummaryApi.userOrders.url, {
          method: SummaryApi.userOrders.method,
          credentials: 'include'
        });

        const dataResponse = await fetchData.json();
        console.log('Fetched orders data:', dataResponse);

        if (dataResponse.success) {
          setOrders(dataResponse.data);
        } else if (dataResponse.error) {
          toast.error(dataResponse.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders.');
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className='bg-white pb-4'>
      <h1 className='text-2xl font-semibold mb-4'>My Orders</h1>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th className='px-1 py-1'>Order ID</th>
            <th className='px-1 py-1'>Items</th>
            <th className='px-1 py-1'>Total Price</th>
            <th className='px-1 py-1'>Created At</th>
            <th className='px-1 py-1'>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td>{order._id}</td>
              <td>
                {order.orderItems.map((item, index) => (
                  <div key={index}>{item.product.name} ({item.quantity})</div>
                ))}
              </td>
              <td>${order.totalPrice != null && !isNaN(Number(order.totalPrice))
                  ? parseFloat(order.totalPrice).toFixed(2)
                  : 'N/A'}</td>
              <td>{order.createdAt ? moment(order.createdAt).format('LL') : 'Unknown'}</td>
              <td>{order.status || 'No status'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;