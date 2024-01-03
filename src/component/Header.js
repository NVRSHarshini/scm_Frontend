import React, { useState } from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

// import three from '../images/three.png';
// import login from "../pages/Login";
// import Registration from "../pages/Registration";
import logo from "../images/logo_E.jpg";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import "../styles/HeaderStyles.css";
const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  // hndle menu click
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
   // Handle logout
   const handleLogout = () => {
    // Clear local storage items related to authentication
    localStorage.removeItem("token"); // Remove token or any other relevant data

    // You can redirect to the login page or perform any other action after logout
    // For example, redirecting to the login page
    window.location.href = "/registration";
  };
  //menu drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        color={"goldenrod"}
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, my: 2 }}
      >
         <img src={logo} alt="logo" height={"70"} width="200" /> 
      </Typography>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink activeclassname="active" to={"/dashboard"}>
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink to={"/registration"}>Registration</NavLink>
        </li> */}
         {/*<li>
          <NavLink to={"/login"}>Login</NavLink>
        </li>*/}
  <li>
          <NavLink to={"/myAcct"}>Profile</NavLink>
        </li>
        <li>
                  <NavLink to={"/print"}>My Shipment</NavLink>
                </li>
        
        <li>
          <NavLink to={"/newShip"}>Create Shipment</NavLink>
        </li>
        <li>
        <NavLink to={"/registration"} onClick={handleLogout}>
          Logout
        </NavLink>
      </li>
        {/*<li>
          <NavLink to={"/feedback"}>Feedback</NavLink>
        </li>  */}
      </ul>
    </Box>
  );
  return (
    <Box>
        <AppBar component={"nav"} sx={{ bgcolor: "black" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="logo" height={"50"} width="90" style={{ marginRight: '10px' }} />
            <Typography color={"white"} variant="h6">
              Exafluence
            </Typography>
          </Box>
          <Box>
            <ul className="navigation-menu" style={{ fontSize:'large',display: 'flex', listStyleType: 'none', padding: 0 }}>
              <li style={{ marginLeft: '20px' }}>
                <NavLink activeclassname="active" to={"/dashboard"}>
                  Home
                </NavLink>
              </li>
              <li style={{ marginLeft: '20px' }}>
                <NavLink to={"/myAcct"}>
                  Profile
                </NavLink>
              </li>
              <li style={{ marginLeft: '20px' }}>
                <NavLink to={"/newShip"}>
                  New Shipment
                </NavLink>
              </li>
              
              <li style={{ marginLeft: '20px' }}>
                <NavLink to={"/print"}>
                 My Shipment
                </NavLink>
              </li>
              <li style={{ marginLeft: '20px' }}>
        <NavLink to={"/registration"} onClick={handleLogout}>
          Logout
        </NavLink>
      </li>
            </ul>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{
              mr: 2,
              display: { sm: "none" },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: "240px",
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box>
          <Toolbar />
        </Box>
      </Box>
  );
};

export default Header;