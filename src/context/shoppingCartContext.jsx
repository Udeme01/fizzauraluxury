import { createContext, useReducer, useEffect } from "react";
import { products } from "../data/products";

// Cart Context
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
  clearItem: () => {},
  removeItem: () => {},
  getTotalPrice: () => 0,
  getTotalItems: () => 0,
});

// Reducer Function...
// "state" = Your current shopping cart (what's already in it)
// "action" = The instruction you're giving (like "add this item")
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // Step 1: Look in your STORE CATALOG (products array from products.js)
    // NOT in the cart, but in the list of ALL products available for sale
    // Find the product with matching id to get its name, price, image etc.
    const product = products.find(
      (product) => product.id === action.payload.id
    );
    console.log(product);
    // Step 2: Check if this EXACT item is ALREADY in your shopping cart
    // "findIndex" searches through your cart and returns the position (index) where it found the item
    // If it doesn't find it, it returns -1 (meaning "not found")
    // Position 0 = first item, Position 1 = second item, etc.
    const existingItemIndex = state.items.findIndex((item) => {
      item.id === action.payload.id;
      item.selectedColor === action.payload.selectedColor;
      item.selectedSize = action.payload.selectedSize;
    });
    console.log(existingItemIndex);
  }
  return state;
};

// Provider Component
export const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  // Helper Functions
  const handleAddItemToCart = (id, quantity, selectedSize, selectedColor) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: { id, quantity, selectedSize, selectedColor },
    });
  };

  const handleUpdateCartItemQuantity = (
    id,
    selectedColor,
    selectedSize,
    quantity
  ) => {
    cartDispatch({
      type: "UPDATE_ITEM",
      payload: { id, selectedColor, selectedSize, quantity },
    });
  };

  const handleRemoveItem = (id, selectedColor, selectedSize) => {
    cartDispatch({
      type: "REMOVE_ITEM",
      payload: { id, selectedColor, selectedSize },
    });
  };

  const handleClearItem = (productId) => {
    cartDispatch({
      type: "CLEAR_ITEM",
      payload: { productId },
    });
  };

  const handleClearCart = () => {
    cartDispatch({
      type: "CLEAR_CART",
    });
  };

  const getTotalPrice = () => {
    return cartState.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
  };

  const ctxValue = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
    clearItem: handleClearItem,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
    getTotalPrice,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
