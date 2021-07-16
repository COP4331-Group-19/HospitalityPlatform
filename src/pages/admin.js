import React, { useState } from "react";
import Admin from "../components/Admin";
import ScrollToTop from "../components/ScrollToTop";
import NavbarAdmin from "../components/Navbar/NavbarAdmin";
import Footer from "../components/Footer";

function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarAdmin toggle={toggle} />
      <ScrollToTop />
      <Admin />
      <Footer />
    </>
  );
}

export default AdminPage;
