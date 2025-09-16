import React from 'react'
import './OrderList.css'
import {Link} from 'react-router'

const OrderList = ({ product }) => {  
  return (
    <>
      <div className="main">
        <div className="orderList">
          {/* Product Info */}
          <div className="productInfo">
            <img
              src={product.image}
              alt={product.name}
            />
            <div>
              <p className="product-name">{product.name}</p>
              <p className="product-order-id">Order #{product.orderId}</p>
            </div>
          </div>

          {/* Status */}
          <div className="status-container">
            <p>Status</p>
            <span
              className={`${product.statusClass}`}
            >
              {product.status}
            </span>
          </div>

          {/*Items*/}
          <div className="order-total-conatainer">
            <p className="total">Items</p>
            <p>{product.items.length}</p>
          </div>

          {/* Total */}
          <div className="order-total-conatainer">
            <p className="total">Total</p>
            <p className="total-price">{product.total}</p>
          </div>

          {/* Link */}
          <div className="detail">
            <Link
              to="/orders/orderdetails"
              state={{ product }}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderList
