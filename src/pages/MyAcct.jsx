import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Lay from "../component/Lay.js";
import img from "../images/dash_one.jpg";
import { useNavigate } from 'react-router-dom';
import ShipmentCountCard from '../pages/ShpmtCount.jsx';


const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  const extractEmailFromToken = (token) => {
    if (!token) {
      return null;
    }

    try {
      const tokenPayload = token.split('.')[1];
      const decodedPayload = atob(tokenPayload);
      const { sub: email } = JSON.parse(decodedPayload);
      return email;
    } catch (error) {
      console.error('Error extracting email from token:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        // if (!token) {
        //   throw new Error('Token is missing');
        // }

        const userEmail = extractEmailFromToken(token) + '@gmail.com';

        const response = await axios.get(`http://127.0.0.1:8000/profile?email=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'application/json',
          },
        });

        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
       // alert('Unauthorized,Please login');
        // Handle errors (e.g., redirect to login if token is missing or invalid)
        // navigate('/registration'); // Redirect to login page if token is invalid or missing
      }
    };

    fetchUserProfile();
  }, [navigate]);

  

  return (
    <Lay>
      <div style={{ marginTop:'80px',display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', background: 'linear-gradient(lightaqua, black)' }}>
        <center>
          <div className="customer-card"style={{ marginTop: '20px',marginBottom:'20px' }}>
            <Card style={{backgroundImage: `url(${img})`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat',width:'700px',height: '400px'}}>
              <CardContent style={{ textAlign: 'center', width: '400px', height: '250px' ,marginTop:'70px'}}>
                {userProfile ? (
                  <>
                    <AccountCircleIcon fontSize="large" style={{ color: 'cyan' }} />
                    <Typography variant="h5" component="div" style={{ color: 'white' ,fontSize: '34px' }}>
                      {userProfile.username}
                    </Typography>
                    {/* <Typography color="textSecondary" style={{ fontWeight: 'bold', color: 'white' ,fontSize: '24px'}}>
                      ID: {userProfile._id} */}
                    {/* </Typography> */}
                    <Typography color="textSecondary" style={{ fontWeight: 'bold', color: 'white',fontSize: '24px' }}>
                      Email: {userProfile.email}
                    </Typography>
                    <Typography color="textSecondary" style={{ fontWeight: 'bold', color: 'white' ,fontSize: '24px'}}>
                      Phone: {userProfile.phone}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" style={{ color: 'white', textAlign: 'center',fontSize: '24px' }}>Loading...</Typography>
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
