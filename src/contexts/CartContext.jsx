import { createContext, useContext, useState } from "react";

const CartContext = createContext([]);

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    //check if product already exists in cart
    const existingProduct = cart.find((cartItem) => cartItem.id === product.id);
    //if product already exists in cart, increase quantity by 1
    if (existingProduct) {
      const updateCart = cart.map((cartItem) => {
        if (cartItem.id === product.id) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
        } else {
          return cartItem;
        }
      });
      setCart(updateCart);
      //if product does not exist in cart, add it to cart
    } else {
      setCart((prev) => [...prev, product]);
    }
  };

  //remove from cart
  const removeFromCart = (product) => {
    // check if product quantity is greater than 1
    if (product.quantity > 1) {
      const updateCart = cart.map((cartItem) => {
        if (cartItem.id === product.id) {
          return {
            ...cartItem,
            // decrease quantity by 1
            quantity: cartItem.quantity - 1,
          };
        } else {
          return cartItem;
        }
      });
      setCart(updateCart);
      return;
    } else {
      // if product quantity is 1, remove it from cart
      setCart((prev) => prev.filter((cartItem) => cartItem.id !== product.id));
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  return context;
}

export { CartContext, CartContextProvider, useCart };
