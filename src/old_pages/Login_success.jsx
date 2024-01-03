import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import Logn_s from "../images/login_sucs.jpg";
export default function SuccessPage() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    // Delay navigation for 2 seconds
    const delay = 2000; // 2 seconds

    const timeoutId = setTimeout(() => {
      navigateHome();
    }, delay);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#000' }}>
      <img src={Logn_s} alt="Image not found" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
    </div>
  );
}
