import React, { useState, useEffect } from "react";
import Button from "../common/Button.jsx";
import { slides } from "../../data/heroSlides.js";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 5 seconds

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full h-[50vh] md:h-[65vh] lg:min-h-[70vh] overflow-hidden font-montserrat">
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
                <p className="text-accent-50 text-sm sm:text-base font-medium tracking-wide">
                  {slide.tag}
                </p>

                {/* Main Heading */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-accent-50 leading-tight">
                  {slide.title}
                </h1>

                {/* CTA Button */}
                <Button to={"/shop"} variant="primary" size="md">
                  Shop Now
                </Button>
              </div>

              {/* Right Side - Image */}
              <div className="relative w-full h-full flex items-center justify-center lg:justify-end lg:col-span-5 xl:col-span-6 lg:-ml-12 xl:-ml-16">
                {/* Decorative Circle Background */}
                <div className="absolute w-75 h-75 sm:w-85 sm:h-85 md:w-112.5 md:h-112.5 lg:w-137.5 lg:h-137.5 bg-white/10 rounded-full -right-20 sm:-right-24 md:-right-28 lg:-right-32" />

                {/* Product Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="relative z-10 w-75 sm:w-100 md:w-112.5 lg:w-125 object-cover drop-shadow-2xl"
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
