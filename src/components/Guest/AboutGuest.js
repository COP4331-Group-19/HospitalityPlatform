import React, { useState, useEffect } from "react";
import GuestAccountSettingComponent from "./GuestAccountSettingComponent";
import GuestCardComponent from "./GuestCardComponent";
import NavbarGuest from "../Navbar/NavbarGuest";
import axios from "axios";
import Storage from '../../tokenStorage.js';
import {
  AccountSettingWrapper,
  GuestContainer,
  GuestH1,
  GuestWrapper,
  GuestCard,
  GuestIcon,
  GuestH2,
  GuestH3,
  GuestP,
  FormWrap,
  FormContent,
  Form,
  FormLittle,
  Button,
  FormButton,
  IncDecButton,
  Value,
} from "./GuestElements";

const AboutGuest = () => {
  
  //useState
  const [message, setMessage] = useState(null);
  const [FirstName, setFName] = useState(null);
  const [LastName, setLName] = useState(null);
  const [Room, setRoom] = useState(null);

  //Variables
  var Token = Storage.retrieveToken()

  //required files
  var bp = require("../Path.js");

  //Config for get account
  var config = {
    method: "get",
    url: bp.buildPath("api/account"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };


  //UserInfo
  useEffect(async () => {

    //Get user info everytime we lode the page
    axios(config).then(function (response) {

      var ud = response.data;

      //Getting info needed for this page
      setFName(ud.first_name);
      setLName(ud.last_name);
      setRoom(ud.room);
    }).catch(function (error) {
      setMessage(' ' + error);
    });

  }, []);

  return (
    <>
      <GuestContainer>
        <FormWrap>
          <GuestH1>Guest Account</GuestH1>
          <FormContent>
            <Form>
              <GuestH3>{FirstName}{LastName} {message}</GuestH3>
              <FormLittle action="#">
                <GuestH3>Room {Room}</GuestH3>
              </FormLittle>
            </Form>
          </FormContent>
        </FormWrap>
        <GuestH1>About us</GuestH1>
        <GuestWrapper>{/* <GuestH3>hello</GuestH3> */}</GuestWrapper>
        <GuestH3>Welcome to our Hotel, Come, stay and enjoy your day!</GuestH3>
        <AccountSettingWrapper>
        </AccountSettingWrapper>
      </GuestContainer>
    </>
  );
};

export default AboutGuest;