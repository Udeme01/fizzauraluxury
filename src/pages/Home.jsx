import React from "react";
import Hero from "../components/home/Hero";
import TrendingProducts from "../components/home/TrendingProducts";
import FeaturesSection from "../components/home/FeaturesSection";
import NewArrivals from "../components/home/NewArrivals";
import PromoBanner from "../components/home/PromoBanner";
import CustomerReviews from "../components/home/CustomerReviews";
import ShopByCollection from "../components/home/ShopByCollection";

const Home = () => {
  return (
    <>
      <Hero />
      <NewArrivals />
      <ShopByCollection />
      <PromoBanner />
      <TrendingProducts />
      <FeaturesSection />
      <CustomerReviews />
    </>
  );
};

export default Home;
