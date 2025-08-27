import React from 'react'
import './Sidebar.css'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router'


const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link to={'/addproduct'} style={{textDecoration: "none"}}>
          <div className="sidebar-item">
            <AddShoppingCartIcon/>
            <p>Add Product</p>
          </div>
        </Link>
         <Link to={'/listproduct'} style={{textDecoration: "none"}}>
          <div className="sidebar-item">
            <AddShoppingCartIcon/>
            <p>Product List</p>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Sidebar
