import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import ScrollToTopOnNavigate from "../components/common/ScrollToTopOnNavigate.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import { useLocation } from "react-router";

// Analytics
import { logPageView } from "../analytics.js";

const Root = () => {
  const location = useLocation();

  // Log page views on route change - Google Analytics
  useEffect(() => {
    logPageView();
  }, [location]);

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
