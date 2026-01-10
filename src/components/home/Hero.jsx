// src/components/home/Hero.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides data
  const slides = [
    {
      id: 1,
      tag: "Cap Featuring Raised",
      title: "Profile Unisex Baseball",
      image: "/images/hero/h2.png",
      bgColor: "bg-[#6B4423]", // Brown
    },
    {
      id: 2,
      tag: "New Collection 2026",
      title: "Elegant Fashion Styles",
      image: "/images/hero/h3.png",
      bgColor: "bg-[#2C3E50]", // Dark blue
    },
    {
      id: 3,
      tag: "Premium Quality",
      title: "Timeless Luxury Wear",
      image: "/images/hero/h5.png",
      bgColor: "bg-[#1C4532]", // Dark green
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[50vh] lg:min-h-[70vh] overflow-hidden font-montserrat">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Color */}
          <div className={`absolute inset-0 ${slide.bgColor}`} />

          {/* Content Container */}
          <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-12 h-full items-center gap-0">
              {/* Left Side - Text Content */}
              <div className="flex flex-col justify-center space-y-6 lg:space-y-8 w-full h-full lg:col-span-7 xl:col-span-6">
                {/* Small Tag */}
                <p className="text-white/90 text-sm sm:text-base font-medium tracking-wide">
                  {slide.tag}
                </p>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
                  {slide.title}
                </h1>

                {/* CTA Button */}
                <div>
                  <Link
                    to="/shop"
                    className="inline-block text-white text-sm sm:text-base font-semibold uppercase tracking-widest border-b-2 border-white pb-2 hover:opacity-80 transition-opacity"
                  >
                    Shop Collection
                  </Link>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative w-full h-full flex items-center justify-center lg:justify-end lg:col-span-5 xl:col-span-6 lg:-ml-12 xl:-ml-16">
                {/* Decorative Circle Background */}
                <div className="absolute w-87.5 h-87.5 sm:w-112.5 sm:h-112.5 md:w-125 md:h-125 lg:w-137.5 lg:h-137.5 bg-white/10 rounded-full -right-20 sm:-right-24 md:-right-28 lg:-right-32" />

                {/* Product Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="relative z-10 w-75 sm:w-100 md:w-112.5 lg:w-125 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
          {/* Content Container */}
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? "w-3 h-3 bg-white rounded-full"
                : "w-3 h-3 bg-white/40 rounded-full hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
