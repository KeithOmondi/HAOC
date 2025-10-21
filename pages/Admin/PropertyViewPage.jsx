// src/pages/admin/PropertyViewPage.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MapPin, Home, BedDouble, Bath, Ruler } from "lucide-react";
import { getSingleProperty } from "../../redux/slices/propertySlice";

const PropertyViewPage = () => {
  const { id } = useParams(); // property ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { property, loading, error } = useSelector((state) => state.properties);

  // Fetch single property on mount
  useEffect(() => {
    if (id) dispatch(getSingleProperty(id));
  }, [dispatch, id]);

  if (loading) {
    return <p className="text-center text-gray-500 animate-pulse mt-20">Loading property...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-20">⚠️ {error}</p>;
  }

  if (!property) {
    return <p className="text-center text-gray-500 mt-20">Property not found.</p>;
  }

  const imageSrc =
    Array.isArray(property.images)
      ? property.images[0]?.url || property.images[0] || "/default-image.jpg"
      : property.image?.url || property.image || "/default-image.jpg";

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
      >
        &larr; Back
      </button>

      {/* Property Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={imageSrc}
          alt={property.title || "Property"}
          onError={(e) => (e.target.src = "/default-image.jpg")}
          className="w-full md:w-1/2 h-80 object-cover rounded-lg shadow-md"
        />

        <div className="flex-1 flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
          <p className="text-gray-600 mt-2 line-clamp-3">
            {property.description || "No description available."}
          </p>

          {/* Status & Featured */}
          <div className="mt-4 flex flex-wrap gap-2">
            {property.isFeatured && (
              <span className="bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Featured
              </span>
            )}
            {property.status && (
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  property.status === "Available"
                    ? "bg-green-600 text-white"
                    : property.status === "Pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-400 text-white"
                }`}
              >
                {property.status}
              </span>
            )}
          </div>

          {/* Price */}
          <p className="text-green-700 font-bold text-xl mt-4">
            Ksh {property.price?.toLocaleString() || "N/A"}
          </p>
        </div>
      </div>

      {/* Property Details */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Location</h2>
          <p className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2 text-blue-700" />
            {typeof property.location === "object"
              ? `${property.location.address || ""}, ${property.location.city || ""}`.trim()
              : property.location || "N/A"}
          </p>
        </div>

        {/* Features */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Features</h2>
          <div className="flex flex-wrap gap-4 text-gray-700 text-sm">
            <span className="flex items-center gap-1">
              <Home size={16} /> {property.propertyType || "N/A"}
            </span>
            <span className="flex items-center gap-1">
              <BedDouble size={16} /> {property.bedrooms || 0} Beds
            </span>
            <span className="flex items-center gap-1">
              <Bath size={16} /> {property.bathrooms || 0} Baths
            </span>
            <span className="flex items-center gap-1">
              <Ruler size={16} /> {property.area || 0} m²
            </span>
          </div>
        </div>

        {/* Admin Info */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Admin Info</h2>
          <p>
            <strong>Approved:</strong>{" "}
            {property.approved ? (
              <span className="text-green-600">Yes</span>
            ) : (
              <span className="text-red-600">No</span>
            )}
          </p>
          <p className="mt-2">
            <strong>Created At:</strong>{" "}
            {new Date(property.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-2">
            <strong>Last Updated:</strong>{" "}
            {new Date(property.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyViewPage;
