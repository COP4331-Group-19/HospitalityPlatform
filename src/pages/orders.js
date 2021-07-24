import React, { useState } from "react";
import Orders from "../components/Employee/Orders";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import SidebarEmployee from "../components/Sidebar/SidebarEmployee.js";
import Footer from "../components/Footer";

function OrdersPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <UnifiedNavbar toggle={toggle} />
      <SidebarEmployee isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <Orders />
      <Footer />
    </>
  );
}

export default OrdersPage;
