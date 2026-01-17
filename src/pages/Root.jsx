import React from "react";
import { Outlet } from "react-router";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import ScrollToTopOnNavigate from "../components/common/ScrollToTopOnNavigate.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";

const Root = () => {
  return (
    <>
      <ScrollToTopOnNavigate />
      <ScrollToTop />
      <Header />
      <main className="min-h-[calc(100vh-80px-200px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
