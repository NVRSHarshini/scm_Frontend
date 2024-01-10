import React, { useState,useRef,useEffect } from 'react';
import { format,addDays  } from 'date-fns';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import Lay from '../component/Lay';
import img from '../images/bg_chat.webp';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/Create_ship.css";
export default function Create_Ship() {
  const navigate = useNavigate(); 

  useEffect(() => {
    
    const token = localStorage.getItem('token'); 
    if (!token) {
     
      navigate('/'); 
    }
  }, [navigate]); 
  const [formProgress, setFormProgress] = useState(0); // State to track form progress
  const totalFields = 12; 

  const mainContainerRef = useRef(null);

  
  const [focused, setFocused] = useState(false);
  
  const data = [
    { id: 1, label: "City Express" },
    { id: 2, label: "Highway Connector" },
    { id: 3, label: "Scenic Route" },
    { id: 4, label: "Urban Shortcut" },
    { id: 5, label: "Coastal Drive" }
];

const data_device = [
    { id: 101, label: "GPS Navigator" },
    { id: 102, label: "Temperature Sensor" },
    { id: 103, label: "Fuel Gauge" },
    { id: 104, label: "Traffic Camera" },
    { id: 105, label: "Proximity Sensor" }
];

const data_goods = [
    { id: 201, label: "Electronics" },
    { id: 202, label: "Clothing" },
    { id: 203, label: "Fresh Produce" },
    { id: 204, label: "Industrial Equipment" },
    { id: 205, label: "Books and Media" }
];

  const today = new Date();
  const maxDate = addDays(today, 365); 
  const [selectedDate2, setSelectedDate2] = useState(null); 
  const formattedDate = selectedDate2 ? format(selectedDate2, 'yyyy/MM/dd') : '';


  const handleDate2Change = (date) => {
    setSelectedDate2(date);
    calculateProgress();
  };

   const [selectedRoute, setSelectedRoute] = useState(null);
   const [selectedDevice, setSelectedDevice] = useState(null);


 const [selectedGoods, setSelectedGoods] = useState(null);



  const [formData, setFormData] = useState({
    email:'',
    ShipNo: '',
    routeDetails: '',
    device: '',
    PPoNo: '',
    NDCNo: '',
    SerialNo: '',
    ContainerNo: '',
    Goods: '',
    selectedDate: null,
    DeliveryNo: '',
    BatchId: '',
    ShipmentDesc: ''
   
  });

  const handleCreateShipment = (e) => {
    e.preventDefault();
  
    // Extract the token from local storage
    const token = localStorage.getItem('token');
    
    // Extract user email from token
    const extractEmailFromToken = (token) => {
      if (!token) {
        return null;
      }
  
      try {
        const tokenPayload = token.split('.')[1];
        const decodedPayload = atob(tokenPayload);
        const { email } = JSON.parse(decodedPayload);
        return email;
      } catch (error) {
        console.error('Error extracting email from token:', error);
        return null;
      }
    };
  
    const userEmail = extractEmailFromToken(token);
  
    axios.post(`http://127.0.0.1:8000/create_shipment/`, {
      email: userEmail,
      ShipmentNumber: formData.ShipNo || "",
      RouteDetails: selectedRoute || "",
      Device: selectedDevice || "",
      PPONumber: formData.PPoNo || "",
      NDCNumber: formData.NDCNo || "",
      SerialNumberOfGoods: formData.SerialNo || "",
      ContainerNumber: formData.ContainerNo || "",
      Goods: selectedGoods || "",
      Date: formattedDate || "", // Corrected field name
      DeliveryNumber: formData.DeliveryNo || "",
      BatchId: formData.BatchId|| "",
      ShipmentDescription: formData.ShipmentDesc || ""
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 200) {   
        // Handle success scenario for shipment creation         
        setFormData({
          email: '',
          ShipNo: '',
          routeDetails: '', 
          device: '', 
          PPoNo: '',
          NDCNo: '',
          SerialNo: '',
          ContainerNo: '',
          Goods: '',
          selectedDate: null,
          DeliveryNo: '',
          BatchId: '',
          ShipmentDesc: ''
        });
      
        setSelectedDate2(null);
        setSelectedRoute(''); 
        setSelectedDevice(''); 
        setSelectedGoods(''); 
        setFormProgress(0);
        
      } else if (response.status === 409) {
         // Handle conflict scenario
        console.log('Conflict:', response.data);
       
      }
      // conditionals for different status codes
    })
    .catch(error => {
      // Handle error
      console.error('Error creating shipment:', error);
      if (error.response) {
        // The request was made, but the server responded with an error status
        console.error('Server responded with:', error.response.data);
        console.error('Status code:', error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request error:', error.message);
      }
    });
  };
  
  const handleClear = () => {
   setFormData({
      email: '',
      ShipNo: '',
      routeDetails: '', 
      device: '', 
      PPoNo: '',
      NDCNo: '',
      SerialNo: '',
      ContainerNo: '',
      Goods: '',
      selectedDate: null,
      DeliveryNo: '',
      BatchId: '',
      ShipmentDesc: ''
    });
  
    setSelectedDate2(null);
    setSelectedRoute(''); 
    setSelectedDevice(''); 
    setSelectedGoods(''); 
    setFormProgress(0);  
  };
  
  const handleSelectRoute = (event) => {
    setSelectedRoute(event.target.value);
    setFormData({ ...formData, routeDetails: event.target.value });
    calculateProgress(); // Update progress whenever a route is selected
  };
  
  const handleSelectDevice = (event) => {
    setSelectedDevice(event.target.value);
    setFormData({ ...formData, device: event.target.value });
    calculateProgress(); // Update progress whenever a device is selected
  };
  
  const handleSelectGoods = (event) => {
    setSelectedGoods(event.target.value);
    setFormData({ ...formData, Goods: event.target.value });
    calculateProgress(); // Update progress whenever goods are selected
  };
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    calculateProgress();
  };

  const calculateProgress = () => {
    let filledFields = Object.values(formData).reduce((acc, value) => {
    if (value !== '' && value !== null && value !== undefined) {
      return acc + 1;
    }
    return acc;
  }, 0);

  // Check for selectedDate2 and increment filledFields if it's not null
  filledFields += selectedDate2 ? 1 : 0;

  const progress = Math.round((filledFields / totalFields) * 100);
  setFormProgress(progress);
  };
  useEffect(() => {
    calculateProgress();
  }, [formData, selectedDate2]);

  return (
    <Lay>
      
       <div className="containing">
  <div className="image-section">
  <div class="image-container">
    <img src={img} alt="Your Image" class="moving-image"/>
  </div> 
  </div>
  <div class='text-on-image'>
             <h3> Welcome to create shipment </h3>
             {/* <h4>To begin, kindly provide essential details</h4> */}
             <p> Please fill in the form to create a new shipment. </p>
             <p>Thank you for choosing our SCMXPertLite services!

</p>
<div className="your-process-card">
<p> Your Progress

</p>
<div className="progress-bar-container">
<div className="progress-bar" style={{ width: `${formProgress}%` }}>
    <span className="progress-text">{formProgress}% Complete</span>
  </div>
</div>
</div>
</div>
          
  {/* <div id='main'> */}
      <div className="form-wrappers">
      <div ref={mainContainerRef} className='main_container'>
        <div className="title">
          <h2><center>Create New Shipment</center></h2>
        </div>
        <div className="d-flex">
          <form action="" method="" className='form-containers'>
            {/* First Column */}
            <div className="form-grid-6x2">
              {/* Row 1 */}
              <div className="input-block">
                <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="required" htmlFor="number">Shipment Number</label>
                <input id="ShipNo" type="text" name="ShipNo"value={formData.ShipNo} placeholder="Shipment number" onChange={handleChange} />
              </div>
              <div className="input-block">
                <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="routeDetails">Select Route</label>
                <select className="dropdown-header" id="routeDetails" name="routeDetails" value={selectedRoute} onChange={handleSelectRoute}>
                  <option className="dropdown-body" value="">Select Route</option>
                  {data.map(option => (
                    <option className="dropdown-item" key={option.id} value={option.label}>{option.label}</option>
                  ))}
                </select>
              </div>
              {/* Row 2 */}
              <div className="input-block">
        <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="device">
          Select Device
        </label>
        <select className="dropdown-header" id="device" name="device" value={selectedDevice} onChange={handleSelectDevice}>
          <option className="dropdown-body" value="">Select Device</option>
          {data_device.map(option => (
            <option className="dropdown-item" key={option.id} value={option.label}>{option.label}</option>
          ))}
        </select>
      </div>
              <div className="input-block">
                <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="PPoNo">PPO Number</label>
                <input id="PPoNo" type="text" name="PPoNo" value={formData.PPoNo}placeholder="PPO number" onChange={handleChange} />
              </div>
              {/* Row 3 */}
              <div className="input-block">
                <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="NDCNo">NDC Number</label>
                <input id="NDCNo" type="text" name="NDCNo"value={formData.NDCNo} placeholder="NDC Number" onChange={handleChange} />
              </div>
              <div className="input-block">
                <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="SerialNo">Serial Number of Goods</label>
                <input id="SerialNo" type="text" name="SerialNo" value={formData.SerialNo}placeholder="Serial number of goods" onChange={handleChange} />
              </div>
            </div>
            {/* Second Column */}
            <div className="form-grid-6x2">
              {/* Row 1 */}
              <div className="input-block">
                <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="ContainerNo">Container Number</label>
                <input id="ContainerNo" type="text" name="ContainerNo"value={formData.ContainerNo} placeholder="Enter container number" onChange={handleChange} />
              </div>
              <div className="input-block">
        <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="Goods">
          Select Goods
        </label>
        <select className="dropdown-header" id="Goods" name="Goods" value={selectedGoods} onChange={handleSelectGoods}>
          <option className="dropdown-body" value="">Select Goods</option>
          {data_goods.map(option => (
            <option className="dropdown-item" key={option.id} value={option.label}>{option.label}</option>
          ))}
        </select>
      </div>
              {/* Row 2 */}
              <div className="input-block">
                <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="number">Select Date</label>
                <div className="custom-date-picker">
                  <DatePicker
                    selected={selectedDate2}
                    onChange={handleDate2Change}
                    dateFormat="yyyy/MM/dd"
                    minDate={today} 
                    maxDate={maxDate} 
                    isClearable
                    placeholderText="Select date"
                  />
                </div>
              </div>
              <div className="input-block">
                <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="DlvryNo">Delivery Number</label>
                <input id="DlvryNo" type="text" name="DeliveryNo"value={formData.DeliveryNo} placeholder="Delivery number" onChange={handleChange} />
              </div>
              {/* Row 3 */}
              <div className="input-block">
                <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="BatchNo">Batch Id</label>
                <input id="BatchNo" type="text" name="BatchId" value={formData.BatchId}placeholder="BatchID" onChange={handleChange} />
              </div>
              <div className="input-block">
                <label style={{ color: focused ? 'red' : 'black', fontSize: 'large' }} className="labels" htmlFor="ShpDescNo">Shipment Description</label>
                <input className="bigger-input" id="ShpDescNo" type="text" name="ShipmentDesc"value={formData.ShipmentDesc} placeholder="Shipment description" onChange={handleChange} />
              </div>
            </div>
          </form>
        </div>
        {/* Buttons */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <button className="button-77" role="button" onClick={handleClear} style={{ marginRight: '10px' }}>
              CLEAR DETAILS
            </button>
            <button className="button-77" role="button" onClick={handleCreateShipment}>
              CREATE SHIPMENT
            </button>
          </div>
        </div>
        
      </div>
      </div>
      </div> 
     
    </Lay>
  );
}
