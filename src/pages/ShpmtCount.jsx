import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import img from "../images/bgs.jpg";
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
const ShipmentCountCard = () => {
  const [shipmentCount, setShipmentCount] = useState(0); 
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {  
  const fetchShipmentCount = async () => {
    try {
      const token = sessionStorage.getItem('token');  // Retrieve the JWT token from local storage

      if (!token) {
        throw new Error('Token is missing'); 
      }

      const decodedToken = jwtDecode(token);  
      const userEmail = decodedToken.email; 


      const response = await axios.get(`${apiUrl}/ship/${(userEmail)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

    
      setShipmentCount(response.data.length);
    } catch (error) {
      console.error('Error fetching shipment count:', error);

      // Check if the error is a 404 Not Found
      if (error.response && error.response.status === 404) {
        console.log('No shipments found for the user.');

      } else {
        navigate('/');
      }
    }
  };
  
    fetchShipmentCount();
  }, []);

    

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  color: 'white', background: 'linear-gradient(lightaqua, black)' }}>
        <center>
          {shipmentCount?(  <Card style={{backgroundImage: `url(${img})`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat',  width: '400px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
          Number of Shipments Created
        </Typography>
        <Typography variant="h4" sx={{ color: 'white' }}>{shipmentCount}</Typography>
        <Link to="/newShip" style={{ textDecoration: 'none' }}>
            <Button variant="contained" style={{marginTop: '20px', backgroundColor: '#00bcd4', color: 'white',fontWeight:'bold'  }}>
              Create More!!
            </Button>
          </Link>     
      </CardContent>
    </Card>): (
                  <Typography variant="body1" style={{ color: 'white', textAlign: 'center',fontSize: '24px' }}>Loading...</Typography>
                )}
  
    </center>
    </div>
  );
};

export default ShipmentCountCard;
