import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavItem,
  NavLinks,
  NavLogo,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavBtnLinkGuest,
  NavBtnLinkAdmin,
  NavBtnLinkEmployee,
} from "./NavbarElements";

const Navbar = ({ toggle }) => {
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
          <NavbarContainer>
            <NavLogo onClick={toggleHome} to="/">
              Hotel Knightro
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks
                  to="about"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  About
                </NavLinks>
              </NavItem>
              <NavItem>
//                 <NavLinks
//                   to="discover"
//                   smooth={true}
//                   duration={500}
//                   spy={true}
//                   exact="true"
//                   offset={-80}
//                 >
//                   ???
//                 </NavLinks>
//               </NavItem>
//               <NavItem>
//                 <NavLinks
//                   to="services"
//                   smooth={true}
//                   duration={500}
//                   spy={true}
//                   exact="true"
//                   offset={-80}
//                 >
//                   Services
//                 </NavLinks>
              </NavItem>
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
            </NavMenu>
            <NavBtn>
              <NavBtnLink to="/signin">Sign In</NavBtnLink>
              <NavBtnLinkAdmin to="/admin">AdminPage</NavBtnLinkAdmin>
              <NavBtnLinkEmployee to="/employee">EmployeePage</NavBtnLinkEmployee>
              <NavBtnLinkGuest to="/aboutguest">Guest</NavBtnLinkGuest>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
