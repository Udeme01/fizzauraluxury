import React from "react";
import { Outlet } from "react-router";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
