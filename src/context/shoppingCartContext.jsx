import { createContext, useReducer, useEffect } from "react";

// Cart Context
export const CartContext = createContext({
  items: [],
  products: [],
});

// Reducer Function...
const cartReducer = (state, action) => {};

// Provider Component
export const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
    products: [],
  });
};

// Helper Functions...fot dispatching!
