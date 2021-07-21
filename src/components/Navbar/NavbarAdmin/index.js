import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  MobileIcon,
  Nav,
  NavbarAdminContainer,
  NavAdminItem,
  NavAdminLinks,
  NavAdminLogo,
  NavAdminMenu,
  FormWrap,
  FormContent,
  NavBtn,
  NavBtnLink,
  NavBtnLinkGuest,
  NavBtnLinkAdmin,
} from "./NavbarAdminElements";

const NavbarAdmin = ({ toggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavAdminLogo to="/">Hotel Knightro</NavAdminLogo>

          <NavbarAdminContainer>
            {/* <NavAdminLogo to="/">Hotel Knightro</NavAdminLogo> */}
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavAdminMenu>
              <NavAdminItem>
                <NavBtnLink to="/admin">Rooms</NavBtnLink>
              </NavAdminItem>
              <NavAdminItem>
                <NavBtnLink to="/registeraccount">Register Account</NavBtnLink>
              </NavAdminItem>
              <NavAdminItem>
                <NavBtnLink to="/">Log Out</NavBtnLink>
              </NavAdminItem>
              <NavAdminItem>
                {/* <NavBtnLink to="/myprofileAdmin">Account Setting</NavBtnLink> */}
              </NavAdminItem>
            </NavAdminMenu>
          </NavbarAdminContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default NavbarAdmin;
