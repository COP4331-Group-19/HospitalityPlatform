import React, { useState } from "react";
import Guest from "../components/Guest";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import SidebarGuest from "../components/Sidebar/SidebarGuest.js";
import Footer from "../components/Footer";

function GuestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <UnifiedNavbar toggle={toggle} />
      <SidebarGuest isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <Guest />
      <Footer />
    </>
  );
}

export default GuestPage;
