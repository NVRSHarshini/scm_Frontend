import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Layout from './../components/Layout';

export default function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = parseJwt(token);
      const userEmail = decodedToken.sub; // Assuming 'sub' field contains the email

      axios.get(`http://127.0.0.1:8000/profile?email=${userEmail}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching profile:', error);
        });
    }
  }, []);

  // Function to parse JWT token
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <center>
        <div className="user-card">
          <Card>
            <CardContent style={{ backgroundColor: '#f0f0f0', textAlign: 'center' }}>
              <AccountCircleIcon fontSize="large" color="primary" />
              <Typography variant="h5" component="div" style={{ color: 'blue' }}>
                {userDetails.username}
              </Typography>
              <Typography color="textSecondary" style={{ fontWeight: 'bold' }}>
                Email: {userDetails.email}
              </Typography>
              {/* Display other user details */}
              <div>
                <Link component='a' to={`/login`}>
                  Back
                </Link>
              </div>
              {/* Add more user details here */}
            </CardContent>
          </Card>
        </div>
      </center>
    </Layout>
  );
}
