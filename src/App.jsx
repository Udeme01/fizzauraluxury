import React, { useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { CartContextProvider } from "./context/shoppingCartContext.jsx";
import { ToastContainer } from "react-toastify";
import { PageFallback } from "./components/common/PageFallback.jsx";

// Analytics
import { Analytics } from "@vercel/analytics/react";
import { initGA } from "./analytics.js";

// ---------- Lazy-loaded storefront pages ----------
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetails.jsx"));

// ---------- Lazy-loaded policy pages ----------
const FAQ = lazy(() => import("./pages/policies/FAQ.jsx"));
const ShippingDelivery = lazy(
  () => import("./pages/policies/ShippingDelivery.jsx"),
);
const ReturnsRefunds = lazy(
  () => import("./pages/policies/ReturnsRefunds.jsx"),
);
const SizeGuide = lazy(() => import("./pages/policies/SizeGuide.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/policies/PrivacyPolicy.jsx"));
const TermsOfService = lazy(
  () => import("./pages/policies/TermsOfService.jsx"),
);
const CookiePolicy = lazy(() => import("./pages/policies/CookiePolicy.jsx"));
const Disclaimer = lazy(() => import("./pages/policies/Disclaimer.jsx"));

// ---------- Lazy-loaded admin (never needed by customers) ----------
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const AdminLayout = lazy(
  () => import("./components/admin/layout/AdminLayout.jsx"),
);
const ProtectedAdminRoute = lazy(
  () => import("./components/admin/layout/ProtectedAdminRoute.jsx"),
);
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const Products = lazy(() => import("./pages/admin/Products.jsx"));
const ProductForm = lazy(() => import("./pages/admin/ProductForm.jsx"));
const Orders = lazy(() => import("./pages/admin/Orders.jsx"));
const OrderDetail = lazy(() => import("./pages/admin/OrderDetail.jsx"));
const Customers = lazy(() => import("./pages/admin/Customers.jsx"));
const CustomerDetail = lazy(() => import("./pages/admin/CustomerDetail.jsx"));
const AdminAnalytics = lazy(() => import("./pages/admin/AnalyticsPage.jsx"));
const Settings = lazy(() => import("./pages/admin/Settings.jsx"));
const ForgotPassword = lazy(() => import("./pages/admin/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/admin/ResetPassword.jsx"));
const PromoBanner = lazy(() => import("./pages/admin/PromoBanner.jsx"));

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

  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<PageFallback />}>
        <AdminLogin />
      </Suspense>
    ),
  },

  {
    path: "/admin/forgot-password",
    element: (
      <Suspense fallback={<PageFallback />}>
        <ForgotPassword />
      </Suspense>
    ),
  },
  {
    path: "/admin/reset-password",
    element: (
      <Suspense fallback={<PageFallback />}>
        <ResetPassword />
      </Suspense>
    ),
  },

  {
    path: "/admin",
    element: (
      <Suspense fallback={<PageFallback />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        element: <ProtectedAdminRoute />,
        children: [
          { index: true, element: <Dashboard /> },
          {
            path: "orders",
            children: [
              { index: true, element: <Orders /> },
              { path: ":id", element: <OrderDetail /> },
            ],
          },
          // { path: "orders/:id", element: <OrderDetail /> },
          {
            path: "products",
            children: [
              { index: true, element: <Products /> },
              { path: "new", element: <ProductForm /> },
              { path: ":id/edit", element: <ProductForm /> },
            ],
          },
          // { path: "products/:id", element: <ProductEdit /> },
          {
            path: "promo-banners",
            children: [{ index: true, element: <PromoBanner /> }],
          },
          {
            path: "customers",
            children: [
              {
                index: true,
                element: <Customers />,
              },
              {
                path: ":id",
                element: <CustomerDetail />,
              },
            ],
          },
          { path: "analytics", element: <AdminAnalytics /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },
]);

const App = () => {
  // Initialize Google Analytics once when app loads
  useEffect(() => {
    initGA(import.meta.env.VITE_GA_MEASUREMENT_ID);
  }, []);

  return (
    <CartContextProvider>
      <ToastContainer />
      <RouterProvider router={router} />
      <Analytics />
    </CartContextProvider>
  );
};

export default App;
