import React from 'react'
import './CartItems.css'
import { useShopContext } from '../../context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'
import dollarToRupees from '../../utils/formatCurrency';
import BillingDetails from '../billingDetails/BillingDetails';
const CartItems = () => {
  const { all_product, cartItems, removeFromCart } = useShopContext();
  return (
    <>
      <div className="cartitems">
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e) => {

          if (cartItems[e.id] > 0) {
            return (
              <div>
                <div className="cartitems-format cartitems-format-main">
                  <img src={e.image} alt="" className="carticon-product-icon" />
                  <p>{e.name}</p>
                  <p>₹{dollarToRupees(e.new_price, 60)}</p>
                  <button className="cartitems-quantity">{cartItems[e.id]}</button>
                  <p>₹{dollarToRupees(e.new_price, 60) * cartItems[e.id]}</p>
                  <img src={remove_icon} onClick={() => { removeFromCart(e.id) }} />
                </div>
                <hr />
              </div>
            )
          }
          return null;
        })}

        <div className='cartitems-down'>
          <div>
            <h1 style={{paddingLeft: '10px', borderLeft: '5px solid #ff5a5a'}}>Cart Totals</h1>
            <BillingDetails deliveryCharge={'Free'} shipping path='checkout' label='PROCEED TO CHECKOUT' />
          </div>
          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartItems
