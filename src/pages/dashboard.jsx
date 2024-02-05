import React, { useEffect, useState } from 'react';
import { jwtDecode, InvalidTokenError } from 'jwt-decode';
import Lay from '../component/Lay';
import Background from "../images/Dev_strm.jpg";
import MyAccount from './MyAcct';
import MyShipment from './MyShipment';
import NewShipment from './Create_ship';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user'); // Default role if not found or unable to parse the token

  const imageLinks = [
    { src: Background, link: '/myAcct', text: 'Profile', desc: 'You can view and manage your personal information here' },
    { src: Background, link: '/newShip', text: 'New Shipment', desc: 'Initiate and set up the details for creating a new shipment here.' },
    { src: Background, link: '/print', text: 'My Shipment', desc: 'You can view all your shipments created here' },
  ];

    // Dynamically adjust links based on user role
    if (userRole === 'admin') {
      // If the user is an admin, redirect to '/devicedata'
      imageLinks.push({ src: Background, link: '/DeviceData', text: 'Data Streaming', desc: 'Admin access: View device data here.' });
    } else {
      // If the user is not an admin, redirect to '/Error403'
      imageLinks.push({ src: Background, link: '/Error403', text: 'Data Streaming', desc: 'Sorry, only admin can access!' });
    }
  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.sub); //  'sub' in the token holds the user's  username
        setUserRole(decoded.role || 'user'); // 'role' in the token holds the user's role
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


  return (
    <Lay>
      <div id="backgrounds">
        <div className="marquee-container">
          <marquee behavior="scroll" direction="left" className="custom-marquee" scrollamount="10">
            {user && `Hi ${user}! Welcome to SCMXPert lite.`}
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
