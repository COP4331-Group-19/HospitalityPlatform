import React, { useState } from "react";
import EditAccountEmployee from "../components/Employee/EditAccountEmployee";
import NavbarEmployee from "../components/Navbar/NavbarEmployee";
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
      <NavbarEmployee toggle={toggle} />
      <SidebarEmployee isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <EditAccountEmployee />
      <Footer />
    </>
  );
}

export default EditAccountEmployeePage;