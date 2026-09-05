import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import ScrollToTopOnNavigate from "../components/common/ScrollToTopOnNavigate.jsx";
import ScrollToTop from "../components/common/ScrollToTop.jsx";
import { useLocation } from "react-router";

import { supabase } from "../services/supabaseClient.js"; // Adjust the path as necessary
import { getSessionId } from "../lib/getSessionId.js";

// Analytics
import { logPageView } from "../analytics.js";

const Root = () => {
  const location = useLocation();

  // Log page views on route change - Google Analytics
  useEffect(() => {
    logPageView();
  }, [location]);

  // Log page views on route change - Our own dashboard stats.
  useEffect(() => {
    // API call to log page view in your dashboard
    supabase.from("page_views").insert({
      session_id: getSessionId(),
      event_id: "page_views",
      path: location.pathname,
    });
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
