// src/components/home/CustomerReviews.jsx
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomerReviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      id: 1,
      text: "I Am Always Impressed With The Quality Of The Clothingat This Store. The Designs Are Not Only Stylish But Alsodurable, And Every...",
      name: "STEVE JOBS",
      image: "/images/reviews/customer-1.jpg",
    },
    {
      id: 2,
      text: "What I Love Most Is How Effortlessly Their Clothing Combines Elegance With Everyday Wearability. The Fabrics Feel Premium,Flattering.",
      name: "LUCA MORETTI",
      image: "/images/reviews/customer-2.jpg",
    },
    {
      id: 3,
      text: "Their Collections Never Disappoint. From The Stitching To The Silhouettes, You Can Feel The Care Put Into Every Detail. I Get Compliment.",
      name: "ANN SMITH",
      image: "/images/reviews/customer-3.jpg",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-opensans font-bold text-neutral-900 mb-12 text-center md:text-left">
          Customer Reviews
        </h2>

        {/* Desktop View - 3 Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-neutral-100 rounded-2xl p-8 flex flex-col justify-between min-h-[320px]"
            >
              {/* Review Text */}
              <p className="text-neutral-800 text-base leading-relaxed mb-8">
                "{review.text}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <img
                  src={
                    review.image ||
                    `https://placehold.co/80x80?text=${review.name.charAt(0)}`
                  }
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="font-semibold text-neutral-900 text-sm uppercase tracking-wider">
                  {review.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet View - Carousel */}
        <div className="lg:hidden relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-100 transition-colors -ml-4"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-900" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-100 transition-colors -mr-4"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6 text-neutral-900" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-2">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-neutral-100 rounded-2xl p-6 sm:p-8 flex flex-col justify-between min-h-[280px] sm:min-h-[320px]">
                    {/* Review Text */}
                    <p className="text-neutral-800 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
                      "{review.text}"
                    </p>

                    {/* Customer Info */}
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          review.image ||
                          `https://placehold.co/80x80?text=${review.name.charAt(
                            0
                          )}`
                        }
                        alt={review.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
                      />
                      <p className="font-semibold text-neutral-900 text-xs sm:text-sm uppercase tracking-wider">
                        {review.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full ${
                  index === currentSlide
                    ? "w-3 h-3 bg-neutral-900"
                    : "w-3 h-3 bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
