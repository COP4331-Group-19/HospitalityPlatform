import React, { useState } from "react";
import AboutGuest from "../components/Guest/AboutGuest";
import SidebarGuest from "../components/Sidebar/SidebarGuest.js";
import ScrollToTop from "../components/ScrollToTop";
import NavbarGuest from "../components/Navbar/NavbarGuest";
import Footer from "../components/Footer";

function AboutGuestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarGuest toggle={toggle} />
      <SidebarGuest isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <AboutGuest />
      <Footer />
    </>
  );
}

export default AboutGuestPage;
