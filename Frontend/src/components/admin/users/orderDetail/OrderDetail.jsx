import React from "react";
import "./OrderDetail.css";

const OrderDetails = ({ order }) => {
  if (!order) return <p>No order data available</p>;
  console.log(order);
  console.log(order.items);
  
  return (
    <div className="order-card">
      <div className="order-header">
        <h2>Order Summary</h2>
        <span className={`status ${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </div>

      <div className="order-section">
        <p><span className="label">Order ID:</span> {order.orderId}</p>
        <p><span className="label">User ID:</span> {order.customer._id}</p>
        <p><span className="label">Payment:</span> {order.paymentmethod}</p>
      </div>

      <div className="order-section">
        <h3>Items</h3>
        <ul>
          {order.items?.map((item) => (
            <li key={item.productId} className="order-item">
              <div className="item-info">
                <p className="item-name">{item.name}</p>
                <p className="item-qty">Qty: {item.quantity}</p>
              </div>
              <div className="item-price">₹{item.price}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="order-section totals">
        <p><span className="label">Subtotal:</span> ₹{order.subtotal}</p>
        <p><span className="label">Shipping Fee:</span> ₹{order.shippingfee}</p>
        <p className="grand-total">
          <span className="label">Total:</span> ₹{order.total}
        </p>
      </div>

      <div className="order-section">
        <h3>Shipping Address</h3>
        {order.address ? (
          <p className="address">
            {order.address.street}, {order.address.city}, {" "}
            {order.address.pincode}
          </p>
        ) : (
          <p className="empty">No address provided</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
