import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import logo_E from "../images/logo_E.jpg";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CloudSyncIcon from '@mui/icons-material/CloudSync';

const Layout = ({ children }) => {
  return (
    <>
      
      <div class="sidebar">
      <span>

  <img src={logo_E} alt="not found"/>
  <label className="nav-item">Exafluence</label></span>

  <div class="brand">  
    
    <span></span>
    <br></br>
    <span>
  <SpaceDashboardIcon></SpaceDashboardIcon></span>
  
  <span ><a href="/"><h6>Dashboard</h6></a></span>
  </div>
  <ul class="nav-list">
    <li class="nav-item">
      <a href="/MyAcct">
        <span class="nav-item__icon">
        <PersonIcon></PersonIcon>
        </span>
        <span class="nav-item__text">
          My Account
        </span>
      </a>
    </li>
    <li class="nav-item">
      <a href="/newShip">
        <span class="nav-item__icon">
          <PostAddIcon></PostAddIcon>
        </span>
        <span class="nav-item__text">
          Create Shipment
        </span>
      </a>
    </li>
    <li class="nav-item">
      <a href="/myShip">
        <span class="nav-item__icon">
          <LocalShippingIcon></LocalShippingIcon>
        </span>
        <span class="nav-item__text">
           My Shipment
        </span>
      </a>
    </li>
    <li class="nav-item">
      <a href="#">
        <span class="nav-item__icon">
          <CloudSyncIcon> </CloudSyncIcon>
        </span>
        <span class="nav-item__text">
           Data Streaming.coming soon
        </span>
      </a>
    </li>
  </ul>
  <ul class="nav-list">
    
    <li class="nav-item">
      <a href="/registration">
        <ExitToAppIcon><span class="nav-item__icon logout">
          
        </span></ExitToAppIcon>
        <span class="nav-item__text">
           Logout
        </span>
      </a>
    </li>
  </ul>
</div>
      <div>{children}</div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;