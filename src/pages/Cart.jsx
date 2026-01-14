// src/pages/Cart.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
// import { X, User, Phone, Mail, MapPin } from "lucide-react";
import Button from "../components/common/Button";
import CartItem from "../components/cart/CartItem";
import CartCheckoutModalForm from "../components/cart/CartCheckoutModalForm";
import CartSummary from "../components/cart/CartSummary";

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
  // const [customerInfo, setCustomerInfo] = useState({
  //   fullName: "",
  //   phone: "",
  //   email: "",
  //   address: "",
  //   city: "",
  //   state: "",
  //   notes: "",
  // });
  // const [errors, setErrors] = useState({});

  // Update quantity
  // const updateQuantity = (id, newQuantity) => {
  //   if (newQuantity < 1) return;
  //   setCartItems(
  //     cartItems.map((item) =>
  //       item.id === id ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  // Remove item
  // const removeItem = (id) => {
  //   setCartItems(cartItems.filter((item) => item.id !== id));
  // };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? (subtotal > 200 ? 0 : 15) : 0;
  const tax = subtotal * 0.075; // 7.5% tax
  const total = subtotal + shipping + tax;

  // WhatsApp Business Number (Replace with actual number)
  // const WHATSAPP_NUMBER = "2348055742292"; // Format: Country code + number (no + or spaces)

  // Validate customer info
  // const validateForm = () => {
  //   const newErrors = {};

  //   if (!customerInfo.fullName.trim()) {
  //     newErrors.fullName = "Full name is required";
  //   }

  //   if (!customerInfo.phone.trim()) {
  //     newErrors.phone = "Phone number is required";
  //   } else if (!/^\d{10,}$/.test(customerInfo.phone.replace(/\s/g, ""))) {
  //     newErrors.phone = "Please enter a valid phone number";
  //   }

  //   if (!customerInfo.email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
  //     newErrors.email = "Please enter a valid email";
  //   }

  //   if (!customerInfo.address.trim()) {
  //     newErrors.address = "Delivery address is required";
  //   }

  //   if (!customerInfo.city.trim()) {
  //     newErrors.city = "City is required";
  //   }

  //   if (!customerInfo.state.trim()) {
  //     newErrors.state = "State is required";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  // Generate WhatsApp order message with customer info
  // const generateWhatsAppMessage = () => {
  //   let message = "🛍️ *NEW ORDER FROM FIZZAURA LUXURY*\n\n";
  //   message += "━━━━━━━━━━━━━━━━━━━━\n\n";

  //   // Customer Information
  //   message += "👤 *CUSTOMER INFORMATION:*\n\n";
  //   message += `Name: ${customerInfo.fullName}\n`;
  //   message += `Phone: ${customerInfo.phone}\n`;
  //   message += `Email: ${customerInfo.email}\n`;
  //   message += `Address: ${customerInfo.address}\n`;
  //   message += `City: ${customerInfo.city}\n`;
  //   message += `State: ${customerInfo.state}\n`;
  //   if (customerInfo.notes.trim()) {
  //     message += `Notes: ${customerInfo.notes}\n`;
  //   }
  //   message += "\n━━━━━━━━━━━━━━━━━━━━\n\n";

  //   // Order items
  //   message += "📦 *ORDER DETAILS:*\n\n";
  //   cartItems.forEach((item, index) => {
  //     message += `${index + 1}. *${item.name}*\n`;
  //     message += `   • Category: ${item.category}\n`;
  //     message += `   • Size: ${item.size}\n`;
  //     message += `   • Quantity: ${item.quantity}\n`;
  //     message += `   • Price: ₦${item.price.toLocaleString("en-NG", {
  //       minimumFractionDigits: 2,
  //     })}\n`;
  //     message += `   • Subtotal: ₦${(item.price * item.quantity).toLocaleString(
  //       "en-NG",
  //       { minimumFractionDigits: 2 }
  //     )}\n\n`;
  //   });

  //   message += "━━━━━━━━━━━━━━━━━━━━\n\n";

  //   // Order summary
  //   message += "💰 *ORDER SUMMARY:*\n\n";
  //   message += `Subtotal: ₦${subtotal.toLocaleString("en-NG", {
  //     minimumFractionDigits: 2,
  //   })}\n`;
  //   message += `Shipping: ${
  //     shipping === 0
  //       ? "FREE ✅"
  //       : "₦" + shipping.toLocaleString("en-NG", { minimumFractionDigits: 2 })
  //   }\n`;
  //   message += `Tax (7.5%): ₦${tax.toLocaleString("en-NG", {
  //     minimumFractionDigits: 2,
  //   })}\n\n`;
  //   message += `*TOTAL: ₦${total.toLocaleString("en-NG", {
  //     minimumFractionDigits: 2,
  //   })}*\n\n`;

  //   message += "━━━━━━━━━━━━━━━━━━━━\n\n";
  //   message += "Thank you for shopping with FizzAura Luxury! 🎉";

  //   return encodeURIComponent(message);
  // };

  // Handle checkout via WhatsApp
  // const handleWhatsAppCheckout = () => {
  //   if (validateForm()) {
  //     const message = generateWhatsAppMessage();
  //     const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  //     window.open(whatsappUrl, "_blank");
  //     setShowCheckoutModal(false);
  // Optionally clear cart after successful order
  //   }
  // };

  // Handle input changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setCustomerInfo((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  //   // Clear error for this field
  //   if (errors[name]) {
  //     setErrors((prev) => ({
  //       ...prev,
  //       [name]: "",
  //     }));
  //   }
  // };

  return (
    <div className="bg-neutral-50 font-montserrat">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-8">
        {/* cart items */}
        <CartItem
          cartItems={cartItems}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />

        {/* Order Summary */}
        <CartSummary
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />
      </div>

      {/* Customer Information Modal */}
      <CartCheckoutModalForm
        showCheckoutModal={showCheckoutModal}
        setShowCheckoutModal={setShowCheckoutModal}
      />
    </div>
  );
};

export default Cart;
