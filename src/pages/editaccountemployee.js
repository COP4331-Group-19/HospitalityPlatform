import React, { useState } from "react";
import EditAccountEmployee from "../components/Employee/EditAccountEmployee";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

function EditAccountEmployeePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ScrollToTop />
      <EditAccountEmployee />
      <Footer />
    </>
  );
}

export default EditAccountEmployeePage;
