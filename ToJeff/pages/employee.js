import React, { useState } from "react";
import Employee from "../components/Employee";
import ScrollToTop from "../components/ScrollToTop";
import NavbarEmployee from "../components/Navbar/NavbarEmployee";
import SidebarEmployee from "../components/Sidebar/SidebarEmployee.js";
import Footer from "../components/Footer";

function EmployeePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarEmployee toggle={toggle} />
      <SidebarEmployee isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <Employee />
      <Footer />
    </>
  );
}

export default EmployeePage;