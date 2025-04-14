import { createContext, useState } from "react";

const CartContext = createContext([]);

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  //remove from cart
  const removeFromCart = (product) => {
    setCart((prev) => prev.filter((cartItem) => cartItem.id !== product.id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartContextProvider };
