import React, { useState } from "react";
import Admin from "../components/Admin";
import ScrollToTop from "../components/ScrollToTop";
import UnifiedNavbar from "../components/Navbar/UnifiedNavbar";
import Footer from "../components/Footer";

function AdminPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <UnifiedNavbar />
      <ScrollToTop />
      <Admin />
      <Footer />
    </>
  );
}

export default AdminPage;
