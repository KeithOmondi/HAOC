// src/components/User/UserHeader.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice'; // Assuming you have a logout action
import { BiUser, BiLogOut } from 'react-icons/bi';
import { toast } from 'react-toastify';

const UserHeader = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully!");
    };

    return (
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm sticky top-0 z-10">
            <div className="text-xl font-bold text-blue-600">
                 {user?.name.split(' ')[0] || 'User'}
            </div>
            
            <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium hidden sm:inline">
                    Welcome, {user?.name.split(' ')[0] || 'User'}
                </span>

                <Link 
                    to="/profile" 
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full text-blue-600 hover:bg-gray-200 transition"
                    title="Profile"
                >
                    {/* Placeholder for Avatar/Icon */}
                    <BiUser size={20} /> 
                </Link>

                <button 
                    onClick={handleLogout}
                    className="p-2 text-red-500 bg-red-100 rounded-full hover:bg-red-200 transition"
                    title="Logout"
                >
                    <BiLogOut size={20} />
                </button>
            </div>
        </header>
    );
};

export default UserHeader;