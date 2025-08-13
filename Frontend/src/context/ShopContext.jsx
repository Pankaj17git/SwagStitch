import React, { createContext, useContext } from "react"
import all_product from "../components/Assets/all_product";

const ShopContext  = createContext(null);

const ShopContexProvider = (props) => {

  const contextValue = {all_product}
  
  return (
    <>
      <ShopContext value={contextValue}>
        {props.children}
      </ShopContext>
    </>
  )
}

const useShopContext = () => useContext(ShopContext);

export {ShopContexProvider, useShopContext};