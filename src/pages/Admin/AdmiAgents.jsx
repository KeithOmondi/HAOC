import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchAllUsers, deleteUserById } from "../../redux/slices/authSlice";
import { Trash2, Edit } from "lucide-react";

const AdminAgents = () => {
  const dispatch = useDispatch();
  const { users = [], loading, error, success } = useSelector((state) => state.auth); // Default users to []

  // Fetch all users on mount
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  // Show toast for errors
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Show toast for success messages
  useEffect(() => {
    if (success) toast.success(success);
  }, [success]);

  // Handle delete agent
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this agent?")) {
      dispatch(deleteUserById(id));
    }
  };

  // Filter agents only
  const agents = users.filter((user) => user.role === "Agent");

  return (
    <>
    <h1 className="text-2xl font-bold mb-6">Agents</h1>

      {loading ? (
        <p>Loading agents...</p>
      ) : agents.length === 0 ? (
        <p>No agents found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent._id} className="border-b">
                  <td className="py-2 px-4">{agent.name}</td>
                  <td className="py-2 px-4">{agent.email}</td>
                  <td className="py-2 px-4">{agent.role}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      onClick={() => handleDelete(agent._id)}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default AdminAgents;
