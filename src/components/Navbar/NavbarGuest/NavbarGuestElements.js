import { Link as LinkS } from "react-scroll";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkA } from "react-router-dom";
import { Link as LinkE } from "react-router-dom";
import { Link as LinkG } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #14cca4;
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
export const NavbarGuest = styled.nav`
  background: #14cca4;
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: left;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarGuestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

export const NavGuestLogo = styled(LinkR)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
`;

export const MobileIcon = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavGuestMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: flex;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavGuestItem = styled.li`
  height: 80px;
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavGuestLinks = styled(LinkS)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    border-bottom: 3px solid #c20114;
  }
`;

export const NavBtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #14cca4;
  white-space: nowrap;
  padding: 10px 22px;
  height: 100px;
  color: white;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #c20114;
  }
`;
export const NavBtnLinkAdmin = styled(LinkA)`
  border-radius: 50px;
  background: #c20114;
  white-space: nowrap;
  padding: 10px 22px;
  color: white;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #c20114;
  }
`;

export const NavBtnLinkEmployee = styled(LinkE)`
  border-radius: 50px;
  background: #c20114;
  white-space: nowrap;
  padding: 10px 22px;
  color: white;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #c20114;
  }
`;
export const NavBtnLinkGuest = styled(LinkG)`
  border-radius: 50px;
  background: #c20114;
  white-space: nowrap;
  padding: 10px 22px;
  color: white;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #c20114;
  }
`;