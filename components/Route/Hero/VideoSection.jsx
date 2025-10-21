import React from "react";
import { Link } from "react-router-dom";

const VideoSection = () => {
  return (
    <section className="w-full bg-gray-100 py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Block */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Your Dream Home
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Get a closer look at homes across the city through guided video tours and expert insights.
            Whether you're buying or renting, experience your future home before stepping foot inside.
          </p>
          <Link
            to="/user/bookings"
            className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition shadow-md"
          >
            Book a Tour
          </Link>
        </div>

        {/* Video Block */}
        <div className="w-full rounded-2xl overflow-hidden shadow-xl">
          <video
            className="w-full h-full object-cover rounded-2xl"
            autoPlay
            muted
            loop
            playsInline
          >
            <source
              src="https://videos.pexels.com/video-files/10375436/10375436-sd_640_360_30fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
