import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lay from "../component/Lay.js";
import { Button, Card, CardContent, CardHeader, Typography, Grid, Avatar } from '@mui/material';
import { EmailOutlined, PhoneOutlined, AccountCircle } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router-dom';
const ShipmentDetails = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Handle token absence/error (redirect to login, show error message, etc.)
          return;
        }
        
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const email = decodedToken.sub; // Assuming 'sub' field holds the email in the token payload

        const response = await axios.get(`http://127.0.0.1:8000/ship/${encodeURIComponent(email)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setShipments(response.data);
      } catch (error) {
        console.error('Error fetching shipments:', error);
        // Handle error (display error message, etc.)
      }
    };

    fetchShipments();
  }, []);
  
  
  
const handleBack=()=>{navigate("/")}
const handlePrint = (shipment) => {
  navigate('/print', { state: { shipmentDetails: shipment } });
};
  return (
    <Lay>
    <div className="see-customers">
    <center><h1 className="mb-4">My Shipments</h1></center>
    <Button className="button77" variant="contained" color="primary" onClick={() => handleBack()}>BACK</Button>
    <div >
      <Grid container spacing={2}>
        {shipments.map((shipment, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                }
                title={`Shipment ID: ${shipment._id}`}
              />
              <CardContent>
                <Typography variant="body2">Shipment Number: {shipment.ShipmentNumber}</Typography>
                <Typography variant="body2">Route Details: {shipment.RouteDetails}</Typography>
                <Typography variant="body2">Device: {shipment.Device}</Typography>
                <Typography variant="body2">PPO Number: {shipment.PPONumber}</Typography>
                <Typography variant="body2">NDC Number: {shipment.NDCNumber}</Typography>
                <Typography variant="body2">Serial Number of Goods: {shipment.SerialNumberOfGoods}</Typography>
                <Typography variant="body2">Container Number: {shipment.ContainerNumber}</Typography>
                <Typography variant="body2">Goods: {shipment.Goods}</Typography>
                <Typography variant="body2">Date: {shipment.Date}</Typography>
                <Typography variant="body2">Delivery Number: {shipment.DeliveryNumber}</Typography>
                <Typography variant="body2">Batch ID: {shipment.BatchId}</Typography>
                <Typography variant="body2">Shipment Description: {shipment.ShipmentDescription}</Typography>
                <button className="button77" onClick={() => handlePrint(shipment.ShipmentNumber)}>Print</button> 
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
  </Lay>
  );
};

export default ShipmentDetails;
