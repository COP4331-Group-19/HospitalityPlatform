import React from "react";
import EditAccountGuest from "../components/Guest/EditAccountGuest";
import NavbarGuest from "../components/Navbar/NavbarGuest";
import ScrollToTop from "../components/ScrollToTop";
import Footer from "../components/Footer";

function EditAccountGuestPage() {
  return (
    <>
      <NavbarGuest />
      <ScrollToTop />
      <EditAccountGuest />
      <Footer />
    </>
  );
}

export default EditAccountGuestPage;
