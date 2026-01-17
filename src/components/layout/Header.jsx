import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { CartContext } from "../../context/shoppingCartContext";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // context
  const { items } = useContext(CartContext);
  const cartQuantity = items.length;

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 font-montserrat">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-1">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button - Left Side */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-neutral-900" />
          </button>

          {/* Logo - Center on Mobile, Left on Desktop */}
          <Link
            to="/"
            className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0"
          >
            <img
              src="/images/brand/fa_logo.png"
              alt="FizzAura Luxury Logo"
              className="w-12 h-auto"
            />
            <span className="text-xl font-semibold text-neutral-900 hidden sm:block">
              FizzAura Luxury
            </span>
          </Link>

          {/* Desktop Navigation - Center */}
          <DesktopNavigation />

          {/* Cart Icon - Right Side */}
          <Link
            to="/cart"
            className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Shopping cart"
          >
            <ShoppingCart className="w-6 h-6 text-neutral-900" />
            {/* Cart Badge */}
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {cartQuantity}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Sidebar */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
