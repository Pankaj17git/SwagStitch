import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router'
import IconButton from '@mui/material/IconButton';
import { useShopContext } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';


const Navbar = () => {

  const [menu, setmenu] = useState("shop");
  const [isToggle, setToggle] = useState(false);
  const {getTotalCartItem} = useShopContext();

  const { user, logout } = useAuth();

  return (
    <>
      <div className="navbar">
        <div className="hamburger-menu">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2  }}>
            <MenuIcon onClick={() => setToggle(!isToggle)}/>
          </IconButton>
        </div>
        <div className="nav-logo">
          <img src={logo} alt="logo" className="nav-logo-img" />
        </div>
        <div className="nav-list-container">
          <ul className="nav-menu">
            <li onClick={() => { setmenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
            <li onClick={() => { setmenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
            <li onClick={() => { setmenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
            <li onClick={() => { setmenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>

            {
              user?.role === "admin" && (
                <>
                  <li><Link style={{ textDecoration: 'none' }} to='/admin'>Admin Panel</Link></li>
                </>
              )
            }
          </ul>
        </div>
        <div className="nav-login-cart">
          {localStorage.getItem('auth-token')
            ? <button onClick={() => {logout(); window.location.replace('/')}}>Logout</button>
            : <Link to='/login'><button>Login</button></Link>
          }
          <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
          <div className="nav-cart-count">{getTotalCartItem()}</div>
        </div>
      </div>
      {
        isToggle && (
          <div className="hidden-menu">
            <ul className="nav-menu">
              <li style={{ borderRight: '2px solid gray' }} onClick={() => { setmenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link> {menu === "shop" ? <hr /> : <></>}</li>
              <li style={{ borderRight: '2px solid gray' }} onClick={() => { setmenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link> {menu === "mens" ? <hr /> : <></>}</li>
              <li style={{ borderRight: '2px solid gray' }} onClick={() => { setmenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link> {menu === "womens" ? <hr /> : <></>}</li>
              <li onClick={() => { setmenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
            </ul>
          </div>
        )
      }

    </>
  )
}

export default Navbar
