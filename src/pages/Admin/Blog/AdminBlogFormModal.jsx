import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBlog, updateBlog } from "../../../redux/slices/blogSlice";

const AdminBlogFormModal = ({ setShowModal, editingBlog }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: null,
  });

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || "",
        content: editingBlog.content || "",
        author: editingBlog.author || "",
        image: null,
      });
    }
  }, [editingBlog]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingBlog) {
        await dispatch(updateBlog({ id: editingBlog._id, blogData: formData })).unwrap();
      } else {
        await dispatch(createBlog(formData)).unwrap();
      }
      setShowModal(false);
    } catch (error) {
      console.error("Blog submission failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {editingBlog ? "Edit Blog Post" : "Create New Blog"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              {editingBlog ? "Update Blog" : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBlogFormModal;
