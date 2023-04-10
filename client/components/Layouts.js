import React from "react";
import Navbar from "./layouts/Navbar";

const Layouts = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layouts;
