import React from 'react'
import { useShopContext } from '../../context/ShopContext'
import './BillingDetails.css'
import getDiscount from '../../utils/discount'
import { useNavigate } from 'react-router'

const BillingDetails = (props) => {
  const navigate = useNavigate()

  const {getTotalCartAmount} = useShopContext();
  const shippingFee =  props.deliveryCharge === 'Free' ? 0 : props.deliveryCharge ;
  const subTotal = getTotalCartAmount;
  const discountResult = getDiscount(subTotal)
  const handleCheckout = () => {
    navigate(`/${props.path}`)
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
              <p>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</p>
            </div>
            <hr />
            <div className="billing-total-item">
              <p>Discount</p>
              <p>{discountResult.discountPercentage}%</p>
            </div>
            <hr />
            <div className="billing-total-item">
              <h3>Total</h3>
              <h3>₹{discountResult.discountedPrice + shippingFee}</h3>
            </div>
          </div>
          <button onClick={handleCheckout}>{props.label}</button>
        </div>
      </div>
    </>
  )
}

export default BillingDetails
