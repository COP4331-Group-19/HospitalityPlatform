import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminAccountSettingComponent from "./AdminAccountSettingComponent";
import AdminCardComponent from "../Admin/AdminCardComponent";
import axios from "axios";
import Storage from '../../tokenStorage.js';
import {
  AccountSettingWrapper,
  AdminContainer,
  AdminH1,
  AdminWrapper,
  AdminCard,
  AdminIcon,
  AdminH2,
  AdminH3,
  AdminP,
  FormWrap,
  FormContent,
  Form,
  FormLittle,
} from "./AdminElements";
const Admin = () => {

  //Room Details
  const[F1R0, set10] = useState(["Vacent", "100"]);

  //States
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [Users, setUsers] = useState([]);

  //Variables
  var Token = Storage.retrieveToken()

  //required files
  var bp = require("../Path.js");

  //Config for get Floors
  var configF1 = {
    method: "get",
    url: bp.buildPath("api/floor/1"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };
  var configF2 = {
    method: "get",
    url: bp.buildPath("api/floor/2"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };
  var configF3 = {
    method: "get",
    url: bp.buildPath("api/floor/3"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };


  //UserInfo
  useEffect(async () => {

    //Get user info everytime we lode the page
    axios(configF1).then(function (response) {
      var floors = response.data;



    }).catch(function (error) {
      setMessage(' ' + error);
    });

    axios(configF2).then(function (response) {
      var floors = response.data;



    }).catch(function (error) {
      setMessage(' ' + error);
    });

    axios(configF3).then(function (response) {
      var floors = response.data;



    }).catch(function (error) {
      setMessage(' ' + error);
    });

  }, []);

  
  

  return (
    <>
      <AdminContainer>
        <AdminH1>Room Availability</AdminH1>
        <AdminWrapper>
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
         <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
          {/* 200-204 rooms */}
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
          {/* 100-104 rooms */}
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
          <AdminCardComponent
            username={F1R0[0]}
            roomnumber={F1R0[1]}
          />
        </AdminWrapper>
      </AdminContainer>
    </>
  );
};

export default Admin;