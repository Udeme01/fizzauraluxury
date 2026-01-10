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
        <ShoppingCart color="black" size={24} />
      </section>
    </header>
  );
};

export default Header;
