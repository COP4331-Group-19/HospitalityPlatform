import React, { useState } from "react";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import SidebarEmployee from "../components/Sidebar/SidebarEmployee.js";
import Footer from "../components/Footer";
import AboutEmployeePageComponent from "../components/Employee/AboutEmployeePage";

function AboutEmployeePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <UnifiedNavbar toggle={toggle} />
      <SidebarEmployee isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <AboutEmployeePageComponent />
      <Footer />
    </>
  );
}

export default AboutEmployeePage;
