import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'querystring';
import '../styles/style.css';
import Refresh from '../images/Refresh.jpg'
const Registration = () => {


  // State variables
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loginError, setLoginError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    password: '',
    phone: '',
    captcha: '',
    enteredCaptcha: '',
  });

  // Function to generate a random captcha
  const generateRandomCaptcha = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Function to clear form data
  const clearFormData = () => {
    setFormData({
      Name: '',
      email: '',
      password: '',
      phone: '',
      captcha: generateRandomCaptcha(6),
      enteredCaptcha: '',
    });
  };

  // Generate initial captcha on component mount
  useEffect(() => {
    clearFormData();
  }, []);

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to validate login form
  const validateLoginForm = (formData) => {
    let errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    return errors;
  };

  // Function to validate registration form
  const validate = (formData) => {
    let errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (!formData.phone) {
      errors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      errors.phone = 'Phone number must be 10 characters';
    }

    return errors;
  };

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate the captcha
    if (formData.enteredCaptcha.toLowerCase() !== formData.captcha.toLowerCase()) {
      setLoginError('Invalid captcha. Please try again.');
      return;
    }

    // Validate the form inputs
    const errors = validateLoginForm(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const loginData = {
          username: formData.email,
          password: formData.password,
        };

        // POST request to the backend API for login
        //const response = await axios.post(`${apiUrl}/login`, qs.stringify(loginData));
        const response = await axios.post('http://127.0.0.1:8000/login', qs.stringify(loginData));

        console.log(response.data);

        if (response.status === 200) {
          sessionStorage.setItem('token', response.data.access_token);
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

  // Function to handle registration form submission
  const handleRegister = (e) => {
    e.preventDefault();

    // Validate the form inputs
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

  // Function to handle captcha refresh
  const handleRefreshCaptcha = () => {
    clearFormData();
  };

  const navigate = useNavigate();

  // Function to switch between login and registration forms
  const switchForm = (formType) => {
    setActiveForm(formType);
    clearFormData();
  };

  const [activeForm, setActiveForm] = useState('login');

  return (
    <div id='roots'>
      <h1 className="section-title">SCMXPertLite</h1>

      <div className="forms">
        {/* Login Form */}
        <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}>
          <button type="button" className="switcher switcher-login" onClick={() => switchForm('login')}>
            <b>Login</b>
            <span className="underline"></span>
          </button>
          <center>
            <form className="form form-login">
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
                <div className="input-block">
                  <label htmlFor="captcha">Captcha</label>
                  <div className='dotted-box'>
                    <div className='TextCaptcha' style={{ position:'relative',bottom:'5px',fontSize:'30px'} }>{formData.captcha}</div>
                    <button type="button" 
                     style={{
                          border: 'none',  
                          padding: 0,       
                          background: 'none',  
                         
                          }} onClick={handleRefreshCaptcha}>
                    <img style={{height:'30px',width:'30px'}}src={Refresh} alt="Refresh Icon" />
                    </button>
                  </div>
                  <input
                    id="enteredCaptcha"
                    type="text"
                    name="enteredCaptcha"
                    onChange={handleChange}
                    required
                  />
                </div>
              </fieldset>

              <button type="submit" className="btn-login" onClick={handleLogin}>
                Login
              </button>
            </form>
          </center>
        </div>

        {/* Registration Form */}
        <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}>
          <button type="button" className="switcher switcher-signup" onClick={() => switchForm('signup')}>
            <b>Registration</b>
            <span className="underline"></span>
          </button>
          <center>
            <form className="form form-signup" onSubmit={handleRegister}>
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
                  <input id="signup-phone" type="tel" name="phone" onChange={handleChange} />
                </div>
              </fieldset>
              <button type="submit" className="btn-login">
                Register
              </button>
            </form>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Registration;
