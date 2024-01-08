import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lay from "../component/Lay.js";
import { Button, Card, CardContent, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import img from "../images/plainBg.jpg";
const DeviceData = () => {
  const navigate = useNavigate();
  const [deviceData, setDeviceData] = useState([]);
  const [deviceId, setDeviceId] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleGetDeviceData = () => {
    // Assuming you have an API endpoint to fetch device data based on deviceId
    axios.get(`http://your-api-endpoint/deviceData/${deviceId}`)
      .then(response => {
        setTableData(response.data);
      })
      .catch(error => {
        console.error('Error fetching device data:', error);
      });
  };

  return (
    <Lay >
      <div style={{ color: 'cyan', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh', minWidth: '300px' }}>

        <div><center><h1 className="mb-4" style={{ color: "white" }}>Device Data</h1></center>
        <div
          className="back-button"
          onClick={handleBack}
          role="button"
          tabIndex={0}
          style={{marginTop:'20px'}}
        >
          <div className="arrow-wrap">
            <span className="arrow-part-1"></span>
            <span className="arrow-part-2"></span>
            <span className="arrow-part-3"></span>
          </div>
        </div>

        {/* Card to select a device ID */}
        <Card style={{ maxWidth: "1000px", margin: "auto", marginBottom: "20px", backgroundColor: '#008B8B', color: 'black' }}>
  <CardContent>
    <center>
    <Typography variant="h6" color="textSecondary" gutterBottom>
      Please Select a Device ID to See the Data Stream
    </Typography></center>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
      <TextField
        label="Enter Device ID"
        variant="outlined"
        size="small"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        fullWidth
        style={{ backgroundColor: 'white' }}
      />
      <Button
        type="button"
        variant="contained"
        color="info"
        onClick={handleGetDeviceData}
        style={{ marginLeft: '10px', backgroundColor: 'black', color: 'cyan' }}
      >
        Get Device Data
      </Button>
    </div>
  </CardContent>
</Card>


        {/* Table to display device data */}
        <TableContainer component={Paper} style={{ maxWidth: "1000px", margin: "auto", backgroundColor: '#232B2B', color: 'black' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "white" }}>Device ID</TableCell>
                <TableCell style={{ color: "white" }}>Battery Level</TableCell>
                <TableCell style={{ color: "white" }}>First Sensor Temperature</TableCell>
                <TableCell style={{ color: "white" }}>Route From</TableCell>
                <TableCell style={{ color: "white" }}>Route To</TableCell>
                <TableCell style={{ color: "white" }}>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.deviceId}</TableCell>
                  <TableCell>{data.batteryLevel}</TableCell>
                  <TableCell>{data.firstSensorTemperature}</TableCell>
                  <TableCell>{data.routeFrom}</TableCell>
                  <TableCell>{data.routeTo}</TableCell>
                  <TableCell>{data.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </div>
    </Lay>
  );
};

export default DeviceData;
