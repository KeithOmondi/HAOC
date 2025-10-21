import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../redux/slices/eventSlice";

import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Layout/Footer";

const EventsPage = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  // Fetch events on mount
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header activeHeading={4} />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Upcoming <span className="text-blue-600">Events</span>
        </h2>

        {error && (
          <p className="text-center text-red-500 mb-6">
            ⚠️ {error}
          </p>
        )}

        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => {
              // Ensure image is a string URL
              const eventData = {
                ...event,
                image:
                  typeof event.image === "string"
                    ? event.image
                    : event.image?.url || "/placeholder.jpg",
              };
              return <EventCard key={event._id} data={eventData} />;
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No upcoming events available.
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;
