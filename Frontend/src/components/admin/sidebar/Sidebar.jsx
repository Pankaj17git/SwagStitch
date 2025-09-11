import React from 'react'
import './Sidebar.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router'


const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link to={'/admin'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <AddShoppingCartIcon />
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to={'/admin/addproduct'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <AddShoppingCartIcon />
            <p>Add Product</p>
          </div>
        </Link>
        <Link to={'/admin/productlist'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <AddShoppingCartIcon />
            <p>Product List</p>
          </div>
        </Link>
        <Link to={'/admin/userlist'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <AddShoppingCartIcon />
            <p>Users List</p>
          </div>
        </Link>
        <Link to={'/admin/orderlist'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <AddShoppingCartIcon />
            <p>Orders List</p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Sidebar
