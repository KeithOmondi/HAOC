// src/components/Blog/BlogCard.jsx
import React from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const BlogCard = ({ _id, author = "Realty Blogger", title, content, image, date }) => {
  const formattedDate = new Date(date || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleCopyLink = () => {
    const blogUrl = `${window.location.origin}/blogs/${_id}`;
    navigator.clipboard.writeText(blogUrl);
    alert("🔗 Blog link copied to clipboard!");
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <img
        src={image || "/default-blog.jpg"}
        onError={(e) => (e.target.src = "/default-blog.jpg")}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-4">
          <img
            src="https://i.pravatar.cc/40?img=8"
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-3 border border-blue-400"
          />
          <div>
            <p className="font-semibold text-gray-800 text-sm">{author}</p>
            <p className="text-xs text-gray-500">Posted on {formattedDate}</p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{title}</h2>
        <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">{content}</p>

        <Link
          to={`/blogs/${_id}`}
          className="self-start bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Read More
        </Link>

        <div className="flex justify-end mt-4 space-x-4 pt-3 border-t border-gray-100 text-gray-500 text-lg">
          <Link to="/" title="Facebook" className="hover:text-blue-600">
            <FaFacebookF />
          </Link>
          <Link to="/" title="Twitter" className="hover:text-blue-400">
            <FaTwitter />
          </Link>
          <button title="Copy Link" onClick={handleCopyLink} className="hover:text-gray-800">
            <IoShareSocialSharp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
