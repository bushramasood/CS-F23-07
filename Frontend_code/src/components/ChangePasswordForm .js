import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const ChangePasswordForm = ({ onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.email || !data.newPassword || !data.confirmNewPassword) {
            toast.error("All fields are required.");
            return;
        }

        if (data.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }

        if (data.newPassword !== data.confirmNewPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        try {
            const response = await fetch(SummaryApi.changePassword.url, {
                method: SummaryApi.changePassword.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            console.log("Response Data:", responseData); // Logging response data for debugging

            if (responseData.success) {
                toast.success(responseData.message);
                dispatch({ type: 'USER_PASSWORD_CHANGE_SUCCESS', payload: responseData.data });
                navigate('/login'); // Redirect to login page
                if (onClose) onClose();
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error("Error during password change:", error); // Logging error for debugging
            toast.error('Error changing password');
        }
    };

    return (
        <section id='change-password'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <h1 className='text-xl font-bold text-center mb-4'>Change Password</h1>
                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email :</label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label>New Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder='Enter new password'
                                    name='newPassword'
                                    value={data.newPassword}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setShowNewPassword(prev => !prev)}>
                                    <span>{showNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm New Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showConfirmNewPassword ? 'text' : 'password'}
                                    placeholder='Confirm new password'
                                    name='confirmNewPassword'
                                    value={data.confirmNewPassword}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmNewPassword(prev => !prev)}>
                                    <span>{showConfirmNewPassword ? <AiFillEyeInvisible /> : <AiFillEye />}</span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-goldenrod hover:bg-goldenrod-darker text-white px-6 py-2  rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Change Password</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ChangePasswordForm;
