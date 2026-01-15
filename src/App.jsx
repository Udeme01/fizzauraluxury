import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Shop from "./pages/Shop.jsx";
import ScrollToTop from "./components/common/ScrollToTop.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetail from "./pages/ProductDetails.jsx";
import NotFound from "./pages/NotFound.jsx";
import { CartContextProvider } from "./context/shoppingCartContext.jsx";
import { ToastContainer } from "react-toastify";

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
      <ScrollToTop />
      <RouterProvider router={router} />
    </CartContextProvider>
  );
};

export default App;
