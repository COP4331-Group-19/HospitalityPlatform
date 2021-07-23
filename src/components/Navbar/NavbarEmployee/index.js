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
          <NavEmployeeLogo to="/">Hotel Knightro</NavEmployeeLogo>

          <NavbarEmployeeContainer>
            {/* <NavEmployeeLogo to="/">Hotel Knightro</NavEmployeeLogo> */}
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavEmployeeMenu>
              <NavEmployeeItem>
                <NavBtnLink to="/aboutemployee">About</NavBtnLink>
              </NavEmployeeItem>
              <NavEmployeeItem>
                <NavBtnLink to="/orders">Orders</NavBtnLink>
              </NavEmployeeItem>
              <NavEmployeeItem>
                <NavBtnLink to="/myprofileemployee">Account Setting</NavBtnLink>
              </NavEmployeeItem>
              <NavEmployeeItem>
                <NavBtnLink to="/">Log Out</NavBtnLink>
              </NavEmployeeItem>
            </NavEmployeeMenu>
          </NavbarEmployeeContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default NavbarEmployee;
