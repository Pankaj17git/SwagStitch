import React, { createContext, useContext, useEffect, useState } from "react"
import dollarToRupees from "../utils/formatCurrency";
// import axios from 'axios'

const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) {
    cart[i] = 0;
  }
  return cart;
}

const ShopContexProvider = (props) => {

  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch('http://localhost:4000/products')
      .then((res) => res.json())
      .then((data) => setAll_Product(data));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/cart/', {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': "application/json"
        },
        body: ""
      }).then((res) => res.json())
        .then((data) => setCartItems(data))
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1
    }));
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/cart/add', {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ "itemId": itemId }),
      }).then((res) => res.json()).
        then((data) => console.log(data))
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/cart/removefromcart', {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ "itemId": itemId})
      }).then((res) => res.json())
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
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



  const contextValue = {
    all_product, cartItems, addToCart, removeFromCart,
    getTotalCartAmount, getTotalCartItem,
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