// Import necessary libraries
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import qs from 'querystring'; 
import '../styles/style.css'; 


export default function Registration() {
  const [loginError, setLoginError] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    password: '',
    phone: '',
  });
  const clearFormData = () => {
    setFormData({
      Name: '',
      email: '',
      password: '',
      phone: '',
    });
  };
  const loginData = {
    username: formData.email,
     password: formData.password,
 };
  const [activeForm, setActiveForm] = useState('login');
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchForm = (formType) => {
    setActiveForm(formType);
    clearFormData();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to  backend API
      const response = await axios.post(`http://127.0.0.1:8000/registration`, formData);
    } catch (error) {
      // Handle errors
      console.error('Error during registration:', error);
    }
  };
 

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const errors = validateLoginForm(formData);
  
    if (Object.keys(errors).length === 0) {
      try {
        const loginData = {
          username: formData.email,
          password: formData.password,
        };
  
        const response = await axios.post('http://127.0.0.1:8000/login', qs.stringify(loginData));
  
        console.log(response.data);
  
        if (response.status === 200) {
          localStorage.setItem('token', response.data.access_token);
          navigate('/success');
        } else {
          // Handle login failure and set specific error messages
          if (response.data.detail === 'Invalid email') {
            setLoginError('Invalid email. Please check your email.');
          } else if (response.data.detail === 'Invalid password') {
            setLoginError('Invalid password. Please check your password.');
          } else if (response.data.detail === 'Invalid credentials') {
            setLoginError('Invalid credentials. Please try again.');
          } else {
            setLoginError('Login failed. Please check your credentials.');
          }
        }
      } catch (error) {
        console.error('Error during login:', error);      
        setLoginError('Invalid credentials. Please try again.');
      }
    } else {
      // Display specific errors for email and password
      if (errors.email) {
        setLoginError(errors.email);
      } else if (errors.password) {
        setLoginError(errors.password);
      }
    }
  };
  const [registrationError, setRegistrationError] = useState('');
  const handleRegister = (e) => {
    e.preventDefault();
    const errors = validate(formData);
  
    if (Object.keys(errors).length === 0) {
      axios
        .post(`http://127.0.0.1:8000/registration`, {
          username: formData.Name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        })
        .then(response => {
          if (response.status === 200) {
            console.log(response.data, response.status);
            navigate('/');
            switchForm('login');
          } else {
            console.log(response.data);
            navigate('/'); // Handle other status codes accordingly
          }
        })
        .catch(error => {
          console.error(error);
          if (error.response && error.response.status === 409) {
            setRegistrationError('Email already exists. Please use a different email.');
          } else {
            const passwordLengthError = errors.password;
            const phoneLengthError = errors.phone;
            setRegistrationError(
              `Failed to register. Please try again. Password Length Error: ${passwordLengthError || 'None'}. Phone Length Error: ${phoneLengthError || 'None'}`
            );
          }
        });
    }
  };
  
 
  function validateLoginForm(formData) {
    let errors = {};
    // validate email
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // Password Validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    return errors;
  }
  function validate(formData) {
    console.log("entered login");
    let errors = {};

    // validate email
    if (!formData.email.trim()) {
      console.log("entered email val");
      errors.email = "Email is required";
      console.log("entered email val1");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      console.log("entered email val2");
      errors.email = "Email is invalid";

    }

   
    // Password Validation
if (!formData.password) {
  errors.password = "Password is required";
} else if (formData.password.length < 8) {
  errors.password = "Password must be at least 8 characters";
}

// Phone Number Validation
if (!formData.phone) {
  errors.phone = "Phone number is required";
} else if (formData.phone.length !== 10) { 
  errors.phone = "Phone number must be 10 characters";
}



console.log("errors:",errors);
    return errors;
  }

  return (
    <div id='roots' >
      
      <h1 className="section-title">SCMXPertLite</h1> 
      
      <div className="forms">
        <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
          <button type="button" className="switcher switcher-login" onClick={() => switchForm('login')}>
            <b>Login</b>
            <span className="underline"></span>
          </button>
          <center>
          <form className="form form-login" >
            <fieldset>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
              <h2 className="colorful-text">Please enter your credentials for login</h2>

              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input id="login-email" type="email" name="email" onChange={handleChange} required />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" name="password" onChange={handleChange} required />
              </div>
            </fieldset>

            <button type="submit" className="btn-login"onClick={handleLogin}>Login</button>
            
          </form> </center>
        </div>
        
        <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
          <button type="button" className="switcher switcher-signup" onClick={() => switchForm('signup')}>
            <b>Sign Up</b>
            <span className="underline"></span>
          </button>
           <center>
          <form className="form form-signup" onSubmit={handleSubmit}>
            <fieldset>
            {registrationError && (
      <p className="error-message" style={{ color: 'red' }}>
        {registrationError}
      </p>
    )}
              <h2 className="colorful-text">Register with us to get started!</h2>
              <div className="input-block">
                <label htmlFor="login-name">Name</label>
                <input id="login-name" type="text" name="Name" onChange={handleChange} />
              </div>
              <div className="input-block">
                <label htmlFor="signup-email">E-mail</label>
                <input id="signup-email" type="email" name="email" onChange={handleChange} required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" name="password" onChange={handleChange} required />
              </div>
              <div className="input-block">
                <label htmlFor="signup-phone">Phone</label>
                <input id="signup-phone" type="tel" name="phone" onChange={handleChange}  />
              </div>
            </fieldset>
            <button type="submit" className="btn-login" onClick={handleRegister}>Register</button>
          </form> </center>
        </div>
      </div>
      
    </div>
  );
}