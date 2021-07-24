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


const logOutPls = () => {
  // Logs out of the account by clearing session data.
  localStorage.token_data = "";
  document.cookie="session=;max-age=0";
}

const UnifiedSidebar = ({ isOpen, toggle }) => {
  return (
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          <SidebarMenu>
            {/* This is what we in the business call "black magic sorcery." It literally pulls roles out of the void (the JWT) */}
            {/* admin */}
            {
              localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "admin" ? <SidebarLink to="/admin">Rooms</SidebarLink>  : null) : null
            }
            {
              localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "admin" ? <SidebarLink to="/registeraccount">Register Account</SidebarLink>  : null) : null
            }
            {/* staff */}
            {
              localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "staff" ? <SidebarLink to="/aboutemployee">About</SidebarLink>  : null) : null
            }
            {
              localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "staff" ? <SidebarLink to="/orders">Orders</SidebarLink>  : null) : null
            }
            {/* guest */}
            {
              localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "guest" ? <SidebarLink to="/guest">Services</SidebarLink>  : null) : null
            }
            {/* All */}
            {
              localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "none" ? null  : <SidebarLink to="/about">About</SidebarLink>) : null
            }
            {
              localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "none" ? null  : <SidebarLink onClick={toggle} to="/settings">Settings</SidebarLink>) : null
            }
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
            {
              localStorage.token_data ? (JSON.parse(atob(localStorage.token_data.split(".")[1])).role === "none" ? <SidebarRoute to="/signin">Sign In</SidebarRoute>  : <SidebarRoute onClick={logOutPls} to="/">Sign Out</SidebarRoute>) : <SidebarRoute onClick={logOutPls} to="/signin">Sign In</SidebarRoute>
            }
          </SideBtnWrap>
        </SidebarWrapper>
      </SidebarContainer>
  );
};

export default UnifiedSidebar;
