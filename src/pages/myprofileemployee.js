import React, { useState } from "react";
import ScrollToTop from "../components/ScrollToTop";
import NavbarEmployee from "../components/Navbar/NavbarEmployee";
import SidebarEmployee from "../components/Sidebar/SidebarEmployee.js";
import Footer from "../components/Footer";
import MyProfileEmployee from "../components/Employee/MyProfileEmployee";

function MyProfileEmployeePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarEmployee toggle={toggle} />
      <SidebarEmployee isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <MyProfileEmployee />
      <Footer />
    </>
  );
}

export default MyProfileEmployeePage;
