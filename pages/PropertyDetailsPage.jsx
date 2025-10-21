// src/pages/ProductDetailsPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { Loader2, AlertCircle, MapPin, Tag, User, Calendar, MessageSquare, Image, Home } from "lucide-react"; // Importing lucide icons

import { getSingleProperty } from "../redux/slices/propertySlice";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

// Helper function to format location
const formatLocation = (location) => {
  if (location) {
    if (typeof location === "object") {
      return `${location.address || ''}, ${location.city || ''}`.replace(/, \s*,/, ',').replace(/, $/, '').trim() || "Unknown location";
    }
    return location;
  }
  return "Unknown location";
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { property, loading, error } = useSelector((state) => state.properties);

  useEffect(() => {
    if (id) dispatch(getSingleProperty(id));
  }, [dispatch, id]);

  // --- Loading State ---
  if (loading) {
    return (
      <>
        <Header />
        <div className="flex flex-col justify-center items-center min-h-[60vh] bg-gray-50">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
          <p className="text-lg text-gray-600 font-medium">Loading property details...</p>
        </div>
        <Footer />
      </>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <>
        <Header />
        <div className="flex flex-col items-center py-20 bg-gray-50">
          <AlertCircle className="w-10 h-10 text-red-600 mb-4" />
          <div className="text-center text-red-700 p-4 bg-red-100 border border-red-300 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-2">Error Loading Property</h2>
            <p>{typeof error === "string" ? error : error.message || "The property could not be loaded. It may not exist or an internal error occurred."}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // --- No Property Found ---
  if (!property) {
    return (
      <>
        <Header />
        <div className="text-center py-20 text-gray-600 bg-gray-50">
          <Home className="w-10 h-10 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold">Property Not Found</h2>
          <p className="text-gray-500">We couldn't find a property matching that ID.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-medium">
            Go back to listings
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // --- Normalize and validate image URLs ---
  const propertyImages =
    property.images?.map((img) =>
      typeof img === "string" ? img : img?.url
    )?.filter(Boolean) || [];

  const placeholderImg =
    "https://via.placeholder.com/800x600.png?text=No+Image+Available";

  const mainImageUrl = propertyImages.length > 0 ? propertyImages[0] : placeholderImg;
  const secondaryImages = propertyImages.slice(1, 4); // Up to 3 secondary images

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* --- Header & Title Section --- */}
        <section className="border-b pb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <span className="font-semibold text-gray-700">{property.title || "Details"}</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            {property.title || "Untitled Property"}
          </h1>
          <p className="text-xl font-semibold text-blue-800">
            Ksh {property.price ? property.price.toLocaleString() : "Price Not Specified"}
          </p>
          <p className="text-gray-600 mt-1 flex items-center">
            <MapPin className="w-4 h-4 mr-1 text-red-500" />
            {formatLocation(property.location)}
          </p>
        </section>

        {/* --- Image Gallery --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 md:gap-4 rounded-xl overflow-hidden shadow-xl">
          <div className="md:col-span-2 aspect-video overflow-hidden">
            <img
              src={mainImageUrl}
              alt="Main property image"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              onError={(e) => (e.target.src = placeholderImg)}
            />
          </div>
          <div className="hidden md:grid grid-rows-3 gap-4">
            {secondaryImages.length > 0 ? (
              secondaryImages.map((imgUrl, i) => (
                <img
                  key={i}
                  src={imgUrl}
                  alt={`Property image ${i + 2}`}
                  className="w-full h-full object-cover rounded-lg shadow-md transition-opacity duration-300 hover:opacity-90"
                  loading="lazy"
                  onError={(e) => (e.target.src = placeholderImg)}
                />
              ))
            ) : (
              <div className="col-span-1 row-span-3 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                <Image className="w-6 h-6 mr-2" />
                <span className="text-sm">More images soon.</span>
              </div>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- Description & Details (Left Column) --- */}
          <section className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <MessageSquare className="w-6 h-6 mr-3 text-blue-600" /> Property Overview
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description || "No detailed description has been provided for this property yet."}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <Tag className="w-6 h-6 mr-3 text-blue-600" /> Key Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 text-gray-700">
                
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-500">Category</span>
                  <span className="text-lg font-medium">{property.category?.name || "N/A"}</span>
                </div>
                
                {/* Placeholder for Bedrooms/Bathrooms/Area if available */}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-500">Type</span>
                  <span className="text-lg font-medium">{property.type || "Apartment"}</span> {/* Assuming a `type` field */}
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-500">Listed On</span>
                  <span className="text-lg font-medium">{property.createdAt ? new Date(property.createdAt).toLocaleDateString() : "N/A"}</span>
                </div>

                {/* Add more property features here if they exist in your data model */}
                {/* Example: */}
                {/* <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-500">Bedrooms</span>
                  <span className="text-lg font-medium">{property.beds || 0}</span>
                </div> */}
              </div>
            </div>
          </section>

          {/* --- Agent & CTA (Right Column) --- */}
          <aside className="lg:col-span-1 space-y-6">
            
            {/* Agent Information Card */}
            {property.agent && (
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 flex items-center mb-3 border-b pb-2">
                  <User className="w-5 h-5 mr-2 text-blue-600" /> Contact Agent
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p className="text-lg font-semibold">{property.agent.name || "Unnamed Agent"}</p>
                  <p className="text-sm">Email: <a href={`mailto:${property.agent.email}`} className="text-blue-600 hover:underline">{property.agent.email || "N/A"}</a></p>
                  <p className="text-sm">Phone: <a href={`tel:${property.agent.phone}`} className="text-blue-600 hover:underline">{property.agent.phone || "N/A"}</a></p>
                </div>
              </div>
            )}
            
            {/* Booking Call-to-Action */}
            <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-xl text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ready to View?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Schedule a personal viewing or get more details about this property.
              </p>
              <Link
                to={`/booking/${property._id}`}
                className="w-full bg-blue-800 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition transform hover:scale-[1.01] shadow-lg"
              >
                <Calendar className="w-5 h-5" /> Book a Viewing
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;