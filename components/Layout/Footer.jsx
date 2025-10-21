import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
            We provide top-notch real-estate and services tailored for modern businesses and individuals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-[#17dd1f]">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#eee]">About</Link></li>
            <li><Link to="/events" className="hover:text-[#eee]">Events</Link></li>
            <li><Link to="/listings" className="hover:text-[#eee]">All Listings</Link></li>
            <li><Link to="/services" className="hover:text-[#eee]">Services</Link></li>
            <li><Link to="/contact" className="hover:text-[#eee]">Contact</Link></li>

          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@haochapchap.com</li>
            <li>Phone: +254 748 377 974</li>
            <li>Location: Nairobi, Kenya</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-[#eee]"><FaFacebookF /></a>
            <a href="#" className="hover:text-[#eee]"><FaTwitter /></a>
            <a href="#" className="hover:text-[#eee]"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} HaoChapChap. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
