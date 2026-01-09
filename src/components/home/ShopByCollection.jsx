import React from "react";
import { ArrowRight } from "lucide-react";
import { collections } from "../../data/products";

const ShopByCollection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-6 sm:px-8 lg:px-12 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
            Shop by Collection
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Explore our curated selection of premium apparel
          </p>
        </div>

        {/* Collection Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <a
              key={collection.id}
              //   href={collection.link}
              href="/"
              className="group relative overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-sm sm:text-base font-medium text-white/90 mb-2">
                  {collection.count}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  {collection.title}
                </h3>

                {/* Shop Now Button */}
                <div className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold uppercase tracking-wider border-b-2 border-white pb-1 group-hover:gap-4 transition-all duration-300">
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Hover Effect Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCollection;
