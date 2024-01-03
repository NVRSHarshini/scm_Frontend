import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Button,
  Grid,
  styled,
} from "@mui/material";
import { Avatar } from "@mui/material";
import {
  AccountCircle,
  Phone,
  Email,
  EmailOutlined, // Import other icons
  PhoneOutlined,
} from "@mui/icons-material";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  backgroundColor: "#f2f2f2",
  border: "2px solid #ddd",
  borderRadius: "10px",
}));

const useStyles = styled((theme) => ({
  media: {
    height: 200,
  },
  icon: {
    fontSize: 40,
    color: theme.palette.primary.main,
  },
}));

export default function SeeCustomers() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const Navigate = useNavigate();

  const handleBack = () => {
    Navigate('/Admin', { replace: false });
  }

  useEffect(() => {
    axios.get('https://localhost:44302/api/Customer')
      .then(result => {
        setData(result.data);
      });
  }, []);

  return (
    <div className="see-customers">
      <center><h1 className="mb-4">All Customers</h1></center>
      <Button variant="contained" color="primary" onClick={() => handleBack()}>BACK</Button>
      <div className={classes.root}>
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardHeader
                  avatar={
                    <Avatar className={classes.icon}>
                      <AccountCircle />
                    </Avatar>
                  }
                  title={`Customer ID: ${item.id}`}
                />
                <CardMedia
                  className={classes.media}
                  image={item.imageUrl} // Assuming you have an 'imageUrl' property for each customer
                  title={`Image for ${item.name}`}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    <EmailOutlined style={{ color: "blue" }} /> {item.email}
                  </Typography>
                  <Typography variant="subtitle1">
                    <PhoneOutlined style={{ color: "green" }} /> {item.phone}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}











// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../pages/RegistrationFormstyles.css";

// export default function SeeCustomers() {
//     const [data, setData] = useState([]);    

//     const Navigate = useNavigate();

//     const handleBack=()=>{
//         Navigate('/Admin', { replace: false });
//     }

//     useEffect(() => {
//         axios.get('https://localhost:44302/api/Customer')
//             .then(result => {
//                 setData(result.data)
//             })

//     }, []);

//     return (
//         <div>
//            <center> <h1>ALL-Customers</h1></center>
            
//            <button class="btn btn-primary" onClick={() => handleBack()}> BACK </button><table 
//             class="table table-striped table-dark"
//             >
//                 <thead>
//                     <tr>
//                         <th scope="col">CustomerId</th>                        
//                         <th scope="col">CustomerName</th>
//                         <th scope="col">Username</th>
//                         {/* <th scope="col">Password</th> */}
//                         <th scope="col">Phone</th>
//                         {/* <th scope="col">Feedack Id</th> */}
                        
                        

//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         data.map((item, index) => {
//                             return (
//                                 <tr 
//                                 key={index}
//                                 >
//                                     <td>{item.id}</td>                                    
//                                     <td>{item.name}</td>
//                                     <td>{item.email}</td>
//                                     {/* <td>{item.Password}</td> */}
//                                     <td>{item.phone}</td>
//                                     {/* <td>{item.Feedbackfid}</td> */}
                                  
                                    
                                    
//                                 </tr>
//                             )
//                         })}
//                 </tbody>
//             </table>

            
//         </div>
//     )

// }