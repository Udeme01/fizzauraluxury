import React, { useState, useContext } from "react";
import { X, User, Phone, Mail, MapPin } from "lucide-react";
import Button from "../common/Button";
import { CartContext } from "../../context/shoppingCartContext";
import { toast } from "react-toastify";

const CartCheckoutModalForm = ({
  showCheckoutModal,
  setShowCheckoutModal,
  items,
  total,
  subtotal,
}) => {
  // cart context
  const { clearCart } = useContext(CartContext);

  // Add state for form
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!customerInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (customerInfo.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    }

    // Phone validation
    if (!customerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,15}$/.test(customerInfo.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Email validation
    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Address validation
    if (!customerInfo.address.trim()) {
      newErrors.address = "Delivery address is required";
    } else if (customerInfo.address.trim().length < 10) {
      newErrors.address = "Please provide a complete address";
    }

    // City validation
    if (!customerInfo.city.trim()) {
      newErrors.city = "City is required";
    }

    // State validation
    if (!customerInfo.state.trim()) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const message = `
🛍️ *NEW ORDER FROM ${customerInfo.fullName.toUpperCase()}*

━━━━━━━━━━━━━━━━━
👤 *CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━
Name: ${customerInfo.fullName}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email}

━━━━━━━━━━━━━━━━━
📍 *DELIVERY ADDRESS*
━━━━━━━━━━━━━━━━━
${customerInfo.address}
${customerInfo.city}, ${customerInfo.state}

━━━━━━━━━━━━━━━━━
🛒 *ORDER ITEMS*
━━━━━━━━━━━━━━━━━
${items
  .map(
    (item, index) =>
      `*${index + 1}. ${item.name}*
🔗 Product_Link: https://fizzauraluxury.com/product/${item.id}
🎨 Color: ${item.selectedColor || "N/A"}
📏 Size: ${item.selectedSize || "N/A"}
📦 Quantity: ${item.quantity}
💰 Subtotal: ₦${(item.price * item.quantity).toLocaleString()}`,
  )
  .join("\n\n")}

━━━━━━━━━━━━━━━━━
💵 *ORDER SUMMARY*
━━━━━━━━━━━━━━━━━
Subtotal: ₦${subtotal.toLocaleString()}
*TOTAL: ₦${total.toLocaleString()}*

${
  customerInfo.notes
    ? `━━━━━━━━━━━━━━━━━\n📝 *SPECIAL NOTES*\n━━━━━━━━━━━━━━━━━\n${customerInfo.notes}\n\n`
    : ""
}━━━━━━━━━━━━━━━━━
📅 Order Date: ${new Date().toLocaleString()}
      `.trim();

      const phoneNumber = "2349138965388";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message,
      )}`;

      // Open WhatsApp
      window.open(whatsappUrl, "_blank");

      // Success toast
      toast.success("Order sent! Check your WhatsApp", {
        position: "top-center",
        autoClose: 3000,
      });

      // Clear the cart after sending order
      clearCart();

      // Close modal
      setShowCheckoutModal(false);

      // Reset form
      setCustomerInfo({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        notes: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-10">
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

              <form onSubmit={handleWhatsAppCheckout} className="space-y-4">
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
                        Items ({items.length})
                      </span>
                      <span className="font-medium">
                        ₦{subtotal.toLocaleString()}
                      </span>
                    </div>
                    {/* {shipping > 0 && (
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Shipping</span>
                        <span className="font-medium">
                          ₦{shipping.toLocaleString()}
                        </span>
                      </div>
                    )} */}
                    <div className="flex justify-between border-t border-neutral-300 pt-2 mt-2">
                      <span className="font-semibold text-neutral-black">
                        Total
                      </span>
                      <span className="font-semibold text-neutral-black">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex gap-3 z-10">
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="flex-1 px-6 py-3 border-2 border-neutral-300 text-neutral-900 font-semibold hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleWhatsAppCheckout}
                disabled={isSubmitting}
                className={`flex-1 px-6 py-3 font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Send Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartCheckoutModalForm;
