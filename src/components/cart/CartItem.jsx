import React, { useContext } from "react";
import { Link } from "react-router";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Button from "../common/Button";
import { CartContext } from "../../context/shoppingCartContext";

const CartItem = () => {
  const { items } = useContext(CartContext);
  console.log(items);
  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {items.length > 0 ? (
          <div>
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* {console.log(item)} */}

                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      to={`/product/${item.id}`}
                      className="shrink-0 w-24 h-24 md:w-32 md:h-32 bg-neutral-100 overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                            {item.category}
                          </p>
                          <Link
                            to={`/product/${item.id}`}
                            className="font-semibold text-neutral-black hover:text-neutral-700 transition-colors text-sm md:text-base line-clamp-2"
                          >
                            {item.name}
                          </Link>

                          {/* Size & Color */}
                          <div className="flex items-center gap-4 mt-2 text-sm text-neutral-600">
                            <span>Size: {item.selectedSize}</span>
                            <div className="flex items-center gap-1">
                              <span>Color:</span>
                              <div
                                className="w-4 h-4 rounded-full border border-neutral-300"
                                style={{ backgroundColor: item.selectedColor }}
                                c
                              />
                            </div>
                          </div>
                        </div>

                        {/* Remove Button - Desktop */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="hidden md:block text-neutral-400 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Price & Quantity */}
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 border border-neutral-300">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 font-medium text-neutral-black min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-neutral-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="font-semibold text-neutral-black text-lg">
                            ₦
                            {(item.price * item.quantity).toLocaleString(
                              "en-NG",
                              { minimumFractionDigits: 2 }
                            )}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-neutral-500">
                              ₦
                              {item.price.toLocaleString("en-NG", {
                                minimumFractionDigits: 2,
                              })}{" "}
                              each
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Remove Button - Mobile */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="md:hidden mt-3 text-sm text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Empty Cart
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-16 h-16 text-neutral-400" />
            </div>
            <h2 className="text-3xl font-semibold text-neutral-black mb-4">
              Your cart is empty
            </h2>
            <p className="text-neutral-600 mb-8 mx-auto">
              Looks like you haven't added anything to your cart yet. Start
              shopping to fill it up!
            </p>

            <Button
              to="/shop"
              variant=""
              size="lg"
              className="bg-neutral-black/90 text-white transition-colors duration-300 hover:bg-neutral-black"
            >
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartItem;
