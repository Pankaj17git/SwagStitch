import React from "react";
import "./Dashboard.css";
import { Link } from "react-router";

const statsData = [
  {
    icon: "bx-dollar-circle",
    color: "#27891f",
    label: "Total Sales",
    value: "45,231.89"
  },
  {
    icon: "bx-user-hexagon",
    color: "#307af8",
    label: "Total Users",
    value: "2,350"
  },
  {
    icon: "bx-hourglass",
    color: "#daf830ff",
    label: "Pending Orders",
    value: "128"
  },
  {
    icon: "bx-store",
    color: "#f8304bff",
    label: "Total Products",
    value: "5,678"
  }
];


const Dashboard = () => {
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdsmXA2q_N1XjkJvUdZLt8xdP_yMGgPLL-zjwkoX8ZaWSHervjnoAvbD5zg6AKVmzBdXsTrgkPFkxuHFM9TGAawv15n8lTl60D7Xdcja4hBNkUyAa7Q0hP0D7TiQsNCi1863zzVfq7dc4z0ak-qKcegKC-BHsTenVP93ErBtdZ6SMT8tSjjufLpMdECaFysL17wPpnYIdqy_IAbyE03oF4M0aSjvZiKz6VHkWkuZwB0xLAVwkYhzcQJBwykr-lDDPvb1VEwysxkQ"
                alt="Running Shoes"
              />
              <div className="product-info">
                <p className="product-name">Running Shoes</p>
                <p className="small-text">2,104 sold</p>
              </div>
              <p className="product-price">$12,500</p>
            </div>
            <div className="product-item">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-TzpMg6gutTyNBdHUW29jFEWiDGQrMvlGqq5Ed5S8RdgTiEslJ0GwrhjeiPGPwxtl0JyaaQ4UnjvCrMMdl91mWmCCPpLLniYXNO__B0hKahfGz7lsJzTgldwZKnr07NmRLwV0tjD6Zy1DLXznVWTbbw7sEbskuUzC-9cflHU_Da-tHw0E2DQN64Ch9drAyBAOfOS8Zu3Dq9dk49tgLHXYKsWtpI0E2NG2QzkY16r6oS3HrswOeKEZVWAcWYkRq6N4D-Kl9k1vAg"
                alt="Vintage Camera"
              />
              <div className="product-info">
                <p className="product-name">Vintage Camera</p>
                <p className="small-text">1,897 sold</p>
              </div>
              <p className="product-price">$11,200</p>
            </div>
            <div className="product-item">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4APCodKYW-hznMIRGBL_xk8w59aeuj9U2S7LTwHdxic3heeNXwUJraFa4zZ2XCTYYR8PcZcVgj51xSKG_pwY7gQ0mUzgFCZQ2OqXa8ufAIrGZ3UFzzm6DM2vMQmuHKFrSFg0QJM0QfnbThqkbCCV78HZEXiRn1xtyK2Z6jmXAp8UORZSfr2Cp0ie5RXC-Zq29_EwMQ_cfXP0RLx1IUpdq1EZPd0H295c7gKfsJZcmjxBY68ROggIYtpWxfN14-tm3q6zLVQwx2Q"
                alt="Wireless Headphones"
              />
              <div className="product-info">
                <p className="product-name">Wireless Headphones</p>
                <p className="small-text">1,543 sold</p>
              </div>
              <p className="product-price">$9,800</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
