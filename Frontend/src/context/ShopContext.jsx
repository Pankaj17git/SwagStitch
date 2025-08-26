import React, { createContext, useContext, useState } from "react"
import dollarToRupees from "../utils/formatCurrency";
import all_product from "../components/Assets/all_product";

const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < all_product.length; i++) {
    cart[i] = 0;
  }
  return cart;
}

const ShopContexProvider = (props) => {

  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [addresses, setAddresses] = useState([]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item]
      }
    }
    return dollarToRupees(totalAmount, 60);
  }

  const getTotalCartItem = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item]
      }
    }
    return totalItem;
  }

  const addAddress = (newAddress) => {
    setAddresses((prev) => [...prev, newAddress]);
  };

  const contextValue = {
    all_product, cartItems, addToCart, removeFromCart,
    getTotalCartAmount, getTotalCartItem, addAddress,
    addresses
  };
  return (
    <>
      <ShopContext value={contextValue}>
        {props.children}
      </ShopContext>
    </>
  )
}

const useShopContext = () => useContext(ShopContext);

// eslint-disable-next-line react-refresh/only-export-components
export { ShopContexProvider, useShopContext };