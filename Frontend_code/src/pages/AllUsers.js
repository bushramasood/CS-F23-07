import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit, MdDelete } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    });

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        });

        const dataResponse = await fetchData.json();

        if (dataResponse.success) {
            setAllUsers(dataResponse.data);
        } else if (dataResponse.error) {
            toast.error(dataResponse.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        const response = await fetch(`${SummaryApi.deleteUser.url}/${userId}`, {
            method: SummaryApi.deleteUser.method,
            credentials: 'include'
        });

        const data = await response.json();

        if (data.success) {
            toast.success("User deleted successfully");
            fetchAllUsers(); // Refresh the list after deletion
        } else {
            toast.error("Failed to delete user");
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th className='px-1 py-1'>Sr.</th>
                        <th className='px-1 py-1'>Name</th>
                        <th className='px-1 py-1'>Email</th>
                        <th className='px-1 py-1'>Role</th>
                        <th className='px-1 py-1'>Created Date</th>
                        <th className='px-1 py-1'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {allUser.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{moment(user.createdAt).format('LL')}</td>
                            <td>
                                <button className='bg-yellow-100 p-2 rounded-full cursor-pointer hover:bg-goldenrod-darker hover:text-white'
                                    onClick={() => {
                                        setUpdateUserDetails(user);
                                        setOpenUpdateRole(true);
                                    }}>
                                    <MdModeEdit />
                                </button>
                                <button className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white ml-2'
                                    onClick={() => handleDeleteUser(user._id)}>
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {openUpdateRole && (
                <ChangeUserRole
                    onClose={() => setOpenUpdateRole(false)}
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )}
        </div>
    );
};

export default AllUsers;