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
  GuestPageHeader,
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
import { FaAlignCenter } from "react-icons/fa";

const Guest = () => {

  //States
  const [isOpen, setIsOpen] = useState(false);
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

  //Inventory list
  const [Inv, setInv] = useState([]);
  const [check, setcheck] = useState(null);

  //Config for get account
  var configI = {
    method: "get",
    url: bp.buildPath("api/inventory"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };

  //UserInfo
  useEffect(async () => {

    //Get user info everytime we lode the page
    axios(configI).then(function (response) {

      var ud = response.data;
      for (var i = 0; i < ud.length; i++) {
        setInv(item => [...item, ud[i].name + ": " + ud[i].description]);
      }


    }).catch(function (error) {
      setMessage(' ' + error);
    });

  }, []);

  //Order List
  const [Ord, setOrd] = useState([]);

  //Add order function
  const doAddOrder = async event => {
    
  }

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <GuestContainer id="Guest">
      <FormWrap>
        <FormContent>
          <Form>
            <GuestH3>{FirstName}{LastName} {message}</GuestH3>
            <FormLittle action="#">
              <GuestH3>Room {Room}</GuestH3>
            </FormLittle>
          </Form>
        </FormContent>
      </FormWrap>
      <GuestH1>Services</GuestH1>
      <GuestWrapper>
        {
          Inv.map(itm => <GuestCardComponent items={itm}> </GuestCardComponent>)
        }
      </GuestWrapper>
      <GuestH1>Your Orders</GuestH1>
      <GuestWrapper>
        {
          Ord.map(itm => <GuestCardComponent items={itm} />)
        }
      </GuestWrapper>
    </GuestContainer>
  );
};

export default Guest;