import { Link } from "react-router-dom";
import Badge from "./Badge";

const ProductCard = ({ product, className = "" }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className={`group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 ${className}`}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-neutral-100">
        <img
          src={
            product.images?.[0] ||
            `https://placehold.co/400x500?text=${product.name}`
          }
          alt={product.name}
          className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <Badge variant="accent">New</Badge>}
          {!product.inStock && <Badge variant="danger">Sold Out</Badge>}
          {product.oldPrice && <Badge variant="success">Sale</Badge>}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary-600">
            ₦{product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-neutral-400 line-through">
              ₦{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;