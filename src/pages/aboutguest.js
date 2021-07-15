import React, { useState } from "react";
import AboutGuest from "../components/Guest/AboutGuest";
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
      <NavbarGuest />
      <ScrollToTop />
      <AboutGuest />
      <Footer />
    </>
  );
}

export default AboutGuestPage;