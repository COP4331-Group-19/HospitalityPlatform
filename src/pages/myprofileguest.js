import React, { useState } from "react";
import MyProfileGuest from "../components/Guest/MyProfileGuest";
import ScrollToTop from "../components/ScrollToTop";
import NavbarGuest from "../components/Navbar/NavbarGuest";
import Footer from "../components/Footer";

function MyProfileGuestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarGuest />
      <ScrollToTop />
      <MyProfileGuest />
      <Footer />
    </>
  );
}

export default MyProfileGuestPage;