// src/pages/AllPropertiesPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  fetchCategories,
  selectAllCategories,
} from "../redux/slices/categorySlice";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import WhatsAppButton from "./WhatsAppButton";
import { getAllProperties } from "../redux/slices/propertySlice";

const AllPropertiesPage = () => {
  const dispatch = useDispatch();
  const { properties = [], loading, error, pages = 1, total = 0 } = useSelector(
    (state) => state.properties || {}
  );
  const categories = useSelector(selectAllCategories) || [];

  const [filters, setFilters] = useState({
    location: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    page: 1,
  });

  /* ================================
     FETCH DATA
  ================================== */
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getAllProperties());
  }, [dispatch]);

  /* ================================
     HANDLERS
  ================================== */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
    }
  };

  /* ================================
     RENDER
  ================================== */
  return (
    <>
      <Header />

      <section className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Title */}
          <motion.h1
            className="text-4xl font-bold text-blue-900 text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Explore Our Properties
          </motion.h1>

          {/* Filters */}
          <div className="sticky top-20 z-20 bg-white/90 backdrop-blur-md shadow-md rounded-xl p-5 mb-10 grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleChange}
              placeholder="Search by location..."
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-700 outline-none"
            />

            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-700 outline-none"
            >
              <option value="">All Categories</option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading...</option>
              )}
            </select>

            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              placeholder="Min Price (KES)"
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-700 outline-none"
            />

            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              placeholder="Max Price (KES)"
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-700 outline-none"
            />

            <button
              onClick={() => dispatch(getAllProperties(filters))}
              className="bg-blue-900 text-white rounded-md px-4 py-2 hover:bg-blue-800 transition"
            >
              Apply Filters
            </button>
          </div>

          {/* States */}
          {loading && (
            <p className="text-center text-gray-600">Loading properties...</p>
          )}
          {error && (
  <p className="text-center text-red-600 bg-red-50 p-3 rounded-md max-w-md mx-auto">
    {typeof error === "string" ? error : error.message || "Something went wrong"}
  </p>
)}


          {/* Properties Grid */}
          {!loading && !error && properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => {
                const imageSrc =
                  Array.isArray(property.images)
                    ? property.images[0]?.url ||
                      property.images[0] ||
                      "/default-image.jpg"
                    : property.image?.url ||
                      property.image ||
                      "/default-image.jpg";

                return (
                  <motion.div
                    key={property._id}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="relative">
                      <img
                        src={imageSrc}
                        alt={property.title || "Property"}
                        className="w-full h-56 object-cover"
                        onError={(e) => (e.target.src = "/default-image.jpg")}
                      />
                      <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
                        {property.status || "Available"}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <h3 className="text-lg font-semibold text-blue-950 line-clamp-1">
                        {property.title || "Untitled Property"}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {property.description || "No description available."}
                      </p>

                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>
                          📍{" "}
                          {typeof property.location === "object"
                            ? property.location.city || "Unknown"
                            : property.location || "Unknown"}
                        </span>
                        <span className="text-green-700 font-semibold">
                          Ksh {property.price?.toLocaleString() || "N/A"}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          (window.location.href = `/listings/${property._id}`)
                        }
                        className="mt-3 w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            !loading &&
            !error && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  No properties found. Try adjusting your filters.
                </p>
              </div>
            )
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center items-center mt-12 gap-6">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={filters.page <= 1}
                className={`px-4 py-2 rounded-md transition ${
                  filters.page <= 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                Prev
              </button>

              <span className="text-blue-900 font-medium text-sm">
                Page {filters.page} of {pages}
              </span>

              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={filters.page >= pages}
                className={`px-4 py-2 rounded-md transition ${
                  filters.page >= pages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {/* Count */}
          {total > 0 && (
            <p className="text-center text-gray-500 mt-6 text-sm">
              Showing {properties.length} of {total} properties
            </p>
          )}
        </div>
      </section>

      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default AllPropertiesPage;
