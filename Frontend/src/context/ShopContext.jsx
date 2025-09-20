import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import dollarToRupees from "../utils/formatCurrency";
import getDiscount from "../utils/discount";
import axios from "axios";
import { useAuth } from "./AuthContext";

const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i <= 300; i++) {
    cart[i] = 0;
  }
  return cart;
};

const ShopContexProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [order, setOrder] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { user } = useAuth();

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //  derived data: cart item details
  const cartItemDetail = useMemo(() => {
    return all_product
      .filter((item) => cartItems[item.id] > 0)
      .map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: cartItems[item.id],
        price: dollarToRupees(item.new_price, 60),
      }));
  }, [all_product, cartItems]);


  useEffect(() => {
    const fetchProductsAndCart = async () => {
      try {
        const productRes = await fetch(`${BASE_URL}products`);
        const products = await productRes.json();
        setAll_Product(products);

        if (localStorage.getItem("auth-token")) {
          const cartRes = await fetch(`${BASE_URL}cart/`, {
            method: "POST",
            headers: {
              "Accept": "application/form-data",
              "auth-token": localStorage.getItem("auth-token"),
              "Content-Type": "application/json",
            },
            body: "",
          });
          const cartData = await cartRes.json();
          setCartItems(cartData);
        }
      } catch (error) {
        console.error("Failed to fetch products or cart:", error);
      }
    };

    fetchProductsAndCart();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}order?userId=${user._id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    fetchOrders();
  }, []);

  const addToCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      axios.post(`${BASE_URL}cart/add`, { itemId }, {
        headers: { "auth-token": localStorage.getItem("auth-token") }
      }).catch(console.error);
    }
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      axios.post(`${BASE_URL}cart/removefromcart`, { itemId }, {
        headers: { "auth-token": localStorage.getItem("auth-token") }
      }).catch(console.error);
    }
  }, []);

  const getTotalCartAmount = useMemo(() => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return dollarToRupees(totalAmount, 60);
  }, [cartItems, all_product]);

  const getTotalCartItem = useMemo(() => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  }, [cartItems]);

  const getTotalOrderAmount = useMemo(() => {
    const subTotal = getTotalCartAmount;
    const discountResult = getDiscount(subTotal);
    return discountResult.discountedPrice + deliveryCharge;
  }, [getTotalCartAmount, deliveryCharge]);

  const cleanUp = useCallback(() => {
    setCartItems(getDefaultCart());
    setDeliveryCharge(0);
  }, []);

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    order,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItem,
    getTotalOrderAmount,
    deliveryCharge,
    setDeliveryCharge,
    paymentMethod,
    setPaymentMethod,
    cartItemDetail,
    cleanUp
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

const useShopContext = () => useContext(ShopContext);

// eslint-disable-next-line react-refresh/only-export-components
export { ShopContexProvider, useShopContext };
