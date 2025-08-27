import './Navbar.css'
import logo from '../../assets/logo.png'
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';


const Navbar = () => {

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
            <MenuIcon />
          </IconButton>
        </div>
        <div className="nav-logo">
          <img src={logo} alt="logo" className="nav-logo-img" />
        </div>
        <div className="nav-avatar">
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </div>
      </div>
    </>
  )
}

export default Navbar
