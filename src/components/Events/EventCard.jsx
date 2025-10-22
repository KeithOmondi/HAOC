import React, { useState } from "react";
import EventModal from "./EventModal";

const EventCard = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return null;

  const { title, description, date, location, image } = data;

  return (
    <>
      <div className="min-w-[320px] max-w-sm bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
        {/* Image */}
        <img
          src={image || "/placeholder.jpg"}
          alt={title}
          className="rounded-md mb-4 h-48 w-full object-cover"
        />

        {/* Content */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-3 truncate">{description}</p>

        {/* Date & location */}
        <p className="text-sm text-gray-500 mb-4">
          {new Date(date).toLocaleDateString()} | {location}
        </p>

        {/* Learn More button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
        >
          Learn More
        </button>
      </div>

      {/* Modal */}
      <EventModal
        event={data}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default EventCard;
