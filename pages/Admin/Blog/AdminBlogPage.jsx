import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../../redux/slices/blogSlice";
import AdminBlogFormModal from "./AdminBlogFormModal";
// Replace react-icons/fa with Lucide icons for a modern look
import { Edit, Trash2, PlusCircle, BookOpen, Loader2 } from "lucide-react";

const AdminBlogPage = () => {
  const dispatch = useDispatch();
  // Ensure 'blogs' is an array even if fetch fails/is empty
  const { blogs = [], loading } = useSelector((state) => state.blogs);

  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  
  // State for tracking the blog currently being deleted (optional enhancement)
  const [deletingId, setDeletingId] = useState(null); 

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingBlog(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      setDeletingId(id);
      try {
        await dispatch(deleteBlog(id)).unwrap();
        // Optional: Add toast success notification here
      } catch (error) {
        console.error("Failed to delete blog:", error);
        // Optional: Add toast error notification here
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-200">
        
        {/* Header and CTA Button */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <BookOpen size={28} className="mr-3 text-indigo-600" /> Manage Blog Posts
          </h2>
          <button
            onClick={handleAddNew}
            className="flex items-center bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
          >
            <PlusCircle size={20} className="mr-2" />
            Add New Blog
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12 text-lg text-indigo-600">
            <Loader2 className="animate-spin mr-3" size={24} /> Loading blog posts...
          </div>
        ) : blogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-lg text-gray-500 font-medium">
              No blog posts available. Click "Add New Blog" to create your first post!
            </p>
          </div>
        ) : (
          /* Blog List Table */
          <div className="overflow-x-auto shadow-sm border border-gray-100 rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Title</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Author</th>
                  <th className="py-3 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Created</th>
                  <th className="py-3 px-6 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="py-4 px-6 font-medium text-gray-900 truncate max-w-sm">{blog.title}</td>
                    <td className="py-4 px-6 text-gray-600">{blog.author || "Admin"}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-indigo-600 rounded-full hover:bg-indigo-100 transition"
                        title="Edit Post"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 text-red-600 rounded-full hover:bg-red-100 transition disabled:opacity-50"
                        title="Delete Post"
                        disabled={deletingId === blog._id}
                      >
                        {deletingId === blog._id ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <Trash2 size={18} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <AdminBlogFormModal
            setShowModal={setShowModal}
            editingBlog={editingBlog}
          />
        )}
      </div>
    </div>
  );
};

export default AdminBlogPage;