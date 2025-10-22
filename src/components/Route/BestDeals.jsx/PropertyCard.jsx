import React from "react";
import { motion } from "framer-motion";
import { MapPin, Home, BedDouble, Bath, Ruler } from "lucide-react";

const PropertyCard = ({ property, clickable = true }) => {
  if (!property) return null;

  const imageSrc =
    Array.isArray(property.images)
      ? property.images[0]?.url || property.images[0] || "/default-image.jpg"
      : property.image?.url || property.image || "/default-image.jpg";

  const handleViewDetails = () => {
    if (clickable) {
      window.location.href = `/property/${property._id}`;
    }
  };

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
        clickable ? "hover:shadow-xl cursor-pointer" : "cursor-default"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={clickable ? { scale: 1.02 } : {}}
      onClick={clickable ? handleViewDetails : undefined}
    >
      {/* 🖼️ Image */}
      <div className="relative">
        <img
          src={imageSrc}
          alt={property.title || "Property"}
          onError={(e) => (e.target.src = "/default-image.jpg")}
          className="w-full h-56 object-cover"
        />

        {property.isFeatured && (
          <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>
        )}
        {property.status && (
          <span
            className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
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

      {/* 🏡 Details */}
      <div className="p-5 flex flex-col justify-between h-full">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {property.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">
          {property.description || "No description available."}
        </p>

        {/* 🗺️ Location */}
        <p className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin size={16} className="mr-1 text-blue-700" />
          {typeof property.location === "object"
            ? `${property.location.address || ""} ${property.location.city || ""}`.trim() ||
              "N/A"
            : property.location || "N/A"}
        </p>

        {/* 🧩 Features */}
        <div className="flex items-center justify-between text-gray-700 text-sm mb-3">
          <span className="flex items-center">
            <Home size={16} className="mr-1 text-blue-700" />
            {property.propertyType || "N/A"}
          </span>
          <span className="flex items-center">
            <BedDouble size={16} className="mr-1 text-blue-700" />
            {property.bedrooms || 0} Beds
          </span>
          <span className="flex items-center">
            <Bath size={16} className="mr-1 text-blue-700" />
            {property.bathrooms || 0} Baths
          </span>
          <span className="flex items-center">
            <Ruler size={16} className="mr-1 text-blue-700" />
            {property.area || 0} m²
          </span>
        </div>

        {/* 💰 Price */}
        <p className="text-green-700 font-bold text-lg mb-3">
          Ksh {property.price?.toLocaleString() || "N/A"}
        </p>

        {/* 🔘 View Details Button */}
        {clickable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="w-full bg-blue-950 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition"
          >
            View Details
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyCard;
