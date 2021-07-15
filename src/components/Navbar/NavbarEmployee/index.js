import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  MobileIcon,
  Nav,
  NavbarEmployeeContainer,
  NavEmployeeItem,
  NavEmployeeLinks,
  NavEmployeeLogo,
  NavEmployeeMenu,
  FormWrap,
  FormContent,
  NavBtn,
  NavBtnLink,
  NavBtnLinkGuest,
  NavBtnLinkAdmin,
  NavBtnLinkEmployee,
} from "./NavbarEmployeeElements";

const NavbarEmployee = ({ toggle }) => {
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
          <NavbarEmployeeContainer>
            <NavEmployeeLogo onClick={toggleHome} to="/">
              Hotel Knightro
            </NavEmployeeLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavEmployeeMenu>
              <NavEmployeeItem>
                <NavEmployeeLinks
                  to="about"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  About
                </NavEmployeeLinks>
              </NavEmployeeItem>
              <NavEmployeeItem>
                <NavEmployeeLinks
                  to="services"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Services
                </NavEmployeeLinks>
              </NavEmployeeItem>
              <NavEmployeeItem>
                <NavEmployeeLinks
                  to="profile"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  My Profile
                </NavEmployeeLinks>
              </NavEmployeeItem>
              {/* <NavItem>
                <NavLinks
                  to="signup"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Sign Up
                </NavLinks>
              </NavItem> */}
            </NavEmployeeMenu>
          </NavbarEmployeeContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default NavbarEmployee;
