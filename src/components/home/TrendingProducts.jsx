import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Eye,
  ShoppingBag,
} from "lucide-react";
import { trending_products } from "../../data/products";

const TrendingProducts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState({});

  // Responsive slides per view
  const getSlidesPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 4;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  React.useEffect(() => {
    const handleResize = () => setSlidesPerView(getSlidesPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxSlides = Math.ceil(trending_products.length / slidesPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <section className="py-16 px-6 sm:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Trending Products
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Fashion Is Not Just About Clothes But Also
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Arrows */}
          {/* <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
            disabled={currentSlide === maxSlides - 1}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button> */}

          {/* Products Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {trending_products.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  {/* Product Card */}
                  <div className="overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group/card">
                    {/* Image Container */}
                    <div className="relative bg-gray-100 aspect-square overflow-hidden">
                      {/* Badges */}
                      {/* <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                        {product.badge && (
                          <span className="bg-white text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                            {product.badge}
                          </span>
                        )}
                        {product.discount && (
                          <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {product.discount}%
                          </span>
                        )}
                      </div> */}

                      {/* Sold Out Badge */}
                      {product.soldOut && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <span className="bg-white text-gray-900 text-sm font-bold px-6 py-3 rounded-full border-2 border-gray-900">
                            SOLD OUT
                          </span>
                        </div>
                      )}

                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110 ${
                          product.soldOut ? "opacity-50" : ""
                        }`}
                      />

                      {/* Quick Action Icons */}
                      {/* <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="bg-white rounded-full p-2 hover:bg-gray-900 hover:text-white transition-colors duration-300"
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              favorites[product.id]
                                ? "fill-red-500 text-red-500"
                                : ""
                            }`}
                          />
                        </button>
                        <button className="bg-white rounded-full p-2 hover:bg-gray-900 hover:text-white transition-colors duration-300">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div> */}

                      {/* Add to Cart Button */}
                      {/* {!product.soldOut && (
                        <button className="absolute bottom-0 left-0 right-0 bg-neutral-black text-neutral-white cursor-pointer py-3 flex items-center justify-center gap-2 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                          <ShoppingBag className="w-5 h-5" />
                          <span className="font-regular text-lg">Add to Cart</span>
                        </button>
                      )} */}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-gray-600 transition-colors cursor-pointer">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-3">
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-sm">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-gray-900 font-bold text-lg">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Color Swatches */}
                      {product.colors && (
                        <div className="flex gap-2">
                          {product.colors.map((color, index) => (
                            <button
                              key={index}
                              className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-900 transition-colors"
                              style={{ backgroundColor: color }}
                              aria-label={`Select ${color} color`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "w-8 bg-gray-900"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 font-semibold uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors duration-300">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
