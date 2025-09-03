import React, { useEffect, useState } from 'react'
import CartItems from '../components/cartItems/CartItems'



const Cart = () => {

  const [data, setData] = useState([])
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    if(token) {
      fetch('http://localhost:4000/cart', {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': "application/json"
        },
        body: ""
      }).then((res) => res.json())
        .then((data) => setData(data))
    }
  }, [])

  return (
    <>
      <CartItems/>
    </>
  )
}

export default Cart
