import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetail from "./pages/ProductDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import { CartContextProvider } from "./context/shoppingCartContext.jsx";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react";

// Policy Pages
import FAQ from "./pages/policies/FAQ.jsx";
import ShippingDelivery from "./pages/policies/ShippingDelivery.jsx";
import ReturnsRefunds from "./pages/policies/ReturnsRefunds.jsx";
import SizeGuide from "./pages/policies/SizeGuide.jsx";
import PrivacyPolicy from "./pages/policies/PrivacyPolicy.jsx";
import TermsOfService from "./pages/policies/TermsOfService.jsx";
import CookiePolicy from "./pages/policies/CookiePolicy.jsx";
import Disclaimer from "./pages/policies/Disclaimer.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "shop",
          element: <Shop />,
        },
        {
          path: "product/:id",
          element: <ProductDetail />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        // Policy Pages
        {
          path: "faq",
          element: <FAQ />,
        },
        {
          path: "shipping-delivery",
          element: <ShippingDelivery />,
        },
        {
          path: "returns-refunds",
          element: <ReturnsRefunds />,
        },
        {
          path: "size-guide",
          element: <SizeGuide />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "terms-of-service",
          element: <TermsOfService />,
        },
        {
          path: "cookie-policy",
          element: <CookiePolicy />,
        },
        {
          path: "disclaimer",
          element: <Disclaimer />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <ToastContainer />
      <RouterProvider router={router} />
      <Analytics />
    </CartContextProvider>
  );
};

export default App;
