import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import WhatsAppButton from "./WhatsAppButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission delay
    setTimeout(() => {
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-10 px-4">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              We'd love to hear from you! Whether you have a question about
              products, pricing, or anything else, our team is ready to help.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <FaPhoneAlt className="text-blue-900 text-xl" />
              <span className="text-gray-700">+254 (0)748 934 9834</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <FaEnvelope className="text-blue-900 text-xl" />
              <span className="text-gray-700">contact@haochapchap.com</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <FaMapMarkerAlt className="text-blue-900 text-xl" />
              <span className="text-gray-700">Nairobi, Kenya</span>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <a
                href="#"
                className="text-blue-900 hover:text-blue-600 transition"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-blue-900 hover:text-blue-600 transition"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-blue-900 hover:text-blue-600 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex flex-col justify-center">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-900 text-white py-2 rounded-md hover:bg-blue-800 transition"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <Footer />
      <ToastContainer position="top-right" autoClose={4000} />
    </>
  );
};

export default ContactPage;
