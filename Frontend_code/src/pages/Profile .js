import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import EditProfile from '../components/EditProfile ';

const Profile = () => {
    const user = useSelector(state => state.user.user);
    const [editProfile, setEditProfile] = useState(false);

    const handleEditProfile = () => {
        setEditProfile(true);
    };

    const handleCloseEditProfile = () => {
        setEditProfile(false);
    };

    return (
        <div className='min-h-[calc(100vh-120px)] p-5 bg-gray-100'>
            <h2 className="text-2xl font-bold mb-5">My Profile</h2>
            <div className="flex flex-wrap justify-around mt-5 bg-white shadow-md rounded-lg p-6">
                <div className="w-full md:w-1/4 flex flex-col items-center">
                    <figure className='avatar avatar-profile'>
                        {user?.profilePic ? (
                            <img className="rounded-full w-40 h-40" src={user.profilePic} alt={user.name} />
                        ) : (
                            <FaRegCircleUser className='text-8xl text-gray-500' />
                        )}
                    </figure>

                    <button 
                        onClick={handleEditProfile} 
                        id="edit_profile" 
                        className="btn btn-primary btn-block my-5 bg-dark-space-blue bg-goldenrod hover:bg-goldenrod-darker text-white py-2 px-4 rounded">
                        Edit Profile
                    </button>
                </div>
                <div className="w-full md:w-1/2">
                    <h4 className="text-lg font-semibold mb-2">Name</h4>
                    <p className="mb-4">{user?.name}</p>
                    <h4 className="text-lg font-semibold mb-2">Email Address</h4>
                    <p className="mb-4">{user?.email}</p>
                    <h4 className="text-lg font-semibold mb-2">Joined On</h4>
                    <p className="mb-4">{String(user?.createdAt).substring(0, 10)}</p>
                </div>
            </div>

            {editProfile && <EditProfile onClose={handleCloseEditProfile} />}
        </div>
    );
}

export default Profile;
