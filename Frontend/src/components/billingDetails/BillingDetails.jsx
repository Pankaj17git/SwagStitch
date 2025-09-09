import React from 'react'
import { useShopContext } from '../../context/ShopContext'
import './BillingDetails.css'
import getDiscount from '../../utils/discount'
import { useNavigate } from 'react-router'

const BillingDetails = (props) => {
  const navigate = useNavigate()

  const { getTotalCartAmount, getTotalOrderAmount, deliveryCharge } = useShopContext();
  const subTotal = getTotalCartAmount;
  const discountResult = getDiscount(subTotal)
  const handleCheckout = () => {
    if (props.onClick && props.path === "payment") {
      props.onClick();
      navigate(`/${props.path}`)
    } else {
      navigate(`/${props.path}`)
    }


  }

  return (
    <>
      <div className="billing-container">
        <div className="billing-total">
          <div>
            <div className="billing-total-item">
              <p>Subtotal</p>
              <p>₹{subTotal}</p>
            </div>
            <hr />
            <div className="billing-total-item">
              <p>Shipping Fee</p>
              <p>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</p>
            </div>
            <hr />
            <div className="billing-total-item">
              <p>Discount</p>
              <p>{discountResult.discountPercentage}%</p>
            </div>
            <hr />
            <div className="billing-total-item">
              <h3>Total</h3>
              <h3>₹{getTotalOrderAmount}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>{props.label}</button>
        </div>
      </div>
    </>
  )
}

export default BillingDetails
