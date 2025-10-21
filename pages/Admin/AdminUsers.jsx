// src/pages/admin/AdminUsers.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, deleteUserById } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Trash2, Edit, Loader2 } from "lucide-react"; // Added Loader2 for loading state

const AdminUsers = () => {
  const dispatch = useDispatch();
  // Ensure default state is handled gracefully
  const { users = [], loading, error, success } = useSelector((state) => state.auth); 

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Toast notifications for feedback
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (success) toast.success(success);
  }, [success]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      dispatch(deleteUserById(id));
    }
  };

  // Modern Loading and Empty States
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8 flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-indigo-600 mr-2" size={32} />
        <p className="text-xl text-gray-600 font-medium">Fetching users data...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-8 bg-white border border-dashed border-gray-300 rounded-lg text-center">
        <p className="text-xl text-gray-500 font-medium">No users found. The user list is currently empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 border-b-4 border-indigo-500 pb-1">
          User Management
        </h2>
        {/* Placeholder for 'Add User' button or similar admin action */}
        {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-150">
            + Add New User
        </button> */}
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-indigo-600"> {/* Darker, primary color header */}
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white rounded-tl-xl">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-white">
                Role
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-white rounded-tr-xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr 
                key={user._id} 
                className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-50 hover:bg-gray-100"} // Zebra stripes
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Styled Role Badge */}
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${user.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`
                  }>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-4">
                    {/* Edit Button (Icon Only) */}
                    <button
                      title="Edit User"
                      className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-50 transition duration-150"
                      // onClick={() => handleEdit(user._id)} // Add your edit logic here
                    >
                      <Edit size={18} />
                    </button>
                    {/* Delete Button (Icon Only) */}
                    <button
                      title="Delete User"
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition duration-150"
                      onClick={() => handleDelete(user._id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;