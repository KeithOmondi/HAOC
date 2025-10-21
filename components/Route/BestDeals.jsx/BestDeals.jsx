import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProperties } from "../../../redux/slices/propertySlice";
import PropertyCard from "./PropertyCard";

const BestDeals = () => {
  const dispatch = useDispatch();
  const [topProperties, setTopProperties] = useState([]);
  const { properties, loading, error } = useSelector((state) => state.properties);

  useEffect(() => {
    // Fetch properties only if not loaded yet
    if (!properties || properties.length === 0) {
      dispatch(getAllProperties());
    }
  }, [dispatch, properties]);

  useEffect(() => {
    if (properties && properties.length > 0) {
      // Sort by price descending or date listed
      const sorted = [...properties].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Take top 5 properties
      const recentFive = sorted.slice(0, 5);
      setTopProperties(recentFive);
    }
  }, [properties]);

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          Featured Properties
        </h2>
        <p className="text-center text-gray-600 mb-10 tracking-wide uppercase font-semibold">
          Explore our most recent and attractive listings
        </p>

        {/* Loading State */}
        {loading && (
          <p className="text-center text-gray-500 text-lg">
            Loading properties...
          </p>
        )}

        {/* Error State */}
        {error && (
          <p className="text-center text-red-500 text-lg">
            {error}
          </p>
        )}

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {!loading && topProperties.length > 0 ? (
            topProperties.map((property) => (
              <PropertyCard key={property._id} data={property} />
            ))
          ) : (
            !loading && (
              <p className="text-center col-span-full text-gray-500 text-lg">
                No properties available.
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default BestDeals;
