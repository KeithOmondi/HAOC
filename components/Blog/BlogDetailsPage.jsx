import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById } from "../../redux/slices/blogSlice";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBlog, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!selectedBlog)
    return <p className="text-center py-10">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <img
        src={selectedBlog.image}
        alt={selectedBlog.title}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{selectedBlog.title}</h1>
      <p className="text-gray-700 leading-relaxed">{selectedBlog.content}</p>
      <p className="text-sm text-gray-500 mt-4">By {selectedBlog.author}</p>
    </div>
  );
};

export default BlogDetailsPage;
