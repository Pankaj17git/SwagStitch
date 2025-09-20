import React from "react";
import "./OrderList.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import OrderDetails from "../users/orderDetail/OrderDetail";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const OrdersList = () => {
  const [ordersDetail, setOrderDetail] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [detail, setDetail] = useState();
  const { customer } = useAuth();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}order/admin`);
        setOrderDetail(res.data.orders);
      } catch (error) {
        console.error("Something went wrong!", error);
      }
    }
    fetchOrders();
  }, []);

  const getDate = (date) => {
    if (!date) {
      return `-`
    }
    const newDate = new Date(date)
    const simpleLocalFormat = newDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return simpleLocalFormat
  }

  const enrichedOrders = ordersDetail.map(order => {
    const user = customer.find(p => p._id === order.userId);
    return {
      orderId: order._id,
      customer: user,
      items: order.items,
      total: order.total,
      status: order.status,
      paymentmethod: order.paymentmethod,
      address: order.address,
      shippingfee: order.shippingfee,
      subtotal: order.subtotal,
      date: order.createdAt
    }
  })


  return (
    <main className="orders-container">
      <div className="orders-header">
        <h2>All Orders</h2>
        <p>Manage and track all customer orders.</p>
      </div>

      {/* Search + Buttons */}
      <div className="orders-toolbar">
        <input
          type="search"
          className="search-input"
          placeholder="Search by order ID, email, or customer ID"
        />
        {/* <div className="toolbar-buttons">
          <button className="btn btn-outline">Filter</button>
          <button className="btn btn-primary">New Order</button>
        </div> */}
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>OrderId</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {enrichedOrders.map((order, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td>{order.orderId}</td>
                  <td>
                    <div className="customer-name">{order.customer.name}</div>
                    <div className="customer-email">{order.customer.email}</div>
                  </td>
                  <td>{(order.items).length}</td>
                  <td>₹{order.total}</td>
                  <td>
                    <span className="status shipped">{order.status}</span>
                  </td>
                  <td>{!order.date ? '-' : getDate(order.date)}</td>
                  <td>
                    <span onClick={() => {setOpenDialog(true);setDetail(order)}} className="link">
                      View
                    </span>
                  </td>
                </tr>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                  <DialogContent>
                    <div>
                      <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, padding: 0 }}
                        onClick={() => setOpenDialog(false)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </div>
                    <OrderDetails order={detail}/>
                  </DialogContent>
                </Dialog>
              </React.Fragment>
            ))}

            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OrdersList;
