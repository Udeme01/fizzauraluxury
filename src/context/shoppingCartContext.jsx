import { createContext, useReducer, useEffect } from "react";
import { products } from "../data/products";

// Cart Context
export const CartContext = createContext({
  items: [],
  products: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
  clearItem: () => {},
});

// Reducer Function...
const cartReducer = (state, action) => {
  if (action.type === "SET_PRODUCTS") {
    return {
      ...state,
      dummy_products: action.payload,
    };
  }

  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) =>
        cartItem.id === action.payload.id &&
        cartItem.selectedColor === action.payload.selectedColor &&
        cartItem.selectedSize === action.payload.selectedSize
    );

    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      return {
        ...state,
        message: "This item is already in your cart.",
      };
    } else {
      // If the item does not exist, add it to the cart
      const product = state.dummy_products.find((product) => {
        return product.id === action.payload.id;
      });
      if (!product) {
        console.error("Product not found:", action.payload.id);
        return state;
      }

      updatedItems.push({
        id: action.payload.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: action.payload.quantity,
        selectedColor: action.payload.selectedColor,
        selectedSize: action.payload.selectedSize,
      });
    }

    // ADD_TO_CART_STORAGE
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    return {
      ...state,
      items: updatedItems,
      message: "",
    };
  }

  if (action.type === "SET_ITEMS") {
    return {
      ...state,
      items: action.payload,
    };
  }

  return state;
};

// Provider Component
export const CartContextProvider = ({ children }) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, {
    items: [],
  });

  //   useEffect(() => {

  //     const fetchProducts = async () => {
  //       try {
  //         const entries = products;
  //         const dummy_products = entries.map((entry) => {
  //           const { id, name, description, price, image, category } = entry;

  //           return {
  //             id,
  //             name,
  //             description,
  //             price,
  //             image,
  //             category,
  //           };
  //         });
  //         cartDispatch({ type: "SET_PRODUCTS", payload: dummy_products });
  //       } catch (error) {
  //         console.error("Failed to fetch products:", error);
  //       }
  //     };

  //     fetchProducts();

  //     const savedCartItems = JSON.parse(localStorage.getItem("cartItems"));
  //     if (savedCartItems) {
  //       cartDispatch({ type: "SET_ITEMS", payload: savedCartItems });
  //     }
  //   }, []);

  // Helper Functions...fot dispatching!

  // Load cart from localStorage on mount

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      try {
        const parsedItems = JSON.parse(savedCartItems);
        cartDispatch({ type: "SET_ITEMS", payload: parsedItems });
      } catch (error) {
        console.error("Failed to parse cart items:", error);
        localStorage.removeItem("cartItems");
      }
    }
  }, []);

  const handleAddItemToCart = (
    id,
    quantity,
    selectedSize,
    selectedColor
  ) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: { id, quantity, selectedSize, selectedColor },
    });
  };

  const handleUpdateCartItemQuantity = (productId, amount) => {
    cartDispatch({
      type: "UPDATE_ITEM",
      payload: { productId, amount },
    });
  };

  const handleClearItem = (productId) => {
    cartDispatch({
      type: "CLEAR_ITEM",
      payload: { productId },
    });
  };

  const ctxValue = {
    items: cartState.items,
    products: cartState.dummy_products,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
    clearItem: handleClearItem,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};
