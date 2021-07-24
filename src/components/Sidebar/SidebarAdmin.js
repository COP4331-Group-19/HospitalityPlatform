import React from "react";
import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarRoute,
  SideBtnWrap,
  SidebarLink,
  SidebarLink1,
} from "./SidebarElements";

const SidebarAdmin = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink1 to="/admin">Rooms</SidebarLink1>
          <SidebarLink1 to="/registeraccount">Register</SidebarLink1>
          <SidebarLink1 to="/">Log Out</SidebarLink1>
          {/* <SidebarLink
            to="discover"
            onClick={toggle}
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Discover
          </SidebarLink>
          <SidebarLink
            to="services"
            onClick={toggle}
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Services
          </SidebarLink> */}
          {/* <SidebarLink
            to='signup'
            onClick={toggle}
            smooth={true}
            duration={500}
            spy={true}
            exact='true'
            offset={-80}
          >
            Sign Up
          </SidebarLink> */}
        </SidebarMenu>
        <SideBtnWrap>
          {/* <SidebarRoute to="/signin">Sign In</SidebarRoute> */}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  );
};

export default SidebarAdmin;