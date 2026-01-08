// src/components/home/Hero.jsx
import React, { useState } from "react";
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

  return (
    <section className="relative w-full h-[50vh] lg:min-h-[70vh] overflow-hidden">
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
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-2 gap-8 h-full items-center">
              {/* Left Side - Text Content */}
              <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
                {/* Small Tag */}
                <p className="text-white/90 text-sm sm:text-base font-medium tracking-wide">
                  {slide.tag}
                </p>

                {/* Main Heading */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-white leading-tight">
                  {slide.title}
                </h1>

                {/* CTA Button */}
                <div>
                  <Link
                    to="/shop"
                    className="inline-block text-white text-sm sm:text-base font-semibold uppercase tracking-widest border-b-2 border-white pb-2 hover:opacity-80 transition-opacity sm:border-red-500 md:border-green-600"
                  >
                    Shop Collection
                  </Link>
                </div>
              </div>

              {/* Right Side - Image */}
              <div className="relative w-full h-full flex items-center justify-center lg:justify-end">
                {/* Decorative Circle Background */}
                <div className="absolute w-100 h-100 sm:w-115 sm:h-115 md:w-125 md:h-125 bg-white/10 rounded-full -right-60 lg:-right-48" />
                {/* Product Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="relative z-10"
                />
              </div>
            </div>
          </div>
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
