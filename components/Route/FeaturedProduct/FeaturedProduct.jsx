// src/components/Route/FeaturedProduct/FeaturedProduct.jsx
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProperties } from "../../../redux/slices/propertySlice";
import PropertyCard from "../BestDeals.jsx/PropertyCard";

const FeaturedProduct = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { properties, loading, error } = useSelector((state) => state.properties);

  // Fetch 6 featured properties on mount
  useEffect(() => {
    dispatch(getAllProperties({ limit: 6 }));
  }, [dispatch]);

  // Animate when in view
  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  return (
    <section ref={ref} className="w-full py-16 bg-gray-50 px-10 md:px-16">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Featured Properties
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Discover some of our top listings — trusted by clients across regions.
        </p>
      </div>

      {/* Loading & Error Handling */}
      {loading && (
        <p className="text-center text-gray-500 animate-pulse">
          Loading properties...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500">⚠️ {error}</p>
      )}

      {/* Property Grid */}
      {!loading && !error && (
        <>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial="hidden"
            animate={controls}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {properties.length > 0 ? (
              properties.slice(0, 6).map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  clickable={false} // Disable card link
                />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No properties available at the moment.
              </p>
            )}
          </motion.div>

          {/* View More Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/listings")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              View More Properties
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default FeaturedProduct;
