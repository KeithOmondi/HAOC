import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../src/static/data"

const Categories = () => {
  const navigate = useNavigate();

  const handleSubmit = (category) => {
    navigate(`/listings?category=${category.title}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Explore Our Top Categories 🚀
        </h2>
        <p className="mt-4 text-xl text-gray-500">
          Find exactly what you're looking for, from A to Z.
        </p>
      </div>

      {/* Categories Grid */}
      <div
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        id="categories"
      >
        {categoriesData.map((item) => (
          <div
            key={item.id}
            onClick={() => handleSubmit(item)}
            // 💡 UX Improvement: Vertical Tile Design
            className="group w-full flex flex-col items-center justify-center p-3 sm:p-5 rounded-xl border border-gray-200 
                       cursor-pointer transition-all duration-300 ease-in-out 
                       hover:bg-sky-50 hover:border-sky-400 hover:shadow-xl hover:scale-[1.03]"
          >
            {/* 💡 UI Improvement: Image/Icon on Top */}
            <div className="relative mb-3 w-16 h-16 sm:w-20 sm:h-20">
              <img
                src={item.image_Url}
                alt={item.title}
                // New styling for a contained, circular image on top
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg group-hover:border-sky-300 transition-colors duration-300"
              />
            </div>

            {/* 💡 UI Improvement: Clearer, Centered Text */}
            <h5 className="text-sm sm:text-base text-center font-bold text-gray-800 transition-colors duration-300 group-hover:text-sky-700">
              {item.title}
            </h5>

            {/* Optional: Subtle indicator on hover */}
            <span className="mt-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Shop Now →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
