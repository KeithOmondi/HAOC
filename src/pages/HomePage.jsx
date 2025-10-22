import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import BestDeals from "../components/Route/BestDeals.jsx/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Footer from "../components/Layout/Footer";
import Categories from "../components/Route/Categories/Categories";
import Banner from "../components/Route/Banner.jsx/Banner";
import VideoSection from "../components/Route/Hero/VideoSection";
import WhyUs from "./WhyUs";
import WhatsAppButton from "./WhatsAppButton";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Categories />
      <VideoSection />
      
      <Banner />
      <WhyUs />
      <FeaturedProduct />
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default HomePage;
