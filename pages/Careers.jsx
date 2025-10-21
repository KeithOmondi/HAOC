import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, ArrowRight, Loader2, Mail } from "lucide-react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import WhatsAppButton from "./WhatsAppButton";
import { fetchCareers, clearCareerState } from "../redux/slices/careerSlice";

// --- Career Card Component ---
const CareerCard = ({
  title = "No title",
  location = "N/A",
  type = "N/A",
  description = "No description available",
}) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6 text-left transition duration-300 transform hover:shadow-lg hover:border-amber-500">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
    
    {/* Job Details Row */}
    <div className="flex items-center text-sm text-gray-600 space-x-4 mb-4 pb-2 border-b border-gray-100">
      <span className="flex items-center font-medium">
        <MapPin size={16} className="mr-1.5 text-blue-900" /> {location}
      </span>
      <span className="flex items-center font-medium">
        <Clock size={16} className="mr-1.5 text-blue-900" /> {type}
      </span>
      <span className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-semibold uppercase">
        Available
      </span>
    </div>
    
    <p className="text-gray-700 mb-5 line-clamp-3">{description}</p>
    
    <Link
      to={`/apply/${title.toLowerCase().replace(/\s/g, '-')}`} 
      className="inline-flex items-center text-blue-900 hover:text-blue-700 font-semibold transition group"
    >
      View Details & Apply
      <ArrowRight size={18} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  </div>
);
// --- Main Careers Component ---
const Careers = () => {
  const dispatch = useDispatch();
  const { careers = [], loading, error } = useSelector((state) => state.careers);

  useEffect(() => {
    dispatch(fetchCareers());
    return () => {
      dispatch(clearCareerState());
    };
  }, [dispatch]);

  const activeCareers = careers.filter((c) => c.isActive !== false);

  return (
    <>
      <Header />

      {/* Hero Section: Deep Navy Blue */}
      <section className="bg-blue-900 text-white py-20 px-5">
        <div className="max-w-5xl mx-auto text-center">
          <Briefcase size={40} className="mx-auto mb-4 text-amber-400" />
          <h1 className="text-5xl font-extrabold mb-4">Join Our Team of Innovators</h1>
          <p className="text-blue-200 text-lg max-w-3xl mx-auto">
            We're building the future of real estate technology. If you're passionate about innovation, transparency, and growth, explore our opportunities below.
          </p>
        </div>
      </section>

      {/* Career Listings Section */}
      <div className="bg-gray-50 py-16 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Current Openings</h2>

          {/* Loading & Error */}
          {loading && (
            <div className="flex justify-center items-center py-10 text-lg text-blue-900">
              <Loader2 className="animate-spin mr-3" size={24} /> Loading open roles...
            </div>
          )}
          {error && (
            <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5">
                <strong className="font-bold">Error:</strong> {error}
            </div>
          )}

          {/* Listings */}
          <div className="space-y-6">
            {activeCareers.length > 0 ? (
              activeCareers.map((career) => (
                <CareerCard key={career._id} {...career} />
              ))
            ) : (
              !loading && !error && (
                <div className="text-center py-10 text-gray-500 bg-white rounded-xl shadow-md border border-dashed border-gray-300">
                    <h3 className="text-xl font-semibold mb-2">No Openings Right Now</h3>
                    <p>Check back soon, or send us your resume via the contact link below.</p>
                </div>
              )
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center bg-blue-50 border border-blue-200 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Don't see your perfect role?</h3>
            <p className="text-blue-800 mb-6 max-w-2xl mx-auto">
              We're always looking for exceptional talent in real estate, technology, and operations. Send us your CV for future consideration.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center bg-blue-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-800 transition transform hover:scale-[1.02]"
            >
              <Mail size={20} className="mr-2" />
              Submit General Application
            </Link>
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Careers;