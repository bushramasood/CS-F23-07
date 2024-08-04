import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common'; // Adjust the path as per your file structure

const Payment = () => {
    const navigate = useNavigate();

    const continueShoppingHandler = () => {
        navigate('/'); // Navigate to the shopping page or homepage as appropriate
    };

    return (
        <Fragment>
            <section id='success-message' className='bg-green-100 min-h-screen flex items-center justify-center'>
                <div className='bg-white p-5 w-full max-w-md mx-auto rounded-lg shadow-md'>
                    <h1 className='text-center text-red-500 text-xl font-semibold m-5'>Your order has been placed successfully!</h1>
                    <p className='text-center m-5'>Thank you for your shopping from LocalOrgano.</p>
                    <button className='bg-goldenrod hover:bg-goldenrod-darker text-white px-6 py-2 rounded-full hover:scale-110 transition-all mx-auto block mt-6'
                            onClick={continueShoppingHandler}>
                        Continue Shopping
                    </button>
                </div>
            </section>
        </Fragment>
    );
};

export default Payment;