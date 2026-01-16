// src/pages/Cart.jsx
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import { X, User, Phone, Mail, MapPin } from "lucide-react";
import Button from "../components/common/Button";
import CartItem from "../components/cart/CartItem";
import CartCheckoutModalForm from "../components/cart/CartCheckoutModalForm";
import CartSummary from "../components/cart/CartSummary";
import { CartContext } from "../context/shoppingCartContext";

const Cart = () => {
  const { items } = useContext(CartContext);

  // Customer info modal state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? (subtotal > 200 ? 0 : 15) : 0;
  const tax = subtotal * 0.075; // 7.5% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-neutral-50 font-montserrat">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl xl:text-5xl font-medium text-neutral-black mb-2">
            Shopping Cart
          </h1>
          <p className="text-neutral-black/70">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 max-w-7xl mx-auto gap-8">
        {/* cart items */}
        <CartItem
          items={items}
          subtotal={subtotal}
          shipping={shipping}
          tax={tax}
          total={total}
        />

        {/* Order Summary */}
        {items.length > 0 && (
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        )}
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
