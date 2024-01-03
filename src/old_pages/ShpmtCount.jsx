import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import img from "../images/bgs.jpg";
import { useNavigate } from 'react-router-dom';

const ShipmentCountCard = () => {
  const [shipmentCount, setShipmentCount] = useState(0);
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
    const fetchShipmentCount = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Token is missing');
        }

        const userEmail = extractEmailFromToken(token) + '@gmail.com';

        const response = await axios.get(`http://127.0.0.1:8000/ship/${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setShipmentCount(response.data.length);
      } catch (error) {
        console.error('Error fetching shipment count:', error);
        // Handle error, e.g., redirect to login page
        navigate('/registration');
      }
    };

    fetchShipmentCount();
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  color: 'white', background: 'linear-gradient(lightaqua, black)' }}>
        <center>
    <Card style={{backgroundImage: `url(${img})`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat',  width: '400px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Number of Shipments Created:
        </Typography>
        <Typography variant="h4">{shipmentCount}</Typography>
      </CardContent>
    </Card>
    </center>
    </div>
  );
};

export default ShipmentCountCard;
