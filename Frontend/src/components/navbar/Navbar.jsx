import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router'
import IconButton from '@mui/material/IconButton';
import { useShopContext } from '../../context/ShopContext';
import { useAuth } from '../../context/AuthContext';
import { Avatar, Box, Menu, MenuItem, Tooltip, Typography } from '@mui/material';

const Navbar = () => {

  const [menu, setmenu] = useState("shop");
  const [isToggle, setToggle] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { getTotalCartItem } = useShopContext();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const settings = ['Orders', 'Profile', user ? 'Logout' : 'Login'];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserNavigation = (setting) => {
    if (setting === "Logout") {
      logout();
      window.location.replace('/')
    } else{
      navigate(`/${setting.toLowerCase()}`);
    }
  }

  return (
    <>
      <div className="navbar">
        <div className="hamburger-menu">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}>
            <MenuIcon onClick={() => setToggle(!isToggle)} />
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
          {/* {localStorage.getItem('auth-token')
            ? <button onClick={() => { logout(); window.location.replace('/') }}>Logout</button>
            : <Link to='/login'><button>Login</button></Link>
          } */}
          <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
          <div className="nav-cart-count">{getTotalCartItem}</div>
 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{width: "50px", height:"50px"}} alt={user ? user.name : ""}  >
                  {(user.name)[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '70px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => {
                  handleUserNavigation(setting)
                  handleCloseUserMenu()
                }}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
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
