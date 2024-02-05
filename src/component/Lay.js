import React from "react";
import Header from "./Header";


const Lay = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      
    </>
  );
};

export default Lay;