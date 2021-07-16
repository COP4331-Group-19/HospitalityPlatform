import React, { useState } from "react";
import MyProfileGuest from "../components/Guest/MyProfileGuest";
import ScrollToTop from "../components/ScrollToTop";
import NavbarGuest from "../components/Navbar/NavbarGuest";
import SidebarGuest from "../components/Sidebar/SidebarGuest.js";
import Footer from "../components/Footer";

function MyProfileGuestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarGuest toggle={toggle} />
      <SidebarGuest isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <MyProfileGuest />
      <Footer />
    </>
  );
}

export default MyProfileGuestPage;
