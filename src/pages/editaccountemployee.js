import React from "react";
import EditAccountEmployee from "../components/Employee/EditAccountEmployee";
import NavbarEmployee from "../components/Navbar/NavbarEmployee";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

function EditAccountEmployeePage() {
  return (
    <>
      <NavbarEmployee />
      <ScrollToTop />
      <EditAccountEmployee />
      <Footer />
    </>
  );
}

export default EditAccountEmployeePage;
