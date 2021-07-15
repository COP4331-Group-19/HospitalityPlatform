import React, { useState } from "react";
import Orders from "../components/Employee/Orders";
import ScrollToTop from "../components/ScrollToTop";
import NavbarEmployee from "../components/Navbar/NavbarEmployee";
import Footer from "../components/Footer";

function OrdersPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarEmployee toggle={toggle} />
      <ScrollToTop />
      <Orders />
      <Footer />
    </>
  );
}

export default OrdersPage;
