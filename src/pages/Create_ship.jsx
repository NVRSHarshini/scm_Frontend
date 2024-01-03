import React, { useState,useRef,useEffect } from 'react';
import { format } from 'date-fns';
//import ParticleEffect from '../pages/ParticleEffect.jsx';
// import Layout from "../component/Layout";
import "../styles/Create_ship.css";
import DatePicker from 'react-datepicker';
import { addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Lay from '../component/Lay';
import img from '../images/bg_chat.webp';

// import { ToastProvider, useToasts } from 'react-toast-notifications';
// import imgs from '../images/cre.jpg';
export default function Create_Ship() {
  // const { addToast } = useToasts();
////......progress bar
const [formProgress, setFormProgress] = useState(0); // State to track form progress

// Calculate the total number of fields in the form
const totalFields = 12; // Change this based on the actual number of fields

// Update form progress whenever a field is filled
// const calculateProgress = () => {
//   const filledFields = Object.values(formData).reduce((acc, value) => {
//     if (value !== '' && value !== null && value !== undefined) {
//       return acc + 1;
//     }
//     return acc;
//   }, 0);

//   const progress = Math.round((filledFields / totalFields) * 100);
//   setFormProgress(progress);
  
// };

////........progress bar end



  const mainContainerRef = useRef(null);

  
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const data = [
    { id: 0, label: "Route A" },
    { id: 1, label: "Route B" },
    { id: 2, label: "Route C" },
    { id: 3, label: "Route D" },
    { id: 4, label: "Route E" }
  ];
  
  const data_device = [
    { id: 0, label: "Device 1" },
    { id: 1, label: "Device 2" },
    { id: 2, label: "Device 3" },
    { id: 3, label: "Device 4" },
    { id: 4, label: "Device 5" }
  ];
  
  const data_goods = [
    { id: 0, label: "Goods 1" },
    { id: 1, label: "Goods 2" },
    { id: 2, label: "Goods 3" },
    { id: 3, label: "Goods 4" },
    { id: 4, label: "Goods 5" }
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

  

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  //   calculateProgress();
  //   // For regular input fields (not dropdowns)
    
  // };
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
        // addToast('Shipment created successfully!', { appearance: 'success' });
        
        console.log('Shipment created:', response.data);
       
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
        // Handle success scenario for shipment creation
      } else if (response.status === 409) {
        console.log('Conflict:', response.data);
        // Handle conflict scenario
      }
      // Add more conditionals if needed for different status codes
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
    console.log('Before clearing formData:', formData);
  
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
  
    console.log('After clearing formData:', formData);
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
      {/* </div> */}
    </Lay>
  );
}


// import React from "react";
// import { useState } from "react";
// import Layout from "../component/Layout";
// import "../styles/dropdown.css";

// export default function Create_Ship(){

//     const data = [{ id: 0, label: "Route1" }, { id: 1, label: "Route2" }];
//     const data_device=[{ id: 0, label: "Device1" }, { id: 1, label: "Device2" }];
   
    
//         const [isOpen, setOpen] = useState(false);
//         const [items, setItem] = useState(data);
//         const [dev,setDev]=useState(data_device);
//         const [selectedItem, setSelectedItem] = useState(null);
//         const [selectedDev, setSelectedDev] = useState(null);
      
//         const toggleDropdown = () => setOpen(!isOpen);
      
//         const handleItemClick = (id) => {
//           selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
//         }
//     const [formData, setFormData] = useState({
//         Name: '',
//         email: '',
//         password: '',
//         phone: '',
//       });
//     const handleSubmit=()=>{

//     }
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//       };
//     return(
//         <Layout>
         
//         <form className="form form-login" >
//         <div className="input-block">
//             <label htmlFor="number">Shipment Number</label>
//             <input id="ShipNo" type="text" name="Shipno" onChange={handleChange}/>
//             </div>
//             <div className="input-block">
//         <label htmlFor="shipmentType">Route Details</label>
//         <div className='dropdown'>
//       <div className='dropdown-header' onClick={toggleDropdown}>
//         {selectedItem ? items.find(item => item.id === selectedItem).label : "Select your destination"}
//         <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
//       </div>
//       <div className={`dropdown-body ${isOpen && 'open'}`}>
//         {items.map(item => (
//           <div className="dropdown-item" onClick={() => handleItemClick(item.id)} key={item.id}>
//             <span className={`dropdown-item-dot ${item.id === selectedItem && 'selected'}`}>• </span>
//             {item.label}
//           </div>
//         ))}
//       </div>
//     </div>
//       </div>


//       <div className="input-block">
//         <label htmlFor="shipmentType">Device</label>
//         <div className='dropdown'>
//       <div className='dropdown-header' onClick={toggleDropdown}>
//         {selectedDev ? dev.find(dev=> dev.id === selectedDev).label : "Select device"}
//         <i className={`fa fa-chevron-right icon ${isOpen && "open"}`}></i>
//       </div>
//       <div className={`dropdown-body ${isOpen && 'open'}`}>
//         {items.map(item => (
//           <div className="dropdown-item" onClick={() => handleItemClick(item.id)} key={item.id}>
//             <span className={`dropdown-item-dot ${item.id === selectedItem && 'selected'}`}>• </span>
//             {item.label}
//           </div>
//         ))}
//       </div>
//     </div>
//       </div>



//             <div className="input-block">
//             <label htmlFor="number">PPO Number</label>
//             <input id="PPoNo" type="text" name="PPono" onChange={handleChange}/>
//             </div>
//             <div className="input-block">
//             <label htmlFor="number">NDC Number</label>
//             <input id="NDCNo" type="text" name="NDCno" onChange={handleChange}/>
//             </div>
//             <div className="input-block">
//             <label htmlFor="number">Serial Number of goods</label>
//             <input id="SerialNo" type="text" name="SerialNo" onChange={handleChange}/>
//             </div>
//            {/* < <fieldset>
//               <h2 className="colorful-text">Please enter your credentials for login</h2>

//               <div className="input-block">
//                 <label htmlFor="login-email">E-mail</label>
//                 <input id="login-email" type="email" name="email" onChange={handleChange} required />
//               </div>
//               <div className="input-block">
//                 <label htmlFor="login-password">Password</label>
//                 <input id="login-password" type="password" name="password" onChange={handleChange} required />
//               </div>
//             </fieldset>
//             <button type="submit" className="btn-login">Login</button>> */}
         
//           </form>
//           <form>
//           <div className="input-block">
//             <label htmlFor="number">Container Number</label>
//             <input id="SerialNo" type="text" name="SerialNo" onChange={handleChange}/>
//             </div>
//           </form>
          
//         </Layout>
//     )
//  }