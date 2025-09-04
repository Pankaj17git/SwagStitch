import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
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
    const fetchProductsAndCart = async () => {
      try {
        const productRes = await fetch('http://localhost:4000/products');
        const products = await productRes.json();
        setAll_Product(products);

        if (localStorage.getItem('auth-token')) {
          const cartRes = await fetch('http://localhost:4000/cart/', {
            method: 'POST',
            headers: {
              'Accept': 'application/form-data',
              'auth-token': localStorage.getItem('auth-token'),
              'Content-Type': 'application/json'
            },
            body: ''
          });
          const cartData = await cartRes.json();
          setCartItems(cartData);
        }
      } catch (error) {
        console.error('Failed to fetch products or cart:', error);
      }
    };
    fetchProductsAndCart();
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
        body: JSON.stringify({ "itemId": itemId })
      }).then((res) => res.json())
    }
  }

  const getTotalCartAmount = useMemo(() => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return dollarToRupees(totalAmount, 60);
  },[cartItems, all_product]);


  const getTotalCartItem = useMemo(() => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item]
      }
    }
    return totalItem;
  }, [cartItems])



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