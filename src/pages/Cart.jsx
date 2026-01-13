// src/pages/Cart.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { X, User, Phone, Mail, MapPin } from "lucide-react";
import Button from "../components/common/Button";
import CartItem from "../components/cart/CartItem";

const Cart = () => {
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

  // Customer info modal state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

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

  // WhatsApp Business Number (Replace with actual number)
  const WHATSAPP_NUMBER = "2348055742292"; // Format: Country code + number (no + or spaces)

  // Validate customer info
  const validateForm = () => {
    const newErrors = {};

    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/.test(customerInfo.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!customerInfo.address.trim()) {
      newErrors.address = "Delivery address is required";
    }

    if (!customerInfo.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!customerInfo.state.trim()) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Generate WhatsApp order message with customer info
  const generateWhatsAppMessage = () => {
    let message = "🛍️ *NEW ORDER FROM FIZZAURA LUXURY*\n\n";
    message += "━━━━━━━━━━━━━━━━━━━━\n\n";

    // Customer Information
    message += "👤 *CUSTOMER INFORMATION:*\n\n";
    message += `Name: ${customerInfo.fullName}\n`;
    message += `Phone: ${customerInfo.phone}\n`;
    message += `Email: ${customerInfo.email}\n`;
    message += `Address: ${customerInfo.address}\n`;
    message += `City: ${customerInfo.city}\n`;
    message += `State: ${customerInfo.state}\n`;
    if (customerInfo.notes.trim()) {
      message += `Notes: ${customerInfo.notes}\n`;
    }
    message += "\n━━━━━━━━━━━━━━━━━━━━\n\n";

    // Order items
    message += "📦 *ORDER DETAILS:*\n\n";
    cartItems.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   • Category: ${item.category}\n`;
      message += `   • Size: ${item.size}\n`;
      message += `   • Quantity: ${item.quantity}\n`;
      message += `   • Price: ₦${item.price.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      })}\n`;
      message += `   • Subtotal: ₦${(item.price * item.quantity).toLocaleString(
        "en-NG",
        { minimumFractionDigits: 2 }
      )}\n\n`;
    });

    message += "━━━━━━━━━━━━━━━━━━━━\n\n";

    // Order summary
    message += "💰 *ORDER SUMMARY:*\n\n";
    message += `Subtotal: ₦${subtotal.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
    })}\n`;
    message += `Shipping: ${
      shipping === 0
        ? "FREE ✅"
        : "₦" + shipping.toLocaleString("en-NG", { minimumFractionDigits: 2 })
    }\n`;
    message += `Tax (7.5%): ₦${tax.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
    })}\n\n`;
    message += `*TOTAL: ₦${total.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
    })}*\n\n`;

    message += "━━━━━━━━━━━━━━━━━━━━\n\n";
    message += "Thank you for shopping with FizzAura Luxury! 🎉";

    return encodeURIComponent(message);
  };

  // Handle checkout via WhatsApp
  const handleWhatsAppCheckout = () => {
    if (validateForm()) {
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      window.open(whatsappUrl, "_blank");
      setShowCheckoutModal(false);
      // Optionally clear cart after successful order
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

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

      {/* cart items */}
      <CartItem
        cartItems={cartItems}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
      />

      {/* Customer Information Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-neutral-black">
                Delivery Information
              </h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-neutral-400 hover:text-neutral-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 py-6">
              <p className="text-neutral-600 mb-6">
                Please provide your delivery details to complete your order via
                WhatsApp.
              </p>

              <form className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={customerInfo.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border ${
                      errors.fullName ? "border-red-500" : "border-neutral-300"
                    } focus:outline-none focus:border-neutral-black transition-colors`}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="0801 234 5678"
                      className={`w-full px-4 py-3 border ${
                        errors.phone ? "border-red-500" : "border-neutral-300"
                      } focus:outline-none focus:border-neutral-black transition-colors`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 border ${
                        errors.email ? "border-red-500" : "border-neutral-300"
                      } focus:outline-none focus:border-neutral-black transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street, Apartment 4B"
                    className={`w-full px-4 py-3 border ${
                      errors.address ? "border-red-500" : "border-neutral-300"
                    } focus:outline-none focus:border-neutral-black transition-colors`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* City & State Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      placeholder="Lagos"
                      className={`w-full px-4 py-3 border ${
                        errors.city ? "border-red-500" : "border-neutral-300"
                      } focus:outline-none focus:border-neutral-black transition-colors`}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={customerInfo.state}
                      onChange={handleInputChange}
                      placeholder="Lagos"
                      className={`w-full px-4 py-3 border ${
                        errors.state ? "border-red-500" : "border-neutral-300"
                      } focus:outline-none focus:border-neutral-black transition-colors`}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    placeholder="Any special delivery instructions..."
                    rows="3"
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-black transition-colors resize-none"
                  />
                </div>

                {/* Order Summary Preview */}
                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <h3 className="font-semibold text-neutral-black mb-2">
                    Order Summary
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">
                        Items ({cartItems.length})
                      </span>
                      <span className="font-medium">
                        ₦
                        {subtotal.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `₦${shipping.toLocaleString("en-NG", {
                            minimumFractionDigits: 2,
                          })}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-neutral-300 pt-2 mt-2">
                      <span className="font-semibold text-neutral-black">
                        Total
                      </span>
                      <span className="font-semibold text-neutral-black">
                        ₦
                        {total.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowCheckoutModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>

              <Button
                onClick={handleWhatsAppCheckout}
                variant=""
                size="md"
                className="bg-green-800 hover:bg-green-700 text-neutral-white transition-all duration-300 inline-flex items-center justify-center gap-2 flex-1"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Send Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
