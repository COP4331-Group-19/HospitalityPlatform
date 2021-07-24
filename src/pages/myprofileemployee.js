import React, { useState } from "react";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
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
      <UnifiedNavbar toggle={toggle} />
      <SidebarEmployee isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <MyProfileEmployee />
      <Footer />
    </>
  );
}

export default MyProfileEmployeePage;
