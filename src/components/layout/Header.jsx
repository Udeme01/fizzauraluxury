import React from "react";
import MobileNavigation from "./MobileNavigation";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center text-white py-6 font-montserrat">
      <section className="w-full flex items-center justify-between px-4 sm:px-6 max-w-375">
        <MobileNavigation />
        <Link
          to="/"
          className="w-12 font-playfair text-neutral-black font-semibold tracking-tighter cursor-pointer"
        >
          <img src="/images/brand/fa_logo.png" />
        </Link>
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-neutral-black" />
          <span className="absolute -top-2 -right-2 bg-accent-900 text-neutral-white shadow-2xl text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
            0
          </span>
        </Link>
      </section>
    </header>
  );
};

export default Header;
