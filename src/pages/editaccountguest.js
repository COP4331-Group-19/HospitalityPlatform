import React, { useState } from "react";
import EditAccountGuest from "../components/Guest/EditAccountGuest";
import NavbarGuest from "../components/Navbar/NavbarGuest";
import SidebarGuest from "../components/Sidebar/SidebarGuest.js";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

function EditAccountGuestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavbarGuest toggle={toggle} />
      <SidebarGuest isOpen={isOpen} toggle={toggle} />
      <ScrollToTop />
      <EditAccountGuest />
      <Footer />
    </>
  );
}

export default EditAccountGuestPage;
