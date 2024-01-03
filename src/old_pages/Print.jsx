import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Lay from "../component/Lay.js";
import { Button, Grid, Card, CardContent, CardHeader,Typography, Avatar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import AccountBalanceWalletSharpIcon from '@material-ui/icons/AccountBalanceWalletSharp';
import { useNavigate } from 'react-router-dom';
import "../styles/myShip.css"
const ShipmentDetails = () => {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/registration');
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

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handlePrint = (shipment) => {
    const printableContent = `
      <h1>Shipment Details</h1>
      <div>
        <h3>Shipment ID: ${shipment._id}</h3>
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
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Lay>
     
      <div className="see-customers">
        <center><h1 className="mb-4"style={{ color: "white" }}>My Shipments</h1></center>
        <Button type="button" className="btn btn-info" variant="contained"  onClick={handleBack}>BACK</Button>
       
        <div>
      
          <Grid container spacing={2}>
            {shipments.map((shipment, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}style={{ margintop: '20px' }}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <AccountBalanceWalletSharpIcon fontSize="large" color="primary"  />
                      </Avatar>
                    }
                    // title={`Shipment ID: ${shipment.ShipmentNumber}`}
                  />
                  <CardContent>
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
                    <Button className="favorite styled" type="button" onClick={() => handlePrint(shipment)}>Print</Button> 
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







// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '../styles/Print.css';
// import { faArrowRight, faBarcode, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
// import b from '../images/logo_E.jpg'
// import { useRef, useState } from 'react';
// import { useReactToPrint } from 'react-to-print';

// const Print = () => {

//     const print = JSON.parse(localStorage.getItem('print'))
//     const componentRef=useRef();
//     const [dp,setDp]=useState(true);
//     const today = new Date();
//     const days=["Sunday",'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
//     console.log(today)
//     const handlePrint= useReactToPrint({
//         content: ()=> componentRef.current,
//     });

//     return (
//         <div className='full'>
//         {<button className='print-button' onClick={()=>{handlePrint();setDp(false)}}>Download</button>}
//         <div className="print-page" ref={componentRef}>
//             <div className="print-container">
//                 <div className="print-header">
//                     <div className="e-tic">
//                         <h3>E-Ticket</h3>
//                         <p>Ticket Id : {print.ticketId}</p>
//                         <p>Booked on : {`${days[today.getDay()]},${today.getFullYear()}/${today.getMonth()+1}/${today.getDate()}`}</p>
//                     </div>
//                     <div className="print-logo">
//                         <h2> <FontAwesomeIcon icon={faPlaneDeparture}/> AirTicket</h2>
//                     </div>
//                 </div>
//                 <div className="info">
//                     <div className="first-para">
//                     <p>Your electronic ticket is stored in our computer reservations system. This e-Ticket receipt/itinerary is your record of your electronic ticketand forms part of your contract of carriage. You may need to show this receipt to enter the airport and/or to prove return or onward travelto customs and immigration officials.</p>    
//                     </div>                    
//                     <div className="second-para">
//                     <p>Your attention is drawn to the Conditions of Contract and Other Important Notices set out in the attached document.Please visit us on www.emirates.com to check-in online and for more information.</p>
//                     </div>

//                     <div className="third-para">
//                     <p>Airline check-in counters open no less than three hours before the flight. You should check in no later than 90 minutes beforedeparture. Boarding starts 45 minutes before your flight and gates close 20 minutes before departure. If you report late we will not beable to accept you for travel.</p>
//                     </div>

//                     <p><b>Please check with departure airport for restrictions on the carriage of liquids, aerosols and gels in hand baggage.</b></p>
                    
//                     <div className="last-para">
//                     Below are the details of your electronic ticket. Note: all timings are local
//                     </div>

//                 </div>
//                 <div className="t-details">
//                     <div className="td-header">
//                         <div className="t-head-logo">
//                         <h3>{print.from} to {print.to}</h3>
//                         <p>{print.departureDate.slice(0,10)}</p>
//                         </div>
//                         <div className="th-bar">
//                             {/* <p className='bar'><FontAwesomeIcon icon={faBarcode}/></p> */}
//                             <img className='bar' src={b} alt="" />
//                         </div>
//                     </div>
//                     <div className="t-d-2">
//                         <div className="t-first-part">
//                             <div className="t-airline-date">
//                             <b>{print.airline}</b>
//                             <b> {print.departureDate.slice(0,10)}</b>
//                         </div>
//                             <div className="t-second-part">
//                                 <div className="t-departure">
//                                     <p className="t-dtime"> {print.departureTime}</p>
//                                     <p className='t-place'> {print.from} </p>
//                                 </div>
//                                 <div className="t-arrow">
//                                 <p><FontAwesomeIcon icon={faArrowRight}/> </p> </div>
//                                 <div className="t-arrival">
//                                     <p className="t-dtime"> {print.arrivalTime} </p>
//                                     <p className='t-place'>{print.to}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="p-dets">
//                         <div className="p-name">
//                             <p className="pp-name"> Name</p>
//                             <b><p>{print.passengerName}</p></b>
//                         </div>

//                         <div className="p-age">
//                             <p className="pp-age"> Age</p>
//                             <b><p>{print.age}</p></b>
//                         </div>
//                         <div className="p-gender">
//                             <p className="pp-age"> {print.gender}</p>
//                             <b><p>Male</p></b>
//                         </div>
//                     </div>

//                 </div>

//                 <div className="baggage-info">
//                   <h3>Baggage Policy :</h3>
//                   <table className='bag-table'>
//                     <thead></thead>
//                     <tbody>
//                         <tr>
//                             <td><b>Check-in(Adult & Child) :</b></td>
//                             <td> 15KG /person</td>
//                         </tr>
//                         <tr>
//                         </tr>
//                         <tr>
//                         </tr>
//                         <tr>
//                             <td><b>Cabin(Adult & Child) :</b></td>
//                             <td> 7KG /person</td>
//                         </tr>
//                         <tr>
//                         </tr>
//                         <tr>
//                         </tr>
//                         <tr>
//                             <td><b>Terms & Conditions :</b></td>
//                             <td> 15kg allowance per person (1 piece only) effective Oct 1st, 2020. For Double or MultiSeats bookings, extra 10 kg. Additional charges may apply for excess baggage.
//                             </td>
//                         </tr>
//                     </tbody>
//                     </table> 
//                 </div>

//                 <div className="footer">
//                     <p>Cheap flight booking from anywhere, to everywhere.</p>
//                     <p>© AirTicket Ltd 2023</p>
//                 </div>

//             </div>
//         </div>
//         </div>
//       );
// }
 
// export default Print;
