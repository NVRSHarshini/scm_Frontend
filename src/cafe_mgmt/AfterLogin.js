import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useCustomer } from '../data/CustomerContext';
// const customerDetail = {
//     id:null ,
//     email: null,
//     password: null,
//     phone:null,
// };
// const customerDetail = {
//     id:customerDetails.id ,
//     email: customerDetails.email,
//     password: customerDetails.password,
//     phone: customerDetails.phone,
// };


// export function addItemToMenu(item) {
//   MenuList.push(item);
//   // Save the updated menu data to local storage
//   localStorage.setItem("menuData", JSON.stringify(MenuList));
// }

export default function AfterLogin()
 {
    const [SearchParam,setSearchParams]=useSearchParams();
    const [customer, setCustomer] = useState("");
    const [customerDetails, setCustomerDetails] = useState(null);
    const { setDetails, setLoading } = useCustomer();

    const [email,setEmail]=useState((SearchParam.get("email")));
    const [password,setPassword]=useState(SearchParam.get("password"));
    
    //const { setDetails } = useCustomer();
    console.log('email=',email);
    console.log('password=',password);
    //const email = 'customer@example.com'; // Replace with the customer's email
    //const password = 'password123'; // Replace with the customer's password
    
      
    useEffect(() => {
        // Make a GET request to the backend API to fetch all customers

        //........................one.......................
        // axios.get("https://localhost:44302/api/Customer")
        //     .then(response => {
        //         const filteredCustomers = response.data.find(
        //             cust => cust.Email === email && cust.Password === password
        //         );
                //.....................two........
                // Filter the response data to find the logged-in customer
                // const filteredCustomers = response.data.filter(customer =>
                //     customer.Email === email && customer.Password === password
                // );
                setLoading(true);

                axios.get(`https://localhost:44302/api/Customer?email=${email}&password=${password}`)
                .then(response => 
                    
            {
                    const responseData = response.data;
    
                    if (Array.isArray(responseData)) {
                        const filteredCustomers = responseData.find(
                            cust => cust.email === email && cust.password === password
                        );
                console.log("filtered",filteredCustomers);
                if (filteredCustomers) {
                    setCustomer(filteredCustomers);
                     setCustomerDetails({
                            id: filteredCustomers.id,
                            email: filteredCustomers.email,
                            password: filteredCustomers.password,
                            phone:filteredCustomers.phone,
                            // Add more customer details here
                        });
                        
                } else {
                    console.error("Customer not found or multiple customers match the criteria.");
                    setLoading(false);
                }
    }})
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [email, password]);
    useEffect(() => {
        console.log("custDetails:", customerDetails);
      }, [customerDetails]);
    if (!customer) {
        return <center><div><h1>Not Found</h1></div></center>;
    }

    return (
        <center>
        <div className="customer-card">
            <Card>
                <CardContent style={{ backgroundColor: '#f0f0f0', textAlign: 'center' }}>
                    <AccountCircleIcon fontSize="large" color="primary" />
                    <Typography variant="h5" component="div" style={{ color: 'blue' }}>
                        {customer.name}
                    </Typography>
                    <Typography color="textSecondary" style={{ fontWeight: 'bold' }}>
                        ID: {customer.id}
                    </Typography>
                    <Typography color="textSecondary" style={{ fontWeight: 'bold' }}>
                        Email: {customer.email}
                    </Typography>
                    <Typography color="textSecondary" style={{ fontWeight: 'bold' }}>
                       Password: {customer.password}
                    </Typography>
                    <Typography color="textSecondary" style={{ fontWeight: 'bold' }}>
                       Phone: {customer.phone}
                    </Typography>
                    <div><Link component='a' to={`/Login?email=${email}&password=${password}&customerid=${customer.id}`}>Back</Link></div> 
                    {/* Add more customer details here */}
                </CardContent>
            </Card>
        </div>
        </center>
        // <div>
        //     <h1>Customer Details</h1>
        //     <p>ID: {customer.id}</p>
        //     <p>Name: {customer.name}</p>
        //     <p>Email id: {customer.email}</p>
        //     <p>Phone:{customer.phone}</p>
            
        // </div>
    );
}






