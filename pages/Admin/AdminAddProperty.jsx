import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createProperty,
  clearPropertyState,
} from "../../redux/slices/propertySlice";
import {
  fetchCategories,
  selectAllCategories,
  selectCategoryLoading,
  selectCategoryError,
} from "../../redux/slices/categorySlice";

/* ============================================================
   🧩 Description Section Component
============================================================ */
const DescriptionSection = ({
  id,
  text,
  index,
  onChange,
  onRemove,
  isRequired,
}) => (
  <div className="relative mb-2">
    <textarea
      placeholder={`Description section ${index + 1}`}
      value={text}
      onChange={(e) => onChange(id, e.target.value)}
      className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200 transition"
      rows="3"
      required={isRequired}
    />
    {onRemove && (
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="absolute top-1 right-2 text-red-600 hover:text-red-800 text-sm opacity-70 transition"
        title="Remove section"
      >
        ❌
      </button>
    )}
  </div>
);

/* ============================================================
   🏠 AdminAddProperty Component
============================================================ */
const AdminAddProperty = () => {
  const dispatch = useDispatch();

  // Redux states
  const { loading, success, error } = useSelector((state) => state.properties);
  const categories = useSelector(selectAllCategories);
  const categoryLoading = useSelector(selectCategoryLoading);
  const categoryError = useSelector(selectCategoryError);

  // Form states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [descriptionSections, setDescriptionSections] = useState([
    { id: Date.now(), text: "" },
  ]);

  /* ============================================================
     Fetch categories on mount
  ============================================================= */
  useEffect(() => {
    if (!categoryLoading && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length, categoryLoading]);

  /* ============================================================
     Description handlers
  ============================================================= */
  const handleDescriptionChange = useCallback((id, value) => {
    setDescriptionSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, text: value } : s))
    );
  }, []);

  const addDescriptionSection = useCallback(() => {
    setDescriptionSections((prev) => [...prev, { id: Date.now(), text: "" }]);
  }, []);

  const removeDescriptionSection = useCallback((id) => {
    setDescriptionSections((prev) => prev.filter((s) => s.id !== id));
  }, []);

  /* ============================================================
     Image selection
  ============================================================= */
  const handleImages = (e) => {
    setImages(Array.from(e.target.files || []));
  };

  /* ============================================================
     Reset form
  ============================================================= */
  const resetForm = useCallback(() => {
    setTitle("");
    setPrice("");
    setLocation("");
    setCategory("");
    setImages([]);
    setDescriptionSections([{ id: Date.now(), text: "" }]);

    const fileInput = document.getElementById("image-upload");
    if (fileInput) fileInput.value = "";
  }, []);

  /* ============================================================
     Toasts for success/error
  ============================================================= */
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearPropertyState());
    }
    if (success) {
      toast.success(success);
      resetForm();
      dispatch(clearPropertyState());
    }
  }, [error, success, dispatch, resetForm]);

  /* ============================================================
     Submit handler
  ============================================================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !location || !category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const hasDescription = descriptionSections.some(
      (s) => s.text.trim().length > 0
    );
    if (!hasDescription) {
      toast.error("Please add at least one description section.");
      return;
    }

    const fullDescription = descriptionSections
      .map((s) => s.text.trim())
      .filter(Boolean)
      .join("\n\n");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", fullDescription);
    formData.append(
      "location",
      JSON.stringify({
        address: location,
        city: location,
      })
    );

    images.forEach((file) => formData.append("images", file));

    dispatch(createProperty(formData));
  };

  /* ============================================================
     JSX
  ============================================================= */
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-2">
        🏡 Add New Property Listing
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Property Title (e.g., Luxury 3-Bedroom Villa)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
          <input
            type="number"
            placeholder="Price (e.g., 500000)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            min="0"
            required
          />
          <input
            type="text"
            placeholder="Location (e.g., New York, USA)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none transition"
            required
          >
            <option value="">-- Select Category --</option>
            {categoryLoading ? (
              <option disabled>Loading categories...</option>
            ) : categoryError ? (
              <option disabled>Error loading categories</option>
            ) : (
              categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Description Sections */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Detailed Description
          </label>
          <p className="text-sm text-gray-500 mb-3">
            Add multiple sections to structure your listing.
          </p>
          <div className="space-y-3">
            {descriptionSections.map((section, index) => (
              <DescriptionSection
                key={section.id}
                id={section.id}
                text={section.text}
                index={index}
                onChange={handleDescriptionChange}
                onRemove={
                  descriptionSections.length > 1
                    ? removeDescriptionSection
                    : null
                }
                isRequired={index === 0}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addDescriptionSection}
            className="mt-2 px-4 py-2 text-sm bg-gray-100 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            + Add Paragraph Section
          </button>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image-upload"
            className="block text-gray-700 font-bold mb-2"
          >
            Property Images ({images.length} selected)
          </label>
          <input
            id="image-upload"
            type="file"
            multiple
            onChange={handleImages}
            className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
          />
          {images.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              Selected:{" "}
              {images
                .map((f) => f.name)
                .join(", ")
                .substring(0, 100)}
              {images.map((f) => f.name).join(", ").length > 100 ? "..." : ""}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-lg text-lg font-semibold transition duration-200 shadow-md ${
            loading
              ? "bg-blue-400 opacity-75 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing Listing..." : "✅ Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddProperty;
