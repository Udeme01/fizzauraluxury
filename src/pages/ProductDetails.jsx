// src/pages/ProductDetail.jsx
import { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Minus, Plus, ChevronLeft, Check } from "lucide-react";
import { CartContext } from "../context/shoppingCartContext";
import { toast } from "react-toastify";

import { fetchProductById, fetchProducts } from "../lib/fetchProducts";

const ProductDetail = () => {
  // from cart-context
  const { addItemToCart } = useContext(CartContext);

  // product-id gotten from url using useParams()...
  const { id } = useParams();
  console.log(id);

  // navigate
  const navigate = useNavigate();

  // states...
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product and related products
  useEffect(() => {
    const loadProduct = async () => {
      console.log(id);
      setLoading(true);
      try {
        // Fetch the single product
        const productData = await fetchProductById(id);
        console.log(productData);

        if (!productData) {
          toast.error("Product not found");
          navigate("/shop");
          return;
        }

        setProduct(productData);

        // Fetch all products to get related ones
        const allProducts = await fetchProducts();
        const related = allProducts
          .filter(
            (p) =>
              p.category === productData.category && p.id !== productData.id
          )
          .slice(0, 4);

        setRelatedProducts(related);
      } catch (error) {
        console.error("Error loading product:", error);
        toast.error("Error loading product");
        navigate("/shop");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  // Reset selections when product & id changes
  useEffect(() => {
    setSelectedImage(0);
    setSelectedSize("");
    setSelectedColor("");
    setQuantity(1);
  }, [product]);

  // add-item-to-cart func...
  const handleAddItemToCart = () => {
    // Check if color is required and not selected
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // Check if size is required and not selected
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // Check stock
    if (product.stock === 0) {
      toast.error("This product is out of stock", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    // All good, add to cart
    addItemToCart(id, quantity, selectedSize, selectedColor);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-neutral-50 min-h-screen font-montserrat">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl text-neutral-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="bg-neutral-50 min-h-screen font-montserrat">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Product Not Found
            </h2>
            <Link
              to="/shop"
              className="text-neutral-600 hover:text-neutral-900 underline"
            >
              Return to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // product-images
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // detail page return component...
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
            <div className="relative bg-neutral-100 aspect-square overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={`${product.name} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-neutral-100 overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2"
                        : "border-neutral-300 hover:border-neutral-500"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === index && (
                      <div className="absolute inset-0 bg-neutral-900/10 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white drop-shadow-lg" />
                      </div>
                    )}
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
                    {product.colors.map((color, index) => {
                      return (
                        <button
                          key={index}
                          aria-label={`Select ${color} color`}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            selectedColor === color
                              ? "border-neutral-900 ring-2 ring-neutral-900 ring-offset-2"
                              : color.toLowerCase() === "white"
                              ? "border-neutral-400 hover:border-neutral-500" // ← Darker border for white
                              : "border-neutral-300 hover:border-neutral-500"
                          }`}
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selection */}
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

              {/* Quantity */}
              <div>
                <label className="block text-sm font-semibold text-neutral-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-neutral-300 overflow-hidden">
                    <button
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 font-semibold text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-neutral-100 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddItemToCart}
                className={`w-full py-4 text-lg flex items-center justify-center gap-3 transition-colors bg-neutral-900 text-white hover:bg-neutral-800`}
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
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
                  // onClick={() => window.scrollTo(0, 0)}
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
