import React from "react";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div className="w-full">
      {!isLoading && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Popular Events</h1>
          </div>

          {/* Event Content */}
          <div className="w-full grid">
            {allEvents.length !== 0 ? (
              <EventCard data={allEvents[0]} />
            ) : (
              <h4 className="text-center text-lg text-gray-600">
                No Events available!
              </h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
