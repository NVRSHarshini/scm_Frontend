import React from "react";
import Footer from "./Footer";
import Header from "./Header";
const Lay = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
       {/* <Footer />  */}
    </>
  );
};

export default Lay;