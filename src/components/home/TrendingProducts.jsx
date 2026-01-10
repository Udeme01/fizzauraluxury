import { trending_products } from "../../data/products";

const TrendingProducts = () => {
  return (
    <section className="py-16 md:py-20 font-montserrat">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl text-gray-900 mb-4">
            Trending Products
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Fashion Is Not Just About Clothes But Also
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Products Slider */}
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out">
              {trending_products.map((product) => (
                <div key={product.id} className="shrink-0 pr-6">
                  {/* Product Card */}
                  <div className="overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group/card">
                    {/* Image Container */}
                    <div className="relative bg-gray-100 aspect-square overflow-hidden">
                      {/* Sold Out Badge */}
                      {/* {product.soldOut && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <span className="bg-white text-gray-900 text-sm font-bold px-6 py-3 rounded-full border-2 border-gray-900">
                            SOLD OUT
                          </span>
                        </div>
                      )} */}

                      {/* Product Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110 ${
                          product.soldOut ? "opacity-50" : ""
                        }`}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="py-4">
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
        </div>

        {/* View All Button */}
        <div className="text-center mt-6">
          <button className="inline-block px-8 py-3 border border-gray-900 text-gray-900 font-semibold uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-colors duration-300 cursor-pointer">
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
