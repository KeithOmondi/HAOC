import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";


const videos = [
  "https://videos.pexels.com/video-files/7578541/7578541-uhd_3840_2160_30fps.mp4",
  "https://videos.pexels.com/video-files/7578553/7578553-uhd_3840_2160_30fps.mp4",
  "https://videos.pexels.com/video-files/7578546/7578546-uhd_3840_2160_30fps.mp4",
  "https://videos.pexels.com/video-files/7578552/7578552-uhd_3840_2160_30fps.mp4",
];

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(console.error);
    }
  }, [currentVideoIndex]);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={videos[currentVideoIndex]}
          autoPlay
          muted
          playsInline
          onEnded={() =>
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length)
          }
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Hao ChapChap
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-200 max-w-2xl">
            Budget-Friendly Homes with Big Comfort.
          </p>
          <motion.button
            className="mt-8 px-8 py-3 rounded-full bg-white text-blue-900 font-semibold text-lg shadow-lg hover:bg-blue-100 transition"
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start Your Search
          </motion.button>
        </motion.div>
      </div>

    
    </>
  );
};

export default Hero;
