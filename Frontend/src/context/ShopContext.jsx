import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import dollarToRupees from "../utils/formatCurrency";
import getDiscount from "../utils/discount";

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
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [order, setOrder] = useState({});
  
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
    console.log("Order updated:", order);
  }, [order]);

  useEffect(() => {
    const fetchProductsAndCart = async () => {
      try {
        const productRes = await fetch("http://localhost:4000/products");
        const products = await productRes.json();
        setAll_Product(products);

        if (localStorage.getItem("auth-token")) {
          const cartRes = await fetch("http://localhost:4000/cart/", {
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

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/cart/add", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/cart/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      }).then((res) => res.json());
    }
  };

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

  const cleanUp = async() => {
    setCartItems(getDefaultCart());
    setDeliveryCharge(0);
  }

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItem,
    getTotalOrderAmount,
    deliveryCharge,
    setDeliveryCharge,
    paymentMethod,
    setPaymentMethod,
    setOrder,
    order,
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
