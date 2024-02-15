import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lay from "../component/Lay.js";
import { Button, Card, CardContent, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import img from "../images/plainBg.jpg";

const DeviceData = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const [deviceData, setDeviceData] = useState([]);
  const [deviceId, setDeviceId] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const itemsPerPage = 25; // Number of items per page
  const apiUrl = process.env.REACT_APP_API_URL;

  // Function to handle back button click
  const handleBack = () => {
    navigate("/dashboard");
  };

  // Fetch device data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        let endpoint = `${apiUrl}/deviceData`;
        if (deviceId && deviceId.trim() !== '') {
          endpoint += `/${deviceId}`;
        }

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setDeviceData(response.data);
      } catch (error) {
        console.error('Error fetching device data:', error);
      }
    };

    fetchData();
  }, [token, deviceId]);

  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, deviceData.length);

  // Data for the current page
  const currentPageData = deviceData.slice(startIndex, endIndex);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Lay>
      <div style={{ color: 'cyan', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', minHeight: '100vh', minWidth: '300px' }}>
        <div>
          <center>
            <h1 className="mb-4" style={{ color: "white" }}>Device Data</h1>
          </center>
          <div className="back-button" onClick={handleBack} role="button" tabIndex={0} style={{ marginTop: '20px' }}>
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
                <Typography variant="h6" color="black" gutterBottom>
                  Please Select a Device ID to See the Data Stream
                </Typography>
              </center>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                  variant="outlined"
                  size="small"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  fullWidth
                  style={{ backgroundColor: 'white' }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pagination controls */}
          <div style={{ maxWidth: "1000px", margin: "auto", display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <Button onClick={() => handlePageChange(1)}>First</Button>
            {Array.from({ length: Math.ceil(deviceData.length / itemsPerPage) }, (_, index) => index + 1).map(pageNumber => (
              <Button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>{pageNumber}</Button>
            ))}
            <Button onClick={() => handlePageChange(Math.ceil(deviceData.length / itemsPerPage))}>Last</Button>
          </div>

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
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPageData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ color: "white" }}>{data.Device_ID}</TableCell>
                    <TableCell style={{ color: "white" }}>{data.Battery_Level}</TableCell>
                    <TableCell style={{ color: "white" }}>{data.First_Sensor_temperature}</TableCell>
                    <TableCell style={{ color: "white" }}>{data.Route_From}</TableCell>
                    <TableCell style={{ color: "white" }}>{data.Route_To}</TableCell>
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
