import React from 'react'
import OrderList from './OrderList'
import './OrderCard.css'
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useState } from 'react';
import { useShopContext } from '../../context/ShopContext';



const OrderCard = () => {

  const [order, setOrder] = useState([]);
  const { user } = useAuth();
  const { all_product } = useShopContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/order?userId=${user._id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    fetchOrders();
  }, [])

  const enrichedOrders = order.map(order => {
    const firstItem = order.items[0]; 
    const product = all_product.find(p => p.id === firstItem.productId);

    return {
      orderId: order._id,
      total: order.total,
      items: order.items.length,
      status: order.status,
      image: product?.image,
      name: product?.name,
      statusClass: order.status === "pending" ? "pending" : "completed"
    };
  });



  return (
    <>
      <main className="orders-main">
        <div className="orders-container">
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
