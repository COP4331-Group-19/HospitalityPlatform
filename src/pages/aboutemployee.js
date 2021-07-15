import React, { useState } from "react";
import ScrollToTop from "../components/ScrollToTop";
import NavbarEmployee from "../components/Navbar/NavbarEmployee";
import Footer from "../components/Footer";
import AboutEmployeePageComponent from "../components/Employee/AboutEmployeePage";

function AboutEmployeePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarEmployee />
      <ScrollToTop />
      <AboutEmployeePageComponent />
      <Footer />
    </>
  );
}

export default AboutEmployeePage;
