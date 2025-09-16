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
            <i className='bxr  bx-grid-search' style={{ color: '#cc687eff' }}></i>
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to={'/admin/addproduct'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <i className='bxr bx-plus-square' style={{ color: '#c275e0ff' }}></i>
            <p>Add Product</p>
          </div>
        </Link>
        <Link to={'/admin/productlist'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <i className='bxr bx-list-ul-square' style={{ color: '#ecc44eff' }}></i>
            <p>Product List</p>
          </div>
        </Link>
        <Link to={'/admin/userlist'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <i className='bxr bx-group' style={{ color: '#555ab9ff' }}></i>
            <p>Users List</p>
          </div>
        </Link>
        <Link to={'/admin/orderlist'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <i className='bx bx-shopping-bag-alt' style={{ color: '#b1dbb1ff' }}></i>
            <p>Orders List</p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Sidebar
