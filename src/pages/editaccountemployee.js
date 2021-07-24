import React, { useState } from "react";
import EditAccountEmployee from "../components/Employee/EditAccountEmployee";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import SidebarEmployee from "../components/Sidebar/SidebarEmployee.js";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

function EditAccountEmployeePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <UnifiedNavbar toggle={toggle} />
      <SidebarEmployee isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <EditAccountEmployee />
      <Footer />
    </>
  );
}

export default EditAccountEmployeePage;
