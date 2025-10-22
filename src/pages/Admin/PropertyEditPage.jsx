// src/pages/admin/PropertyEditPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleProperty,
  updateProperty,
  clearPropertyState,
} from "../../redux/slices/propertySlice";
import toast from "react-hot-toast";
import { Save, Loader2, ArrowLeft } from "lucide-react"; // Added Lucide icons

const PropertyEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { property, loading, error, success } = useSelector((state) => state.properties);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    location: {
      address: "",
      city: "",
    },
    images: [], // Note: For file inputs, this should be handled carefully. Here, it tracks new files.
    status: "",
    isFeatured: false,
    approved: false,
  });

  // Fetch property on mount
  useEffect(() => {
    if (id) dispatch(getSingleProperty(id));
  }, [dispatch, id]);

  // Populate form when property data is fetched
  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || "",
        description: property.description || "",
        price: property.price || "",
        propertyType: property.propertyType || "",
        bedrooms: property.bedrooms || "",
        bathrooms: property.bathrooms || "",
        area: property.area || "",
        location: {
          address: property.location?.address || "",
          city: property.location?.city || "",
        },
        images: [], // Keep images array empty for new file uploads
        status: property.status || "Available",
        isFeatured: property.isFeatured || false,
        approved: property.approved || false,
      });
    }
  }, [property]);

  // Handle updates on form change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle image selection
  const handleImageChange = (e) => {
    // Only accept new files here, don't combine with existing image URLs
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create multipart form data
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "location") {
        data.append("location[address]", value.address);
        data.append("location[city]", value.city);
      } else if (key === "images") {
        // Append new files
        value.forEach((file) => data.append("images", file));
      } else {
        // Append all other fields
        data.append(key, value);
      }
    });

    dispatch(updateProperty({ id, formData: data }));
  };

  // Show success/error messages and navigation
  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearPropertyState());
      navigate("/admin/properties"); // Go back to property list
    }
    if (error) {
      toast.error(error);
      dispatch(clearPropertyState());
    }
  }, [success, error, navigate, dispatch]);

  if (loading || !property) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-indigo-600 mr-2" size={32} />
        <p className="text-xl text-gray-600 font-medium">Loading property data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 border-b-4 border-indigo-500 pb-1">
          Edit Property: <span className="text-indigo-600">{property.title}</span>
        </h1>
        <button
          onClick={() => navigate("/admin/properties")}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Details Card */}
        <div className="bg-white p-8 shadow-xl rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Basic Details</h2>
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
                rows="4"
              />
            </div>

            {/* Price & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (Ksh)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                <input
                  type="text"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Card */}
        <div className="bg-white p-8 shadow-xl rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Specifications & Location</h2>
          
          {/* Bedrooms, Bathrooms, Area */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area (sqm)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
              />
            </div>
          </div>
        </div>

        {/* Media & Status Card */}
        <div className="bg-white p-8 shadow-xl rounded-xl border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Media & Publishing</h2>
          
          {/* Images */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Images (Upload New)</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {/* Display count of existing images (for user reference) */}
            <p className="mt-2 text-sm text-gray-500">
                Current images: **{property.images?.length || 0}** (Uploading new files will replace the old ones or require backend logic to append.)
            </p>
          </div>

          {/* Status & Featured & Approved */}
          <div className="flex items-center gap-10">
            {/* Status Dropdown */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2.5"
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Sold">Sold</option>
              </select>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-3 pt-6">
                <label className="inline-flex items-center cursor-pointer text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        name="isFeatured"
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 border-gray-300"
                    />
                    <span className="ml-2">Mark as Featured</span>
                </label>
                <label className="inline-flex items-center cursor-pointer text-sm font-medium text-gray-700">
                    <input
                        type="checkbox"
                        name="approved"
                        checked={formData.approved}
                        onChange={handleChange}
                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 border-gray-300"
                    />
                    <span className="ml-2">Admin Approved</span>
                </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
            disabled={loading} // Disable button if slice loading state is used for saving
          >
            {loading ? (
                <>
                    <Loader2 className="animate-spin mr-3" size={20} />
                    Saving Changes...
                </>
            ) : (
                <>
                    <Save className="mr-3" size={20} />
                    Update Property
                </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyEditPage;