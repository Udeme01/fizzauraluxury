import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { fetchProducts } from "../../lib/fetchProducts";
import { shuffleArray } from "../../utils/helpers";

const ShopByCollection = () => {
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollection = async () => {
      setLoading(true);
      const data = await fetchProducts();
      const filtered = data.filter((product) => product.category);
      const shuffled = shuffleArray(filtered);
      setCollection(shuffled.slice(0, 3));
      setLoading(false);
    };

    loadCollection();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-16 md:py-20 font-montserrat">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading Collections...</p>
          </div>
        </div>
      </section>
    );
  }

  // No products state
  if (collection.length === 0) {
    return (
      <section className="py-16 md:py-20 font-montserrat">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
              Shop by Collection
            </h2>
            <p className="text-gray-600">No collection at the moment</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white font-montserrat">
      <div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6 sm:px-8">
          {collection.map((collection) => {
            // console.log(collection.category);
            return (
              <div
                key={collection.id}
                //   href={collection.link}
                href="/"
                className="group relative overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-3/4 overflow-hidden bg-gray-100">
                  <img
                    src={collection.images[0]}
                    alt={collection.name}
                    className="w-200 h-fit object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {/* <p className="text-sm sm:text-base font-medium text-white/90 mb-2">
                    {collection.count}
                  </p> */}
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    {collection.name}
                  </h3>

                  {/* Shop Now Button */}
                  <Button
                    to={`shop?category=${collection.category}`}
                    variant="primary"
                    size="md"
                  >
                    Shop Now
                  </Button>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShopByCollection;
