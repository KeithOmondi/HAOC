// src/pages/admin/AdminProperties.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Edit, Eye, CheckCircle, XCircle, Home, Loader2, Frown } from "lucide-react";
import { toast } from "react-toastify";
import {
    deleteProperty,
    approveProperty,
    clearPropertyState,
    getAllPropertiesAdmin,
} from "../../redux/slices/propertySlice";
import { useNavigate } from "react-router-dom";

// Helper for location display
const formatLocation = (location) => {
    if (typeof location === "object" && location !== null) {
        return `${location.address || ''}, ${location.city || ''}`.replace(/, \s*,/, ',').replace(/, $/, '').trim() || "N/A";
    }
    return location || "N/A";
};

// Helper for status badge styling
const getStatusBadge = (approved) => {
    return approved
        ? "bg-green-100 text-green-700 ring-1 ring-green-200"
        : "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200";
};

const AdminProperties = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const { properties = [], loading, error, success } = useSelector(
        (state) => state.properties
    );

    // Fetch all properties on mount
    useEffect(() => {
        dispatch(getAllPropertiesAdmin());
    }, [dispatch]);

    // Handle success & error toasts
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearPropertyState());
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (success) {
            toast.success(success);
            dispatch(clearPropertyState());
            dispatch(getAllPropertiesAdmin()); // Re-fetch list after successful action
        }
    }, [success, dispatch]);

    // Handlers
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
            dispatch(deleteProperty(id));
        }
    };

    const handleEdit = (id) => navigate(`/admin/properties/edit/${id}`);
    const handleView = (id) => navigate(`/admin/properties/view/${id}`);

    const handleApproveToggle = (id, approved) => {
        dispatch(approveProperty({ id, approved: !approved }));
    };

    const PropertyActions = ({ property }) => (
        <div className="flex justify-center gap-3">
            <button
                onClick={() => handleView(property._id)}
                className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 transition"
                title="View Details"
            >
                <Eye size={18} />
            </button>

            <button
                onClick={() => handleEdit(property._id)}
                className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50 transition"
                title="Edit Listing"
            >
                <Edit size={18} />
            </button>

            <button
                onClick={() => handleApproveToggle(property._id, property.approved)}
                className={`p-1 rounded-full hover:bg-opacity-80 transition ${
                    property.approved
                        ? "text-yellow-600 hover:text-yellow-800 bg-yellow-50"
                        : "text-green-600 hover:text-green-800 bg-green-50"
                }`}
                title={property.approved ? "Unapprove (Hide)" : "Approve (Publish)"}
                disabled={loading}
            >
                {property.approved ? (
                    <XCircle size={18} />
                ) : (
                    <CheckCircle size={18} />
                )}
            </button>

            <button
                onClick={() => handleDelete(property._id)}
                className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50 transition"
                title="Delete Listing"
                disabled={loading}
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
    
    // --- Render Content ---
    const renderContent = () => {
        if (loading) {
            return (
                <div className="text-center py-10 bg-white rounded-lg shadow-lg">
                    <Loader2 size={32} className="text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Fetching property listings...</p>
                </div>
            );
        }

        if (properties.length === 0) {
            return (
                <div className="text-center py-10 bg-white rounded-lg shadow-lg">
                    <Frown size={32} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">No properties found. Click "Add Property" to begin.</p>
                </div>
            );
        }

        return (
            <>
                {/* Desktop Table View */}
                <div className="hidden md:block bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold text-gray-600">Title</th>
                                <th className="p-4 text-left text-sm font-semibold text-gray-600">Location</th>
                                <th className="p-4 text-left text-sm font-semibold text-gray-600">Category</th>
                                <th className="p-4 text-left text-sm font-semibold text-gray-600">Price</th>
                                <th className="p-4 text-left text-sm font-semibold text-gray-600">Approval</th>
                                <th className="p-4 text-center text-sm font-semibold text-gray-600 w-1/5">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {properties.map((property, index) => (
                                <tr
                                    key={property._id}
                                    className={`border-b border-gray-100 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                                >
                                    <td className="p-4 font-semibold text-gray-800 max-w-xs truncate">
                                        {property.title}
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm max-w-xs truncate">
                                        {formatLocation(property.location)}
                                    </td>
                                    <td className="p-4 text-gray-600 text-sm">
                                        {property.category?.name || "N/A"}
                                    </td>
                                    <td className="p-4 font-mono text-gray-700 text-sm">
                                        Ksh{property.price?.toLocaleString()}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusBadge(property.approved)}`}
                                        >
                                            {property.approved ? "Approved" : "Pending"}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <PropertyActions property={property} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                    {properties.map((property) => (
                        <div key={property._id} className="bg-white p-4 shadow-xl rounded-lg border border-gray-100 space-y-3">
                            <div className="flex justify-between items-start border-b pb-2">
                                <h3 className="text-lg font-bold text-gray-800 truncate pr-4">
                                    <Home size={18} className="inline mr-2 text-blue-500" />
                                    {property.title}
                                </h3>
                                <span
                                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusBadge(property.approved)}`}
                                >
                                    {property.approved ? "Approved" : "Pending"}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                    <span className="font-semibold text-gray-700">Location:</span> {formatLocation(property.location)}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Category:</span> {property.category?.name || "N/A"}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-700">Price:</span> <span className="font-mono text-base text-green-600">Ksh{property.price?.toLocaleString()}</span>
                                </p>
                            </div>
                            <div className="pt-3 border-t">
                                <PropertyActions property={property} />
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-3xl font-extrabold text-gray-900">
                    Admin Property Listings
                </h2>
                <button
                    onClick={() => navigate("/admin/add")}
                    className="bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-xl shadow-md hover:bg-blue-700 transition transform hover:scale-[1.02] text-sm font-semibold"
                >
                    + Add New Property
                </button>
            </div>

            {/* Content */}
            {renderContent()}
        </div>
    );
};

export default AdminProperties;