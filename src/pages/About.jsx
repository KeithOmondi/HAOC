import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import WhatsAppButton from "./WhatsAppButton";
import { Target, Eye, Shield, Home, TrendingUp, Zap, Users } from "lucide-react"; // Updated Lucide icons for Real Estate theme

const About = () => {
  return (
    <>
      <Header />

      {/* Hero/Intro Section: Elevated background and padding */}
      <section className="py-20 bg-indigo-50 border-b border-indigo-100">
        <div className="max-w-6xl mx-auto text-center px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            Your Trusted Digital Property Partner
          </p>
          <h1
            className="text-5xl font-extrabold text-gray-900 leading-tight"
          >
            About Hao Chapchap Real Estate Platform
          </h1>
          <p
            className="text-lg text-gray-600 mt-5 max-w-4xl mx-auto"
          >
            Hao Chapchap is the leading digital platform designed to simplify the journey of <p className="font-bold">buying, selling, and renting property</p>. Our goal is to provide secure, transparent, and verified listings, empowering every client with the tools needed for fast, informed decisions in the real estate market.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section: Distinct, two-column layout */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4 sm:px-6">
          
          {/* Mission Card */}
          <div className="bg-white border border-indigo-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300">
            <Target size={32} className="text-teal-600 mb-4 bg-teal-50 p-2 rounded-full" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To enhance <p className="font-bold">market efficiency and trust</p> by connecting verified buyers and sellers through modern, reliable, and secure digital tools. We strive to complete property transactions "Chapchap" (quickly and efficiently) for everyone.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white border border-indigo-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition duration-300">
            <Eye size={32} className="text-teal-600 mb-4 bg-teal-50 p-2 rounded-full" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To be the most <p className="font-bold">trusted and innovative</p> digital real estate ecosystem in the region, setting the standard for property technology and empowering users to achieve their homeownership and investment goals seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features/Value Proposition Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2
              className="text-3xl font-bold text-gray-900 mb-3"
            >
              How We Deliver Value
            </h2>
            <p
              className="text-gray-600 max-w-3xl mx-auto text-lg"
            >
              We focus on transparency, speed, and accuracy to make your property experience exceptional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard icon={Home} title="Verified Listings" description="Every property listing is physically inspected and legally vetted for accuracy before going live." />
              <FeatureCard icon={TrendingUp} title="Market Insights" description="Access real-time pricing data, neighborhood trends, and investment analytics to guide decisions." />
              <FeatureCard icon={Zap} title="Fast Transactions" description="Our digital workflows and dedicated agents minimize paperwork and accelerate the closing process." />
              <FeatureCard icon={Users} title="Dedicated Support" description="Receive personalized support from certified real estate professionals available 24/7." />
          </div>
        </div>
      </section>


      <WhatsAppButton />
      <Footer />
    </>
  );
};

// Helper component for cleaner main component structure
const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full">
        <div className="flex items-center space-x-3 mb-3">
            <Icon size={24} className="text-teal-600" />
            <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);

export default About;