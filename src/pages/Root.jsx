import React from "react";
import { Outlet } from "react-router";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import ScrollToTopOnNavigate from "../components/common/ScrollToTopOnNavigate.jsx";
import { CartProvider } from "../context/CartContext.jsx";
import Cart from "./Cart.jsx";

const Root = () => {
  return (
    <CartProvider>
      <ScrollToTopOnNavigate />
      <Header />
      <main className="min-h-[calc(100vh-80px-200px)]">
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  );
};

export default Root;
