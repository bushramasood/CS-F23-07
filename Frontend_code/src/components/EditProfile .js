import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import DisplayImage from './DisplayImage';
import { toast } from 'react-toastify';
import uploadImage from '../helpers/uploadImage';
import SummaryApi from '../common';

const EditProfile = ({ onClose }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user?.user);

    const [data, setData] = useState({
        userId: user?._id || '',
        name: user?.name || '',
        email: user?.email || '',
        password: '',  // Add password to the state
        profilePic: user?.profilePic || '',
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        // Check if the name contains any numbers
        if (name === 'name' && /\d/.test(value)) {
            toast.error("Name cannot contain numbers.");
            return;
        }

        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUploadProfilePic = async (e) => {
        const file = e.target.files[0];
        const uploadImageCloudinary = await uploadImage(file);
        setData((prev) => ({ ...prev, profilePic: uploadImageCloudinary.url }));
    };

    const handleDeleteProfilePic = () => {
        setData((prev) => ({ ...prev, profilePic: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.name || !data.email) {
            toast.error("Name and email fields are required.");
            return;
        }

        if (!/\S+@\S+\.\S+/.test(data.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (data.password && data.password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        if (!data.profilePic) {
            toast.error("Please upload a profile picture.");
            return;
        }

        try {
            const response = await fetch(SummaryApi.updateProfile.url, {
                method: SummaryApi.updateProfile.method,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                dispatch({ type: 'USER_UPDATE_SUCCESS', payload: responseData.data });
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error('Error updating profile');
        }
    };

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>Edit Profile</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor='name'>Full Name :</label>
                    <input
                        type='text'
                        id='name'
                        placeholder='Enter full name'
                        name='name'
                        value={data.name}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='email' className='mt-3'>Email Address :</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Enter email address'
                        name='email'
                        value={data.email}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor='password' className='mt-3'>Password :</label>
                    <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            placeholder='Enter new password'
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                            className='p-2 bg-slate-100 border rounded w-full'
                        />
                        <div
                            className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </div>
                    </div>

                    <label htmlFor='profilePic' className='mt-3'>Profile Picture :</label>
                    <label htmlFor='uploadProfilePicInput'>
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload Profile Picture</p>
                                <input type='file' id='uploadProfilePicInput' className='hidden' onChange={handleUploadProfilePic} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {data.profilePic ? (
                            <div className='flex items-center gap-2'>
                                <div className='relative group'>
                                    <img
                                        src={data.profilePic}
                                        alt='Profile'
                                        width={80}
                                        height={80}
                                        className='bg-slate-100 border cursor-pointer'
                                        onClick={() => {
                                            setOpenFullScreenImage(true);
                                            setFullScreenImage(data.profilePic);
                                        }}
                                    />
                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={handleDeleteProfilePic}>
                                        <MdDelete />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className='text-red-600 text-xs'>*Please upload a profile picture</p>
                        )}
                    </div>

                    <button className='px-3 py-2 bg-goldenrod hover:bg-goldenrod-darker text-white mb-10'>Update Profile</button>
                </form>
            </div>

            {openFullScreenImage && (
                <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
            )}
        </div>
    );
};

export default EditProfile;
