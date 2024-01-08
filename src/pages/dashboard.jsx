import React, { useEffect, useState } from 'react';
import { jwtDecode, InvalidTokenError } from 'jwt-decode';
import '../styles/Dashboard.css';
import Lay from '../component/Lay';
import D from "../images/Dev_strm.jpg";
import MyAccount from '../pages/sign_in';
import MyShipment from '../pages/Print';
import NewShipment from '../pages/Create_ship';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user'); // Default role if not found or unable to parse the token

  const imageLinks = [
    { src: D, link: '/myAcct', text: 'Profile', desc: 'You can view and manage your personal information here' },
    { src: D, link: '/newShip', text: 'New Shipment', desc: 'Initiate and set up the details for creating a new shipment here.' },
    { src: D, link: '/print', text: 'My Shipment', desc: 'You can view all your shipments created here' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.sub); // Assuming 'sub' in the token holds the user's email or username
        setUserRole(decoded.role || 'user'); // Assuming 'role' in the token holds the user's role
      } catch (error) {
        if (error instanceof InvalidTokenError) {
          // Handle invalid token error
          console.error('Invalid token:', error.message);
        } else {
          // Handle other errors
          console.error('Error decoding token:', error);
        }
      }
    }
  }, []);

  // Dynamically adjust links based on user role
  if (userRole === 'admin') {
    // If the user is an admin, redirect to '/devicedata'
    imageLinks.push({ src: D, link: '/DeviceData', text: 'Data Streaming', desc: 'Admin access: View device data here.' });
  } else {
    // If the user is not an admin, redirect to '/Error403'
    imageLinks.push({ src: D, link: '/Error403', text: 'Data Streaming', desc: 'Sorry, only admin can access!' });
  }




  return (
    <Lay>
      <div id="backgrounds">
        <div className="marquee-container">
          <marquee behavior="scroll" direction="left" className="custom-marquee" scrollamount="10">
            {user && `Hi ${user}! Welcome to SCMXPert lite project.`}
          </marquee>
        </div>
        <div className="carousel">
          {currentPage === null ? (
            imageLinks.map((imageInfo, index) => (
              <a key={index} href={imageInfo.link}>
                <div className="container" style={{ border: "5px solid aqua" }}>
                  <img className="img" src={imageInfo.src} alt={`Image ${index}`} />
                  <div className="overlay">
                    <div className="txt">{imageInfo.text}</div>
                  </div>
                </div>
              </a>
            ))
          ) : (
            (currentPage === 'MyAccount' && <MyAccount />) ||
            (currentPage === 'MyShipment' && <MyShipment />) ||
            (currentPage === 'NewShipment' && <NewShipment />)
          )}
        </div>
      </div>
    </Lay>
  );
}

export default Dashboard;
