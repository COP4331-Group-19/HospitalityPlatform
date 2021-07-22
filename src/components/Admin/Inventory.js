import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminCardComponent from "../Admin/AdminCardComponent";
import AdminCardInventoryComponent from "../Admin/AdminCardInventoryComponent";
import axios from "axios";
import Storage from '../../tokenStorage.js';
import {
  AccountSettingWrapper,
  AdminContainer,
  AdminH1,
  AdminWrapper,
  InventoryWrapper,
  AdminCard,
  AdminIcon,
  AdminH2,
  AdminH3,
  AdminP,
} from "./AdminElements";

import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  Text,
} from "./AdminAddInventoryElements";

const Inventory = () => {
  const [message, setMessage] = useState(null);
  var Name;
  var Description;
  var Img;

  //Variables
  var Token = Storage.retrieveToken()

  //required files
  var bp = require("../Path.js");

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
    setInv([]);
    //Get user info everytime we lode the page
    axios(configI).then(function (response) {

      var ud = response.data;
      for (var i = 0; i < ud.length; i++) {
        setInv(item => [...item, ud[i].name + "#" + ud[i].description + "#" + ud[i].img + "#" + ud[i].item_id]);
      }
    }).catch(function (error) {
      setMessage(' ' + error);
    });

  }, []);

  const doAddInv = async event => {
    if (Name.value.localeCompare('') === 0 || Description.value.localeCompare('') === 0 || Img.value.localeCompare('') === 0) {
      setMessage('All fields need to be filled');
    }
    else {

      //JSON OBJECT
      var obj = {name: Name.value, description: Description.value, img: Img.value};
      var js = JSON.stringify(obj);

      var config = {
        method: "post",
        url: bp.buildPath("api/inventory"),
        headers: {
          "Content-Type": "application/json",
          "authorization": Token
        },
        body: js,
      };

      axios(config).then(function (response) {
        var res = response.data;
        if(res.err_Code){
          setMessage(res.description);
        }else{
          setMessage(res[0].item_id);
          //window.location.href = "/Inventory";
        }
      }).catch(function (error) {
        setMessage(' ' + error);
      });
    }
  }

  return (
    <AdminContainer>
      <Form action="#">
        <FormH1>Add Inventory</FormH1>
        <FormLabel htmlFor="for">Name</FormLabel>
        <FormInput type="name" ref={(c) => Name = c} />
        <FormLabel htmlFor="for">Description</FormLabel>
        <FormInput type="name" ref={(c) => Description = c} />
        <FormLabel htmlFor="for">Image</FormLabel>
        <FormInput type="name" ref={(c) => Img = c} />
        <FormLabel>{message}</FormLabel>
        <FormButton type="submit" onClick={doAddInv} >Add</FormButton>
      </Form>
      <AdminH1>Inventory</AdminH1>
      <AdminWrapper>
        {
          Inv.map(itm =>
            <AdminCardInventoryComponent items={itm.split("#")[0]} des={itm.split("#")[1]} img={itm.split("#")[2]} />
          )
        }
      </AdminWrapper>
    </AdminContainer>
  );
};

export default Inventory;
