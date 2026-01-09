import React from "react";
import MobileNavigation from "./MobileNavigation";
import { ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="flex flex-col items-center justify-center text-white py-6 font-montserrat">
      <section className="w-full flex items-center justify-between px-4 sm:px-6 md:px-20 max-w-375">
        <MobileNavigation />
        <h1 className="w-12 font-playfair text-neutral-black font-semibold tracking-tighter">
          <img src="/images/brand/fa_logo.png" />
        </h1>
        <ShoppingCart color="black" size={24} />
      </section>
    </header>
  );
};

export default Header;