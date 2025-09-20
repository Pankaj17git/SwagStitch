import React from "react";
import "./OrderDetails.css";
import arrow_icon from '../../Assets/breadcrum_arrow.png'
import { Link, useLocation } from "react-router";
import { useShopContext } from "../../../context/ShopContext";


const OrderDetails = () => {
  const location = useLocation();
  const { all_product, order } = useShopContext();
  const { product } = location.state || {};
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const otherDetails = order.find(u => u._id === product.orderId);

  if (!all_product.length || !product) {
    return <p>Loading order details...</p>;
  }

  const orderItems = product.items.map(itm => {
    const item = all_product.find(p => p.id === itm.productId);
    return {
      image: item.image,
      name: item.name,
      price: itm.price,
      quantity: itm.quantity,
    }
  })


  return (
    <main className="main-container">
      <div className="page">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <ol>
            <li>
              <Link to='/orders'>Orders</Link>
            </li>
            <img src={arrow_icon} alt="" />
            <Link>Order Details</Link>
          </ol>
        </nav>

        {/* Order Info */}
        <div className="order-header">
          <h1>Order # {product.orderId}</h1>
          <p> <strong>Placed on: </strong> {new Date(product.date).toLocaleDateString(undefined, options)}</p>
        </div>

        <div className="grid">
          {/* Left side: Status + Items */}
          <div className="left">
            {/* <div className="card">
              <h3>Order Status</h3>
              <div className="status">
                <div className="status-header">
                  <p>Shipped</p>
                  <p>Estimated delivery: Jan 20, 2024</p>
                </div>
                <div className="progress">
                  <div className="progress-bar" style={{ width: "75%" }}></div>
                </div>
              </div>
            </div> */}

            <div className="card">
              <h3>Items</h3>
              <ul className="items">
                {orderItems.map((item, productId) => (
                  <li key={productId}>
                    <div className="item-img">
                      <img
                        src={item.image}
                      />
                    </div>
                    <div className="item-info">
                      <div className="item-header">
                        <h4>{item.name}</h4>
                        <p>₹{item.price}</p>
                      </div>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right side: Addresses, Payment, Summary */}
          <div className="right">
            <div className="card">
              <h3>Shipping Address</h3>
              <address>
                <span>
                  {otherDetails.address.street}, {otherDetails.address.city}, {otherDetails.address.pincode}
                </span>
              </address>
            </div>

            <div className="card">
              <h3>Billing Address</h3>
              <address>
                <span>
                  {otherDetails.address.street}, {otherDetails.address.city}, {otherDetails.address.pincode}
                </span>
              </address>
            </div>

            <div className="card">
              <h3>Payment Information</h3>
              <dl>
                <div>
                  <dt>Payment Method:</dt>
                  <dd>{otherDetails.paymentmethod}</dd>
                </div>
              </dl>
            </div>

            <div className="card">
              <h3>Order Summary</h3>
              <div className="summary">
                <div>
                  <p>Subtotal</p>
                  <p>₹{otherDetails.subtotal}</p>
                </div>
                <div>
                  <p>Shipping</p>
                  <p>₹{otherDetails.shippingfee}</p>
                </div>
                <div className="total">
                  <p>Total</p>
                  <p>₹{otherDetails.total}</p>
                </div>
              </div>
            </div>

            <div className="actions">
              <button className="btn primary">Track Shipment</button>
              <button className="btn secondary">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderDetails;
