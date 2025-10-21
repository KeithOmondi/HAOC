import React from "react";
// Removed: import { motion } from "framer-motion";
import {
  Map,          // Replaces FaMapMarkedAlt (Land Registration/Mapping)
  Database,     // Replaces FaDatabase (Digital Records)
  Search,       // Replaces FaSearchLocation (Search & Verification)
  Users,        // Replaces FaUserShield (Access Management)
  BarChart2,    // Replaces FaChartBar (Reports & Analytics)
  Settings,     // Replaces FaCogs (System Integration)
} from "lucide-react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Link } from "react-router-dom";
import WhatsAppButton from "./WhatsAppButton";

// Define the primary color for all icons and accents
const PRIMARY_COLOR_CLASS = "text-indigo-600";
const PRIMARY_BG_CLASS = "bg-indigo-600";
const PRIMARY_HOVER_BG_CLASS = "hover:bg-indigo-700";

// Lucide Icon Component Map
const LucideIconMap = {
  Map,
  Database,
  Search,
  Users,
  BarChart2,
  Settings,
};

// ✅ Updated Service Data with Lucide icons
const services = [
  {
    icon: "Map",
    title: "Digital Land Mapping",
    description: "Visually map land parcels and verify boundaries with integrated GIS and digital survey data.",
  },
  {
    icon: "Database",
    title: "Secure Digital Records",
    description: "Manage all land data in one secure, centralized database, ensuring data immutability and compliance.",
  },
  {
    icon: "Search",
    title: "Land Search & Verification",
    description: "Easily perform title searches, view history, and verify registered ownership details in real-time.",
  },
  {
    icon: "Users",
    title: "Role-Based Access",
    description: "Control access for administrators, land officers, agents, and public users efficiently and securely.",
  },
  {
    icon: "BarChart2",
    title: "Reports & Analytics",
    description: "Generate insightful reports on transactions, land usage, and ownership trends for data-driven decisions.",
  },
  {
    icon: "Settings",
    title: "System Integration",
    description: "Seamless integration with existing government systems and reliable technical support for smooth operations.",
  },
];

const Services = () => {
  return (
    <>
      <Header />

      <section className="py-20 bg-gray-50">
        {/* Hero Section */}
        <div className="text-center mb-16 px-4 max-w-7xl mx-auto">
          <p
            className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-2"
          >
            Core Capabilities
          </p>
          <h1
            className="text-3xl font-bold text-gray-900 leading-tight"
          >
            Our Digital Land Management Services
          </h1>
          <p
            className="text-lg text-gray-600 mt-5 max-w-3xl mx-auto"
          >
            Explore our range of digital land services designed to promote
            transparency, efficiency, and secure ownership verification for government bodies and users alike.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {services.map((service, index) => {
            const IconComponent = LucideIconMap[service.icon];
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col text-left transition-all duration-300 transform hover:shadow-2xl hover:border-indigo-300"
              >
                {/* Icon with accented background circle */}
                <div className={`mb-5 w-14 h-14 flex items-center justify-center rounded-full bg-indigo-50 shadow-md`}>
                  {IconComponent && <IconComponent className={PRIMARY_COLOR_CLASS} size={32} />}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">{service.description}</p>
                
                {/* Optional: Add a call to action link on the card */}
                <Link 
                  to="/contact" 
                  className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition flex items-center group"
                >
                  Explore Details 
                  <span className="ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>

              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-indigo-50 py-16 px-6 rounded-xl max-w-6xl mx-auto border border-indigo-200 shadow-lg">
          <h2
            className="text-4xl font-extrabold text-gray-900"
          >
            Ready to Transform Your Land Records?
          </h2>
          <p
            className="text-lg text-indigo-800 mt-3 mb-8 max-w-3xl mx-auto"
          >
            Contact us today to schedule a demo and begin your journey toward secure and
            transparent digital land management.
          </p>
          <div>
            <Link
              to="/contact"
              className={`inline-block ${PRIMARY_BG_CLASS} text-white px-10 py-4 text-lg rounded-full font-bold shadow-2xl ${PRIMARY_HOVER_BG_CLASS} transition transform hover:scale-105`}
            >
              Get in Touch Today
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Services;