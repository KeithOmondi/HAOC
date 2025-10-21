import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Globe, Menu, X, Phone, Mail } from "lucide-react";
import Navbar from "./Navbar";

const Header = ({ activeHeading, allProperties = [] }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopHeaderRef = useRef(null);
  const mobileHeaderRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  // Sticky logic
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 120);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update spacer height dynamically
  useEffect(() => {
    const updateSpacer = () => {
      const desktopHeight = desktopHeaderRef.current?.offsetHeight || 0;
      const mobileHeight = mobileHeaderRef.current?.offsetHeight || 0;
      const width = window.innerWidth;
      setSpacerHeight(width >= 1024 ? desktopHeight : mobileHeight);
    };

    updateSpacer();
    window.addEventListener("resize", updateSpacer);
    return () => window.removeEventListener("resize", updateSpacer);
  }, []);

  // Search logic
  const handleSearchTermChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = allProperties?.filter((property) =>
      property?.title?.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(filtered || []);
  };

  // Close mobile menu on click outside
  const mobileMenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ===================== DESKTOP HEADER ===================== */}
      <div className="hidden lg:block" ref={desktopHeaderRef}>
        {/* Top Info Bar */}
        <div className="bg-indigo-900 text-white p-2.5">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center space-x-5">
              <span className="flex items-center">
                <Phone size={14} className="mr-1.5 text-teal-400" />
                +254 (0)748 934 9834
              </span>
              <span className="flex items-center">
                <Mail size={14} className="mr-1.5 text-teal-400" />
                contact@haochapchap.com
              </span>
            </div>
            <div className="flex items-center space-x-4 text-gray-300">
              <span className="flex items-center">
                <MapPin size={16} className="mr-1" /> Nairobi, Kenya
              </span>
              <span className="flex items-center">
                <Globe size={16} className="mr-1" /> EN
              </span>
            </div>
          </div>
        </div>

        {/* Main Navigation / Logo */}
        <header
          className={`${
            isSticky
              ? "fixed top-0 left-0 z-50 w-full shadow-xl animate-slideDown"
              : "relative shadow-md"
          } bg-white transition-all duration-300`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between h-[65px] p-4">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/drls2cpnu/image/upload/v1748350947/Hao_Chapchap_logo_h88a00.png"
                alt="Hao Chapchap Logo"
                className="h-10 object-contain rounded-md"
              />
            </Link>

            {/* Navigation */}
            <div className="flex-grow flex justify-center">
              <Navbar active={activeHeading} />
            </div>

            {/* Search + CTA */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  className="w-64 border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-teal-500 transition shadow-sm"
                />
                <Search
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                {searchTerm && searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                    {searchResults.slice(0, 5).map((property) => (
                      <Link
                        key={property._id}
                        to={`/property/${property._id}`}
                        onClick={() => setSearchTerm("")}
                        className="flex items-center p-3 hover:bg-gray-50 border-b last:border-b-0"
                      >
                        <MapPin
                          size={16}
                          className="text-teal-500 mr-2 flex-shrink-0"
                        />
                        <span className="text-sm font-medium truncate">
                          {property.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="bg-teal-500 text-white font-bold px-5 py-2.5 rounded-full hover:bg-teal-600 transition shadow-lg"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </header>
      </div>

      {/* ===================== MOBILE HEADER ===================== */}
      <header
        ref={mobileHeaderRef}
        className="bg-white shadow-lg p-3 fixed top-0 left-0 z-50 w-full lg:hidden"
      >
        <div className="flex justify-between items-center h-[55px]">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-800 p-1 transition duration-200"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link to="/">
            <img
              src="https://res.cloudinary.com/drls2cpnu/image/upload/v1748350947/Hao_Chapchap_logo_h88a00.png"
              alt="Logo"
              className="h-9 object-cover"
            />
          </Link>

          <Link
            to="/login"
            className="text-indigo-600 font-semibold text-sm border border-indigo-200 px-3 py-1 rounded-full hover:bg-indigo-50 transition"
          >
            Sign In
          </Link>
        </div>

        {/* Side Drawer */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="fixed top-0 left-0 w-3/4 h-full bg-white z-[60] shadow-2xl transform transition-transform duration-300"
            style={{
              transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div className="flex flex-col p-6 space-y-6">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              >
                <X size={24} />
              </button>

              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 mt-4 bg-gray-50">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  className="flex-1 outline-none bg-gray-50 text-gray-700"
                />
                <Search size={20} className="text-gray-500 ml-2" />
              </div>

              <Navbar active={activeHeading} onLinkClick={() => setMobileMenuOpen(false)} />

              <Link
                to="/contact"
                className="text-center bg-blue-800 text-white font-bold px-4 py-3 rounded-lg hover:bg-blue-600 transition shadow-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                List Your Property
              </Link>
            </div>
          </div>
        )}

        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}
      </header>

      {/* Dynamic Spacer */}
      <div style={{ paddingTop: spacerHeight }} />
    </>
  );
};

export default Header;
