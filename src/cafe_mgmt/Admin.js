import React from "react";
import AdminLayout from "../components/AdminLayout";
import { Box, Typography } from "@mui/material";
import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import AdminPage from "../images/AdminPage.jpg";

const Admin = () => {
  
  return (
    <AdminLayout>

<center>
      <div className="home" style={{ backgroundImage: `url(${AdminPage})` ,backgroundSize: 'cover',}}>
        <div className="headerContainer">
          <h1 >Welcome Admin</h1>
          {/* <Link to="/AllOrders">*/}
          {/* <Link to="/menu"> */}
          {/* <button class="button4">See Orders</button></Link> */}
          
          {/* <Link to="/AllFeedback"> */}
          {/* <Link to="/menu"> */}
          {/* <button class="button4">See Feedback</button> */}

          {/* </Link>  */}
        </div>
      </div>
      </center>

      {/* <div><center>
        <h1>Admin</h1>
           </center>     
      </div> */}
      {/* <div><center><button>See all orders</button></center></div> */}
      {/* <Box
        sx={{
          my: 15,
          textAlign: "center",
          p: 2,
          "& h4": {
            fontWeight: "bold",
            my: 2,
            fontSize: "2rem",
          },
          "& p": {
            textAlign: "justify",
          },
          "@media (max-width:600px)": {
            mt: 0,
            "& h4 ": {
              fontSize: "1.5rem",
            },
          },
        }}
      ><Typography variant="h2">ADMIN</Typography>
      {/* <div><Button>See All Orders</Button></div> */}
      {/* </Box> */} 
     </AdminLayout>
  );
};

export default Admin;
