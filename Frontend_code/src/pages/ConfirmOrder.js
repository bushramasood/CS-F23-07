import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import SummaryApi from '../common';
import Context from '../context';
import displayPKRCurrency from '../helpers/displayCurrency';

const ConfirmOrderPage = () => {
    const { state } = useLocation();
    const shippingInfo = state?.shippingInfo || {};
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(Context);
    const navigate = useNavigate();

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: 'GET',
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
        });
        const responseData = await response.json();
        if (responseData.success) {
            setData(responseData.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateQuantity = async (id, newQty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: 'POST',
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ _id: id, quantity: newQty }),
        });
        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
        }
    };

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: 'POST',
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ _id: id }),
        });
        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
            context.fetchUserAddToCart();
        }
    };

    const proceedToPayment = async () => {
        const orderItems = data.map(item => ({
            product: item.productId._id,
            quantity: item.quantity,
            price: item.productId.sellingPrice
        }));
        const orderDetails = {
            orderItems,
            shippingInfo,
            totalPrice: data.reduce((acc, item) => acc + item.quantity * item.productId.sellingPrice, 0)
        };

        try {
            // Create order
            const response = await fetch(SummaryApi.createOrder.url, {
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(orderDetails)
            });

            const responseData = await response.json();

            if (responseData.success) {
                // Clear cart
                const clearCartResponse = await fetch(SummaryApi.clearCart.url, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'content-type': 'application/json' }
                });

                const clearCartData = await clearCartResponse.json();

                if (clearCartData.success) {
                    // Update cart state in context
                    context.fetchUserAddToCart();
                    // Navigate to payment page
                    navigate('/payment', { state: { orderDetails: responseData.data } });
                } else {
                    console.error(clearCartData.message);
                }
            } else {
                console.error(responseData.message); // Handle errors more gracefully in production
            }
        } catch (error) {
            console.error('Error processing order:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="text-center text-lg my-3">
                {data.length === 0 && !loading && <p className="bg-white py-5">No Data</p>}
            </div>
            <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
                <div className="w-full max-w-3xl">
                    {loading ? (
                        <div className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"></div>
                    ) : (
                        data.map((product) => (
                            <div key={product._id} className="w-full bg-white my-2 border border-slate-300 rounded">
                                <div className="grid grid-cols-[128px,1fr]">
                                    <div className="w-32 h-32 bg-slate-200">
                                        <img src={product.productId?.productImage[0]} alt={product.productId?.productName} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="px-4 py-2 relative">
                                        <MdDelete className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer" onClick={() => deleteCartProduct(product._id)} />
                                        <h2 className="text-lg lg:text-xl">{product.productId?.productName}</h2>
                                        <p>{product.productId.category}</p>
                                        <div className="flex items-center justify-between">
                                            
                                            <p className="text-red-600">{displayPKRCurrency(product.productId?.sellingPrice * product.quantity)}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => updateQuantity(product._id, product.quantity - 1)}>-</button>
                                            <span>{product.quantity}</span>
                                            <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => updateQuantity(product._id, product.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                                {/* Display custom order text */}
                                {product?.customOrderText && (
                                    <div className='bg-white p-2 mt-2'>
                                        <p className='text-black'>Additional Information Provided:</p>
                                        <p className='text-slate-500'>{product?.customOrderText}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="w-full max-w-sm">
                    <div className="bg-white p-4">
                        <h2 className='text-white bg-red-600 px-4 py-1'>Shipping Information</h2>
                        <p><strong>Name:</strong> {shippingInfo.name}</p>
                        <p><strong>Address:</strong> {shippingInfo.address}</p>
                        <p><strong>City:</strong> {shippingInfo.city}</p>
                        <p><strong>Country:</strong> {shippingInfo.country}</p>
                        <p><strong>Postal Code:</strong> {shippingInfo.postalCode}</p>
                        <p><strong>Phone Number:</strong> {shippingInfo.phoneNo}</p>
                        <p><strong>Payment Method:</strong> {shippingInfo.paymentMethod}</p>
                    </div>
                </div>

                <div className="w-full max-w-sm">
                    <div className="bg-white p-4">
                        <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                        <div className="flex justify-between">
                            <p>Quantity:</p>
                            <p>{data.reduce((acc, item) => acc + item.quantity, 0)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total Price:</p>
                            <p>{displayPKRCurrency(data.reduce((acc, item) => acc + item.quantity * (item.productId?.sellingPrice || 0), 0))}</p>
                        </div>
                        <button className="bg-goldenrod hover:bg-goldenrod-darker text-white p-2 w-full" onClick={proceedToPayment}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmOrderPage;