import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';  
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Lay from "../component/Lay.js";
import img from "../images/dash_one.jpg";
import ShipmentCountCard from '../pages/ShpmtCount.jsx';
import '../styles/MyAcct.css';  
const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);  
  const navigate = useNavigate(); 
  const apiUrl = process.env.REACT_APP_API_URL;
  const fetchUserProfile = async () => {
    try {
      const token = sessionStorage.getItem('token');  // Retrieve the JWT token from local storage

      if (!token) {
        throw new Error('Token is missing'); 
      }

      const decodedToken = jwtDecode(token);  
      const userEmail = decodedToken.email;  // Extract the email from the decoded token

      // Fetch user profile from the server using the email and token for authentication
      const response = await axios.get(`${apiUrl}/profile/${(userEmail)}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the request headers for authentication
        },
      });

      setUserProfile(response.data);  // Set the user profile data in the state
    } catch (error) {
      console.error('Error fetching user profile:', error);
      navigate('/');  // Navigate to the home page if there is an error or the token is missing
    }
  };

  useEffect(() => {    
    fetchUserProfile();  // Call the fetchUserProfile function on component mount
  }, [navigate]);  // Re-run the effect if the navigate function changes

  return (
    <Lay>
      <div id="dashboard-container">
        <center>
          <div className="customer-card">
            <Card className="card" style={{ backgroundImage: `url(${img})` }}>
              <CardContent className="card-content">
                {userProfile ? ( 
                  <>
                    <AccountCircleIcon className="account-icon" />
                    <Typography variant="h5" component="div" className="username">
                      {userProfile.username}
                    </Typography>
                    <Typography className="user-details" color="textSecondary">
                      Email: {userProfile.email}
                    </Typography>
                    <Typography className="user-details" color="textSecondary">
                      Phone: {userProfile.phone}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" className="loading-text">Loading...</Typography>  // Display loading text while fetching data
                )}
              </CardContent>
            </Card>
          </div>
        </center>
      </div>
      <ShipmentCountCard />  
    </Lay>
  );
};

export default UserProfile;
