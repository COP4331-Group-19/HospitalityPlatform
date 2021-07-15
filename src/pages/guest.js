import React, { useState } from "react";
import Guest from "../components/Guest";
import ScrollToTop from "../components/ScrollToTop";
import NavbarGuest from "../components/Navbar/NavbarGuest";
import Footer from "../components/Footer";

function GuestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarGuest />
      <ScrollToTop />
      <Guest />
      <Footer />
    </>
  );
}

export default GuestPage;