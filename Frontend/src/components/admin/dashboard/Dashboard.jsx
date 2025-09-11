import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <main className="dashboard-main">
        {/* Stats Cards */}
        <section className="grid-2">
          <div className="card">
            <i className='bxr  bx-dollar-circle' style={{ color: '#27891f' }}></i>
            <p className="small-text">Total Sales</p>
            <p className="value">$45,231.89</p>
          </div>
          <div className="card">
            <i className='bxr  bx-user-hexagon'  style={{color:'#307af8'}}></i> 
            <p className="small-text">New Users</p>
            <p className="value">2,350</p>
          </div>
          <div className="card">
            <span className="material-symbols-outlined yellow">pending_actions</span>
            <p className="small-text">Pending Orders</p>
            <p className="value">128</p>
          </div>
          <div className="card">
            <span className="material-symbols-outlined purple">inventory_2</span>
            <p className="small-text">Total Products</p>
            <p className="value">5,678</p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="grid-2">
          <a className="link-card" href="#">
            <span className="material-symbols-outlined">group</span>
            <span>User Management</span>
          </a>
          <a className="link-card" href="#">
            <span className="material-symbols-outlined">receipt_long</span>
            <span>Order Management</span>
          </a>
          <a className="link-card" href="#">
            <span className="material-symbols-outlined">inventory</span>
            <span>Product Inventory</span>
          </a>
          <a className="link-card" href="#">
            <span className="material-symbols-outlined">monitoring</span>
            <span>Analytics</span>
          </a>
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
