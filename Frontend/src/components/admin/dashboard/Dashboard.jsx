import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Link } from "react-router";
import { useShopContext } from "../../../context/ShopContext";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [ordersDetail, setOrderDetail] = useState([]);
  const { all_product } = useShopContext();
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

  let pendingOrders = ordersDetail.filter(order => order.status === "pending")
  const totalOrderAmount = ordersDetail.map(order => {
    return order.total
  });

  let totalSale = totalOrderAmount.reduce((acc, current) => acc + current, 0);

  const statsData = [
    {
      icon: "bx-dollar-circle",
      color: "#27891f",
      label: "Total Sales",
      value: `₹${totalSale}`
    },
    {
      icon: "bx-user-hexagon",
      color: "#307af8",
      label: "Total Users",
      value: customer.length
    },
    {
      icon: "bx-hourglass",
      color: "#daf830ff",
      label: "Pending Orders",
      value: pendingOrders.length
    },
    {
      icon: "bx-store",
      color: "#f8304bff",
      label: "Total Products",
      value: all_product.length
    }
  ];


  return (
    <div className="dashboard">
      <main className="dashboard-main">
        {/* Stats Cards */}
        <section className="grid-2">
          {statsData.map((item, index) => (
            <div className="card" key={index}>
              <i className={`bx ${item.icon}`} style={{ color: item.color }}></i>
              <p className="small-text">{item.label}</p>
              <p className="value">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Quick Links */}
        <section className="grid-2">
          <Link className="link-card" to="/admin/userlist">
            <i className='bxr  bx-community' style={{ color: '#8ebd8eff' }}></i>
            <span>User Management</span>
          </Link>
          <Link className="link-card" to="/admin/orderlist">
            <i className='bx bx-receipt' style={{ color: '#d17fb0ff' }}></i>
            <span>Order Management</span>
          </Link>
          <Link className="link-card" to="/admin/productlist">
            <i className='bx bx-store' style={{ color: '#edc515ff' }}></i>
            <span>Product Inventory</span>
          </Link>
          <Link className="link-card" to="">
            <i className='bxr  bx-report' style={{ color: '#96845bff' }}></i>
            <span>Analytics</span>
          </Link>
        </section>

        {/* Top Selling Products */}
        <section className="card">
          <h2 className="section-title">Top Selling Products</h2>
          <div className="product-list">
            <div className="product-item">
              <img
                src={`${BASE_URL}images/product_1756444364862.png`}
                alt="Running Shoes"
              />
              <div className="product-info">
                <p className="product-name">Slim Fit Bomber Jacket</p>
                <p className="small-text">2,104 sold</p>
              </div>
              <p className="product-price">₹4,500</p>
            </div>
            <div className="product-item">
              <img
                src={`${BASE_URL}images/product_1756443735800.png`}
              />
              <div className="product-info">
                <p className="product-name">Collar Peplum Hem Blouse</p>
                <p className="small-text">1,897 sold</p>
              </div>
              <p className="product-price">₹5,200</p>
            </div>
            <div className="product-item">
              <img
                src={`${BASE_URL}images/product_1756444120305.png`}
              />
              <div className="product-info">
                <p className="product-name">Collar Peplum Hem Blouse</p>
                <p className="small-text">1,543 sold</p>
              </div>
              <p className="product-price">₹4,800</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
