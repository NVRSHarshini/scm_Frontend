import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import err from "../images/Error.jpg";
export default function Error403Page() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    // Delay navigation for 2 seconds
    const delay = 3000; 

    const timeoutId = setTimeout(() => {
      navigateHome();
    }, delay);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#000' }}>
      <img src={err} alt="Image not found" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      <Card style={{ marginTop: '20px', padding: '20px', background: '#000', color: '#00FFFF' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#e41919', fontSize: '2.5rem', marginBottom: '1rem' }}>Access Denied</div>
          <div style={{ fontSize: '1.2rem' }}>Sorry, but you don't have permission to access this page</div>
        </div>
      </Card>
    </div>
  );
}


