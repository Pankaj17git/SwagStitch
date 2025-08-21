import React from 'react'
import { useShopContext } from '../../context/ShopContext'
import './BillingDetails.css'
import { useNavigate } from 'react-router'

const BillingDetails = (props) => {
  const navigate = useNavigate()

  const {getTotalCartAmount} = useShopContext();
  const shippingFee =  props.deliveryCharge === 'Free' ? 0 : props.deliveryCharge ;
  const subTotal = getTotalCartAmount();
  const total = subTotal + shippingFee

  const handleCheckout = () => {
    navigate(`/${props.path}`)
  }

  return (
    <>
      <div className="billing-container">
        <div className="billing-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="billing-total-item">
              <p>Subtotal</p>
              <p>₹{subTotal}</p>
            </div>
            <hr />
            <div className="billing-total-item">
              <p>Shipping Fee</p>
              <p>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</p>
            </div>
            <hr />
            <div className="billing-total-item">
              <h3>Total</h3>
              <h3>₹{total}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>PROCEED TO {props.label}</button>
        </div>
      </div>
    </>
  )
}

export default BillingDetails
