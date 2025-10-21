import React from "react";
import { X, Calendar, MapPin, Ticket } from "lucide-react"; // Import Lucide icons

const EventModal = ({ event, isOpen, onClose }) => {
  if (!isOpen || !event) return null;

  const { title, description, date, location, image } = event;
  
  // Format the date for better readability
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    // Backdrop with smooth transition
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center p-4 sm:p-6 z-50 transition-opacity duration-300">
      
      {/* Modal Container: Larger max-width, elevated shadow, better rounded corners */}
      <div className="bg-white rounded-2xl max-w-2xl w-full relative shadow-2xl transform scale-100 transition-transform duration-300">
        
        {/* Close Button: Styled with a circle for better visibility */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition z-10 shadow-md"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Event Image Section */}
        {image && (
          <div className="w-full h-64 md:h-80 overflow-hidden rounded-t-2xl">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        )}

        {/* Event Content Section: Added padding for internal spacing */}
        <div className="p-6 sm:p-8">
          
          {/* Title */}
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3 leading-snug">{title}</h2>
          
          {/* Metadata (Date & Location) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 border-b pb-4">
            <p className="flex items-center text-indigo-600 font-semibold">
              <Calendar size={18} className="mr-2" />
              {formattedDate}
            </p>
            <p className="flex items-center text-gray-700">
              <MapPin size={18} className="mr-2 text-indigo-500" />
              {location}
            </p>
          </div>
          
          {/* Description */}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">About the Event</h3>
          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap mb-8">{description}</p>

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-200 flex items-center"
            >
              <Ticket size={20} className="mr-2" />
              Get Tickets / Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;