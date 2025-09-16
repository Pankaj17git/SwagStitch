import React from 'react'
import OrderList from './OrderList'
import './OrderCard.css'
import { useShopContext } from '../../context/ShopContext';
import {Link} from 'react-router'
import arrow_icon from '../Assets/breadcrum_arrow.png'




const OrderCard = () => {
  const { all_product, order } = useShopContext();
  console.log(order);
  const enrichedOrders = order.map(order => {
    const firstItem = order.items[0];
    const product = all_product.find(p => p.id === firstItem.productId);

    return {
      orderId: order._id,
      total: order.total,
      items: order.items,
      status: order.status,
      image: product?.image,
      name: product?.name,
      date: order.createdAt,
      statusClass: order.status === "pending" ? "pending" : "completed"
    };
  });

  return (
    <>
      <main className="orders-main">
        <div className="orders-container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <ol>
              <li>
                <Link to='/orders'>Orders</Link>
              </li>
              <img src={arrow_icon} alt="" />
              <Link>Order Details</Link>
            </ol>
          </nav>
          {/* Header */}
          <div className="orders-header">
            <h1 className="orders-title">My Orders</h1>
            <p className="orders-subtitle">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
          </div>

          {/* Orders List */}
          <div className="orders-list">
            {enrichedOrders.map((order, index) => (
              <OrderList key={index} product={order} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default OrderCard
