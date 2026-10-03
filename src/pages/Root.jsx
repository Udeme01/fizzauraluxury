import React, { useEffect, useRef } from "react";
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

function TikTokPageViews() {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    } // base code already counted the first load
    window.ttq?.page();
  }, [pathname]);

  return null;
}

const Root = () => {
  const location = useLocation();

  // Log page views on route change - Google Analytics
  useEffect(() => {
    logPageView();
  }, [location]);

  // Log page views on route change - Our own dashboard stats.
  useEffect(() => {
    console.log("Attempting to log page view:", location.pathname);

    supabase
      .from("page_views")
      .insert({
        session_id: getSessionId(),
        event_type: "page_view",
        path: location.pathname,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error("Page view insert FAILED:", error);
        } else {
          console.log("Page view insert SUCCESS:", data);
        }
      });
  }, [location]);

  return (
    <>
      <TikTokPageViews />
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
