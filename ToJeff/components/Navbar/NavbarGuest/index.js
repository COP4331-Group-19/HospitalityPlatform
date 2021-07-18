import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll, Button } from "react-scroll";
import { NavLink } from "react-router-dom";
import {
  MobileIcon,
  Nav,
  NavbarGuestContainer,
  NavGuestItem,
  NavGuestLinks,
  NavGuestLogo,
  NavGuestMenu,
  FormWrap,
  FormContent,
  NavBtn,
  NavBtnLink,
  NavBtnLinkAdmin,
  NavBtnLinkGuest,
} from "./NavbarGuestElements";
import AboutGuestPage from "../../../pages/aboutguest";

const NavbarGuest = ({ toggle }) => {
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
          <NavGuestLogo to="/">Hotel Knightro</NavGuestLogo>

          <NavbarGuestContainer>
            {/* <NavGuestLogo to="/">Hotel Knightro</NavGuestLogo> */}
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavGuestMenu>
              <NavGuestItem>
                <NavBtnLink to="/aboutGuest">About</NavBtnLink>
              </NavGuestItem>
              <NavGuestItem>
                <NavBtnLink to="/guest">Services</NavBtnLink>
              </NavGuestItem>
              <NavGuestItem>
                <NavBtnLink to="/myprofileGuest">My Profile</NavBtnLink>
              </NavGuestItem>
            </NavGuestMenu>
          </NavbarGuestContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default NavbarGuest;