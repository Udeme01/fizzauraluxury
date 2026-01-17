import { createContext, useReducer, useEffect } from "react";
import { products } from "../data/products";
import { toast } from "react-toastify";

// Cart Context
export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
  clearItem: () => {},
  clearCart: () => {},
  removeItem: () => {},
  getTotalPrice: () => 0,
  getTotalItems: () => 0,
});

// Reducer Function...
// "state" = Your current shopping cart (what's already in it)
// "action" = The instruction you're giving (like "add this item")
const cartReducer = (state, action) => {
  // ==================== ADD_ITEM ====================
  if (action.type === "ADD_ITEM") {
    // Step 1: Look in your STORE CATALOG (products array from products.js)
    // NOT in the cart, but in the list of ALL products available for sale
    // Find the product with matching id to get its name, price, image etc.
    const product = products.find(
      (product) => product.id === action.payload.id
    );
    // console.log(product);

    if (!product) return state;

    // Step 2: Check if this EXACT item is ALREADY in your shopping cart
    // "findIndex" searches through your cart and returns the position (index) where it found the item
    // If it doesn't find it, it returns -1 (meaning "not found")
    // Position 0 = first item, Position 1 = second item, etc.
    const existingItemIndex = state.items.findIndex(
      (item) =>
        item.id === action.payload.id &&
        item.selectedColor === action.payload.selectedColor &&
        item.selectedSize === action.payload.selectedSize
    );
    // console.log(existingItemIndex);

    // Step 3: Make a COPY of your current cart items
    // [...state.items] = Take everything in state.items and spread it into a new array
    // Like photocopying a list - you don't write on the original
    const updatedItems = [...state.items];

    // Step 4: Check if the item was found in cart
    // "existingItemIndex > -1" means "if the position is greater than -1"
    // Remember: -1 means "not found", so anything above -1 (0, 1, 2...) means "found it!"
    if (existingItemIndex > -1) {
      // The item IS already in cart, so just increase quantity

      // Get the existing item using its position number
      const existingItem = updatedItems[existingItemIndex];

      // Create an updated version with new quantity
      // {...existingItem} = copy all properties from existingItem
      // quantity: ... = but change ONLY the quantity property
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.payload.quantity,
      };
      // Replace the old item with the updated one at the same position
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      // The item is NOT in cart yet, so add it as a brand new item
      // "push" = add to the end of the array
      updatedItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0], // Use first image as thumbnail
        quantity: action.payload.quantity,
        selectedColor: action.payload.selectedColor,
        selectedSize: action.payload.selectedSize,
      });
    }
    // Step 6: Return the new state with updated items
    // {...state} = copy everything from state
    // items: updatedItems = but replace items with our new updated list
    return {
      ...state,
      items: updatedItems,
    };
  }

  // ==================== UPDATE_ITEM ====================
  // This is used when user clicks + or - buttons to change quantity in cart
  if (action.type === "UPDATE_ITEM") {
    // Step 1: Find the exact item in cart (same id, color, size)
    const existingItemIndex = state.items.findIndex(
      (item) =>
        item.id === action.payload.id &&
        item.selectedColor === action.payload.selectedColor &&
        item.selectedSize === action.payload.selectedSize
    );

    // Step 2: Make a copy of cart items
    const updatedItems = [...state.items];

    // Step 3: If item exists in cart
    if (existingItemIndex > -1) {
      // Get the item at that position
      const existingItem = updatedItems[existingItemIndex];

      // Create updated version with NEW quantity (not adding, but REPLACING)
      // This is different from ADD_ITEM which ADDS to existing quantity
      // UPDATE_ITEM SETS the quantity to exactly what you specify
      const updatedItem = {
        ...existingItem,
        quantity: action.payload.quantity, // Set to exact quantity
      };

      // Replace old item with updated one
      updatedItems[existingItemIndex] = updatedItem;
    }

    // Return new state with updated items
    return {
      ...state,
      items: updatedItems,
    };
  }

  // ==================== CLEAR_ITEM ====================
  if (action.type === "CLEAR_ITEM") {
    const updatedItems = state.items.filter(
      (item) =>
        !(
          item.id === action.payload.id &&
          item.selectedColor === action.payload.selectedColor &&
          item.selectedSize === action.payload.selectedSize
        )
    );

    // Return new state with filtered items
    return {
      ...state,
      items: updatedItems,
    };
  }

  // ==================== CLEAR_CART ====================
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      items: [],
    };
  }

  return state;
};

// Provider Component
export const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(
    cartReducer,
    {
      items: [],
    },
    (initialState) => {
      // This function runs ONCE when component mounts
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error);
          return initialState;
        }
      }
      return initialState;
    }
  );

  // Save cart to localStorage whenever cartState changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartState));
  }, [cartState]);

  // Helper Functions
  const handleAddItemToCart = (id, quantity, selectedSize, selectedColor) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: { id, quantity, selectedSize, selectedColor },
    });

    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
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

  const handleClearItem = (id, selectedColor, selectedSize) => {
    cartDispatch({
      type: "CLEAR_ITEM",
      payload: { id, selectedColor, selectedSize },
    });

    toast.success("Item removed from cart", {
      position: "top-center",
      autoClose: 2000,
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
