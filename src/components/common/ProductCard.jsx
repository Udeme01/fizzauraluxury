import React from "react";
import { Link } from "react-router";

const ProductCard = ({ product, viewMode }) => {
  // console.log(product);
  return (
    <>
      <Link
        key={product.id}
        to={`/product/${product.id}`}
        className={
          viewMode === "grid"
            ? "group bg-white overflow-hidden transition-all duration-300"
            : "group bg-white overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-row"
        }
      >
        {/* Product Image */}
        <div
          className={
            viewMode === "grid"
              ? "relative overflow-hidden bg-neutral-100"
              : "relative overflow-hidden bg-neutral-100 w-40 md:w-48 shrink-0"
          }
        >
          <img
            src={
              product.images[0] ||
              `https://placehold.co/400x500?text=${product.name}`
            }
            alt={product.name}
            className={
              viewMode === "grid"
                ? "w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                : "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            }
          />
        </div>

        {/* Product Info */}
        <div
          className={
            viewMode === "grid"
              ? "py-4 leading-relaxed"
              : "p-4 flex-1 flex flex-col justify-center"
          }
        >
          {/* Category */}
          <p className="text-[10px] text-neutral-black/50 uppercase tracking-wider mb-1">
            {product.category}
          </p>

          {/* Product Name */}
          <h3
            className={
              viewMode === "grid"
                ? "font-semibold text-lg text-neutral-black mb-2 line-clamp-2"
                : "font-semibold text-lg text-neutral-900 mb-2"
            }
          >
            {product.name}
          </h3>

          {/* Description - List view only */}
          {viewMode === "list" && (
            <p className="text-sm text-neutral-600 mb-3 line-clamp-2 hidden md:block">
              {product.description}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-neutral-black">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProductCard;
