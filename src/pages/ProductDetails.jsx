// src/pages/ProductDetail.jsx
import { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Truck,
  RefreshCw,
  Shield,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { products } from "../data/products";
import { CartContext } from "../context/shoppingCartContext";

const ProductDetail = () => {
  const { addItemToCart, items } = useContext(CartContext);

  const handleAddItemToCart = () => {
    addItemToCart(id, quantity, selectedSize, selectedColor);
  };

  const { id: urlId } = useParams();
  const id = parseInt(urlId);
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Touch/Swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // If product not found
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            Product Not Found
          </h2>
          <Link
            to="/shop"
            className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // Get related products (same category)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Handle quantity changes
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Image navigation
  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && productImages.length > 1) {
      nextImage();
    }
    if (isRightSwipe && productImages.length > 1) {
      prevImage();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // // Handle add to cart
  // const handleAddToCart = () => {
  //   if (product.sizes && product.sizes.length > 0 && !selectedSize) {
  //     alert("Please select a size");
  //     return;
  //   }
  //   if (product.colors && product.colors.length > 0 && !selectedColor) {
  //     alert("Please select a color");
  //     return;
  //   }
  //   // Add to cart logic here
  //   alert(`Added ${quantity} x ${product.name} to cart!`);
  // };

  return (
    <div className="bg-neutral-50 min-h-screen font-montserrat">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Home
            </Link>
            <span className="text-neutral-400">/</span>
            <Link
              to="/shop"
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Shop
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-900 capitalize">
              {product.category}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery - SWIPEABLE */}
          <div className="space-y-4">
            {/* Main Image with Swipe */}
            <div
              className="relative bg-neutral-100 aspect-square overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={productImages[selectedImage]}
                alt={`${product.name} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              {/* <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-accent-500 text-neutral-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    New
                  </span>
                )}
                {product.oldPrice && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Sale
                  </span>
                )}
                {!product.inStock && (
                  <span className="bg-neutral-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                    Sold Out
                  </span>
                )}
              </div> */}

              {/* Favorite Button */}
              {/* <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 bg-white rounded-full p-3 hover:bg-neutral-50 transition-colors shadow-lg"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-neutral-600"
                  }`}
                />
              </button> */}

              {/* Navigation Arrows - Show if multiple images */}
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-neutral-900" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-neutral-900" />
                  </button>
                </>
              )}

              {/* Image Counter Dots */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedImage === index
                          ? "bg-white w-6"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Images - Desktop */}
            {productImages.length > 1 && (
              <div className="hidden md:grid md:grid-cols-4 gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-neutral-100 overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-neutral-900"
                        : "border-transparent hover:border-neutral-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <p className="text-sm text-neutral-500 uppercase tracking-wider">
              {product.category}
            </p>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">
              {product.name}
            </h1>

            {/* Rating (if available) */}
            {/* {product.rating && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-neutral-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-neutral-600">
                  ({product.reviews || 0} reviews)
                </span>
              </div>
            )} */}

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-neutral-900">
                ₦{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="text-xl text-neutral-400 line-through">
                  ₦{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-neutral-600 leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-neutral-200 pt-6 space-y-6">
              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-3">
                    Color{" "}
                    {selectedColor && (
                      <span className="font-normal text-neutral-600">
                        - {selectedColor}
                      </span>
                    )}
                  </label>
                  <div className="flex gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2"
                            : "border-neutral-300 hover:border-neutral-500"
                        }`}
                        style={{
                          backgroundColor:
                            color.toLowerCase() === "white"
                              ? "#fff"
                              : color.toLowerCase() === "black"
                              ? "#000"
                              : color.toLowerCase() === "blue"
                              ? "#3b82f6"
                              : color.toLowerCase() === "red"
                              ? "#ef4444"
                              : color.toLowerCase() === "beige"
                              ? "#d4c5b0"
                              : color.toLowerCase() === "navy"
                              ? "#1e3a8a"
                              : color.toLowerCase() === "brown"
                              ? "#92400e"
                              : "#d4d4d4",
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-3">
                    Size{" "}
                    {selectedSize && (
                      <span className="font-normal text-neutral-600">
                        - {selectedSize}
                      </span>
                    )}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border-2 font-medium transition-colors ${
                          selectedSize === size
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-300 text-neutral-900 hover:border-neutral-900"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-neutral-300 overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 font-semibold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="p-3 hover:bg-neutral-100 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  {product.inStock && (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      In Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddItemToCart}
                disabled={!product.inStock}
                className={`w-full py-4 text-lg flex items-center justify-center gap-3 transition-colors ${
                  !product.inStock
                    ? "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                {!product.inStock ? "Sold Out" : "Add to Cart"}
              </button>
            </div>

            {/* Product Features */}
            <div className="border-t border-neutral-200 pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="w-6 h-6 text-neutral-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-900">
                    Free Shipping
                  </p>
                  <p className="text-sm text-neutral-600">
                    On orders over ₦50,000
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="w-6 h-6 text-neutral-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-900">Easy Returns</p>
                  <p className="text-sm text-neutral-600">
                    7-day return policy
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-neutral-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-neutral-900">
                    Secure Payment
                  </p>
                  <p className="text-sm text-neutral-600">
                    100% secure checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="group bg-white overflow-hidden hover:shadow-lg transition-shadow"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                    <img
                      src={relatedProduct.images?.[0] || relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      {relatedProduct.category}
                    </p>
                    <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="font-bold text-neutral-900">
                      ₦{relatedProduct.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
