// src/pages/Cart.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";

const Cart = () => {
  // Sample cart items - In real app, this would come from context/redux
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Classic Black OFI Jacket",
      category: "ofi-jackets",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
      quantity: 1,
      size: "L",
      color: "#000000",
    },
    {
      id: 11,
      name: "Classic Denim Trucker Jacket",
      category: "trucker-jackets",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400&h=400&fit=crop",
      quantity: 2,
      size: "M",
      color: "#4682B4",
    },
    {
      id: 21,
      name: "Classic Black Snapback",
      category: "face-caps",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
      quantity: 1,
      size: "One Size",
      color: "#000000",
    },
  ]);

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? (subtotal > 200 ? 0 : 15) : 0;
  const tax = subtotal * 0.075; // 7.5% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-neutral-50 min-h-screen font-montserrat">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-medium text-neutral-black mb-2">
            Shopping Cart
          </h1>
          <p className="text-neutral-black/70">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-neutral-100 overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                            {item.category}
                          </p>
                          <Link
                            to={`/product/${item.id}`}
                            className="font-semibold text-neutral-black hover:text-neutral-700 transition-colors text-sm md:text-base line-clamp-2"
                          >
                            {item.name}
                          </Link>

                          {/* Size & Color */}
                          <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600">
                            <span>Size: {item.size}</span>
                            <div className="flex items-center gap-1">
                              <span>Color:</span>
                              <div
                                className="w-4 h-4 rounded-full border border-neutral-300"
                                style={{ backgroundColor: item.color }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Remove Button - Desktop */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="hidden md:block text-neutral-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 border border-neutral-300">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 font-medium text-neutral-black min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-neutral-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-neutral-black text-lg">
                            ₦
                            {(item.price * item.quantity).toLocaleString(
                              "en-NG",
                              { minimumFractionDigits: 2 }
                            )}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-neutral-500">
                              ₦
                              {item.price.toLocaleString("en-NG", {
                                minimumFractionDigits: 2,
                              })}{" "}
                              each
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Remove Button - Mobile */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="md:hidden mt-3 text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 shadow-sm sticky top-4">
                <h2 className="text-xl font-semibold text-neutral-black mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>
                      ₦
                      {subtotal.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">FREE</span>
                      ) : (
                        `₦${shipping.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                        })}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Tax (7.5%)</span>
                    <span>
                      ₦
                      {tax.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  {subtotal < 200 && subtotal > 0 && (
                    <div className="bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800 mt-4">
                      Add ₦
                      {(200 - subtotal).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}{" "}
                      more for free shipping!
                    </div>
                  )}
                </div>

                <div className="border-t border-neutral-200 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold text-neutral-black">
                    <span>Total</span>
                    <span>
                      ₦
                      {total.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full bg-neutral-black text-white py-4 font-semibold text-center block hover:bg-neutral-800 transition-colors mb-3"
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                <Link
                  to="/shop"
                  className="w-full border-2 border-neutral-black text-neutral-black py-4 font-semibold text-center block hover:bg-neutral-black hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Link>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-xs text-neutral-500 text-center mb-3">
                    We Accept
                  </p>
                  <div className="flex items-center justify-center gap-3 opacity-60">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                      alt="Visa"
                      className="h-6"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                      alt="Mastercard"
                      className="h-6"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      alt="PayPal"
                      className="h-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty Cart
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-16 h-16 text-neutral-400" />
            </div>
            <h2 className="text-3xl text-neutral-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-neutral-600 mb-8 mx-auto">
              Looks like you haven't added anything to your cart yet. Start
              shopping to fill it up!
            </p>
            <Link
              to="/shop"
              className="inline-block bg-neutral-black text-white px-8 py-4 font-semibold hover:bg-neutral-800 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
