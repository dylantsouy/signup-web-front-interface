import React from "react";
import Navbar from "./Navbar";

const Common = ({ children }) => {

  return (
    <div className="container">
      <div className="main">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Common;
