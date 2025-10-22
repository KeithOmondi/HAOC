import React from "react";
import {
  FaShieldAlt,
  FaHandsHelping,
  FaThumbsUp,
  FaRocket,
} from "react-icons/fa";

// Define the primary color (Navy Blue) for easy updates
const PRIMARY_COLOR = "text-blue-800"; // Tailwind class for Navy Blue text

const reasons = [
  {
    // Icon color set to the primary navy blue
    icon: <FaShieldAlt size={48} className={PRIMARY_COLOR} />,
    title: "Trusted & Reliable",
    description:
      "We prioritize your safety and satisfaction by offering only verified and quality properties.",
  },
  {
    icon: <FaHandsHelping size={48} className={PRIMARY_COLOR} />,
    title: "Dedicated Support",
    description:
      "Our dedicated support team is available 24/7 to assist you with any questions or concerns.",
  },
  {
    icon: <FaThumbsUp size={48} className={PRIMARY_COLOR} />,
    title: "Best Value Deals",
    description:
      "We offer competitive prices and exclusive discounts, ensuring you get the best value for your money.",
  },
  {
    icon: <FaRocket size={48} className={PRIMARY_COLOR} />,
    title: "Fast & Easy Process",
    description:
      "From browsing to buying, our streamlined process makes property acquisition smooth and hassle-free.",
  },
];

const WhyUs = () => {
  return (
    // Use a light background for contrast, added padding
    <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title in Navy Blue, bold, modern tracking */}
        <h2 className={`text-3xl font-bold tracking-tight ${PRIMARY_COLOR} sm:text-4xl mb-4`}>
          Why Choose Us?
        </h2>
        {/* Subtitle with slightly better contrast and more spacing */}
        <p className="mt-4 text-xl text-gray-600 max-w-4xl mx-auto mb-16">
          Discover the advantages that set us apart. We’re committed to providing you with a superior real estate experience.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon, title, description }, idx) => (
            <div
              key={idx}
              // Card styling: White background, subtle border, rounded corners, shadow
              className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 transform hover:scale-105 transition-all duration-500 ease-in-out"
            >
              {/* Icon wrapper: Centered with a circle background (optional accent) */}
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-blue-100 rounded-full inline-flex items-center justify-center">
                  {icon}
                </div>
              </div>
              {/* Title: Darker color for emphasis, slightly larger font */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
              {/* Description: Good contrast and readability */}
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;