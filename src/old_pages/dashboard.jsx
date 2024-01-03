import React, { useEffect, useState } from 'react';
import { jwtDecode, InvalidTokenError } from 'jwt-decode';// Import the jwt-decode library
import '../styles/Dashboard.css';
import Lay from '../component/Lay';
import D from "../images/Dev_strm.jpg"; // Update this with your image
import MyAccount from '../pages/sign_in';
import MyShipment from '../pages/myShip';
import NewShipment from '../pages/Create_ship';
const imageLinks = [
  { src: D, link: '/myAcct', text: 'Profile', desc: 'You can view and manage your personal information here' },
  { src: D, link: '/newShip', text: 'New Shipment', desc: 'Initiate and set up the details for creating a new shipment here.' },
  { src: D, link: '/print', text: 'My Shipment', desc: 'You can view all your shipments created here' },
  { src: D, link: '/sign_in', text: 'Data Streaming', desc: 'Sorry only admin can access!' },
];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.sub); // Assuming 'sub' in the token holds the user's email or username
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

  const handleScroll = () => {
    // Your handleScroll logic here
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Lay>
      <div id="backgrounds">
        <div className="marquee-container">
          <marquee behavior="scroll" direction="left" className="custom-marquee" scrollamount="10">
            {user && `Hi ${user}! Welcome to SCMXPert lite project.`} {/* Display the user info if available */}
          </marquee>
        </div>
        <div className="carousel">
        {currentPage === null ? (
            imageLinks.map((imageInfo, index) => (
              <a key={index} href={imageInfo.link}>
                <div className="container"style={{ border: "5px solid aqua" }}>
                  <img className="img" src={imageInfo.src} alt={`Image ${index}`} />
                  <div className="overlay">
                  <div className="txt">{imageInfo.text}</div>
                  
                {/* <div className="footer">
                  <center><p style={{color:'white'}}>------------------</p></center>
                <center><div style={{ color:'white' }}className="description">{imageInfo.desc}</div></center>
               </div>*/}
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



// import React, { useState } from 'react';
// import '../styles/swiper.css';
// import One from "../images/crt_shp.jpg";
// import two from "../images/Dev_strm.jpg";


// const imageLinks = [
//   { src: One, link: '/registration' },
//   { src: two, link: '/sign_in' },
  
// ];

// export default  function Dashboard()  {
//   return (
//     <div className="carousel">
//       {imageLinks.map((imageInfo, index) => (
//         <a key={index} href={imageInfo.link}>
//           <div className="container">
//             <img className="img" src={imageInfo.src} alt={`Image ${index}`} />
//             <div className="overlay">
//               <div className="txt">A little blurb about this.</div>
//             </div>
//           </div>
//         </a>
//       ))}
//     </div>
//   );
// };







// import React, { useState, useEffect } from 'react';
// import Layout from '../component/Layout';

// export default function Dashboard() {
//   const [output, setOutput] = useState('');
//  const color={
//   color:'white'
//  }
//   useEffect(() => {
//     async function fetchHomeData() {
//       try {
//         const response = await fetch('http://127.0.0.1:8000/'); // Send a GET request to the FastAPI backend
//         if (response.ok) {
//           const data = await response.json();
          
//           setOutput(data.output); // Update the state with the received data
//           console.log("output from fetch:",data.output);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     }
//     fetchHomeData();
//   }, []);

//   return (
//     <Layout>
//     <div>
//       <h1 style={color}>Dashboard showing fastapi output : {output}!</h1>
//     </div>
//     </Layout>
//   );
// }


 
