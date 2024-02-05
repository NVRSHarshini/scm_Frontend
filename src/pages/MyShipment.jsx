// Import necessary dependencies from React and other libraries
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  
import axios from 'axios';
import Lay from "../component/Lay.js";
import { Button, Grid, Card, CardContent, CardHeader, Typography, Avatar, TextField } from '@mui/material';
import ClassSharpIcon from '@mui/icons-material/ClassSharp';
import { useNavigate } from 'react-router-dom';
import "../styles/myShip.css";

// Functional component for ShipmentDetails
const ShipmentDetails = () => {
  // Initialize the useNavigate hook from 'react-router-dom'
  const navigate = useNavigate();

  // State variables for managing shipments and search functionality
  const [shipments, setShipments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredShipments, setFilteredShipments] = useState([]);

 
  // useEffect hook to fetch shipments when the component mounts
  useEffect(() => {   
  // Function to fetch shipments from the server
  const fetchShipments = async () => {
    try {
      const token = sessionStorage.getItem('token');  // Retrieve the JWT token from local storage

      if (!token) {
        throw new Error('Token is missing'); 
      }

      const decodedToken = jwtDecode(token);  
      const email = decodedToken.email; 

      const response = await axios.get(`http://127.0.0.1:8000/ship/${(email)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShipments(response.data);
      setFilteredShipments(response.data);
    } catch (error) {
      console.error('Error fetching shipments:', error);
    }
  };
    fetchShipments();
  }, [navigate]);

  // Function to handle printing of shipment details
  const handlePrint = (shipment) => {
    // Generate printable content
    const printableContent = `
      <h1>Shipment Details</h1>
      <div>
        
        <h3>Shipment ID: ${shipment._id}</h3>
        <p>Shipment Email: ${shipment.email}</p>
        <p>Shipment Number: ${shipment.ShipmentNumber}</p>
        <p>Route Details: ${shipment.RouteDetails}</p>
        <p>Device: ${shipment.Device}</p>
        <p>PPO Number: ${shipment.PPONumber}</p>
        <p>NDC Number: ${shipment.NDCNumber}</p>
        <p>Serial Number of Goods: ${shipment.SerialNumberOfGoods}</p>
        <p>Container Number: ${shipment.ContainerNumber}</p>
        <p>Goods: ${shipment.Goods}</p>
        <p>Date: ${shipment.Date}</p>
        <p>Delivery Number: ${shipment.DeliveryNumber}</p>
        <p>Batch ID: ${shipment.BatchId}</p>
        <p>Shipment Description: ${shipment.ShipmentDescription}</p>
        </div>
    `;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Shipment Details Print</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              margin: 20px;
            }
            h1 {
              text-align: center;
            }
            h3 {
              margin-bottom: 10px;
            }
            p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          ${printableContent}
        </body>
      </html>
    `);
    // Close the document and initiate the print
    printWindow.document.close();
    printWindow.print();
  };

  // Function to handle going back and resetting search
  const handleBack = () => {    
    setSearchTerm(''); 
    setFilteredShipments(shipments); 
  };

  // Function to handle searching shipments
  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();  
    if (lowercasedSearchTerm.trim() === '') {   
      setFilteredShipments(shipments);
    } else {
      const filteredShipmentsResult = shipments.filter((shipment) => {
        const shipmentNumber = String(shipment.ShipmentNumber);
        return shipmentNumber.toLowerCase().includes(lowercasedSearchTerm);
      });
      setFilteredShipments(filteredShipmentsResult);
    }
  };

  // Return the JSX structure for the component
  return (
    <Lay>
      <div className="see-customers">
        <center><h1 className="mb-4" style={{ color: "white" }}>My Shipments</h1></center>
        <div
          className="back-button"
          onClick={handleBack}
          role="button"
          tabIndex={0}
        >
          <div className="arrow-wrap">
            <span className="arrow-part-1"></span>
            <span className="arrow-part-2"></span>
            <span className="arrow-part-3"></span>
          </div>
        </div>
        {/* Container to place the search bar and button on the same line */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          {/* Search bar */}
          <TextField
            label="Search Shipment Number"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            style={{ marginRight: '10px' }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          {/* Search button */}
          <Button
            type="button"
            variant="contained"
            color="info"
            onClick={handleSearch}
            style={{ width: '100px' }}
          >
            SEARCH
          </Button>
        </div>
        {/* Grid to display shipments */}
        <Grid container spacing={2} style={{ maxWidth: "1200px", marginLeft: "300px" }}>
          {filteredShipments.map((shipment, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} style={{ marginTop: '20px' }}>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar>
                      <ClassSharpIcon fontSize="large" color="primary" />
                    </Avatar>
                  }
                />
                <CardContent>
                  {/* Display shipment details */}
                  <Typography variant="body1">Shipment Email: {shipment.email}</Typography>
                  <Typography variant="body1">Shipment Number: {shipment.ShipmentNumber}</Typography>
                    <Typography variant="body1">Route Details: {shipment.RouteDetails}</Typography>
                    <Typography variant="body1">Device: {shipment.Device}</Typography>
                    <Typography variant="body1">PPO Number: {shipment.PPONumber}</Typography>
                    <Typography variant="body1">NDC Number: {shipment.NDCNumber}</Typography>
                    <Typography variant="body1">Serial Number of Goods: {shipment.SerialNumberOfGoods}</Typography>
                    <Typography variant="body1">Container Number: {shipment.ContainerNumber}</Typography>
                    <Typography variant="body1">Goods: {shipment.Goods}</Typography>
                    <Typography variant="body1">Date: {shipment.Date}</Typography>
                    <Typography variant="body1">Delivery Number: {shipment.DeliveryNumber}</Typography>
                    <Typography variant="body1">Batch ID: {shipment.BatchId}</Typography>
                    <Typography variant="body1">Shipment Description: {shipment.ShipmentDescription}</Typography>

                  {/* Button to trigger printing */}                  
                  <Button className="favorite styled" type="button" onClick={() => handlePrint(shipment)}>Print</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Lay>
  );
};


export default ShipmentDetails;
