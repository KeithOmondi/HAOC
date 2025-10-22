// src/pages/Blog/BlogPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../redux/slices/blogSlice";
import BlogCard from "../components/Blog/BlogCard"
import Header from "../components/Layout/Header";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Layout/Footer";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <>
      <Header activeHeading={5} />

      <section className="bg-gray-100 min-h-screen py-12 px-6">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
          Our Latest <span className="text-blue-600">Real Estate Insights</span>
        </h1>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader />
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-red-500 text-lg font-medium mb-6">
            ⚠️ {error}
          </p>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {blogs.map((post) => (
              <BlogCard
                key={post._id}
                _id={post._id}
                title={post.title}
                author={post.author}
                content={post.content}
                image={post.image}
                date={post.createdAt}
              />
            ))}
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <p className="text-center text-gray-500 text-lg mt-8">
            No blogs available yet.
          </p>
        )}
      </section>

      <Footer />
    </>
  );
};

export default BlogPage;
