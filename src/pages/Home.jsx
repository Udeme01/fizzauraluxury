import React from "react";
import Hero from "../components/home/Hero";
import TrendingProducts from "../components/home/TrendingProducts";
import FeaturesSection from "../components/home/FeaturesSection";
import NewArrivals from "../components/home/NewArrivals";

const Home = () => {
  return (
    <>
      <Hero />
      <TrendingProducts />
      <NewArrivals />
      <FeaturesSection />
    </>
  );
};

export default Home;
