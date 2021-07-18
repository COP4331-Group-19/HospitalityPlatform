import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
} from "./RegisterElements.js";
import Storage from "../../tokenStorage.js";

const RegisterAccount = () => {
  // useStates
  const [message, setMessage] = useState(null);

  //required files
  var bp = require("../Path.js");

  //Variables
  var Token = Storage.retrieveToken();

  //variables
  var FirstName;
  var LastName;
  var PhoneNumber;
  var Email;
  var Password;
  var Role;
  var UserName;
  var CID;
  var COD;

  const doRegister = async event => {

    if (UserName === null || Password === null || FirstName === null || LastName === null || Email === null || PhoneNumber === null || Role === null || CID === null || COD === null) {
      setMessage('Please ennter all information');
    }
    else {

      //JSON OBJECT
      var obj = {
        "username": UserName.value,
        "password": Password.value,
        "first_name": FirstName.value,
        "last_name": LastName.value,
        "email": Email.value,
        "phone": PhoneNumber.value,
        "role": Role.value,
        "checkin": CID.value,
        "checkout": COD.value
      };

      var js = JSON.stringify(obj);

      //Making a Payload
      var config = {
        method: "patch",
        url: bp.buildPath("api/account/"),
        headers: {
          "Content-Type": "application/json",
          "authorization": Token
        },
        data: js,
      };
      axios(config)
        .then(function (response) {
          window.location.href = "/admin";
        })
        .catch(function (error) {
          //Error function to show error as consol logs
          setMessage(" " + error);
        });
    }
  }

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Click Cyber Hotel</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Register Account</FormH1>
              <FormLabel htmlFor="for">First Name</FormLabel>
              <FormInput type="name" ref={(c) => FirstName = c} />
              <FormLabel htmlFor="for">Last Name</FormLabel>
              <FormInput type="name" ref={(c) => LastName = c} />
              <FormLabel htmlFor="for">Phone Number</FormLabel>
              <FormInput type="phonenumber" ref={(c) => PhoneNumber = c} />
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput type="email" ref={(c) => Email = c} />
              <FormLabel htmlFor="for">UserName</FormLabel>
              <FormInput type="name" ref={(c) => UserName = c} />
              <FormLabel htmlFor="for">Password </FormLabel>
              <FormInput type="password" ref={(c) => Password = c} />
              <FormLabel htmlFor="for">Role </FormLabel>
              <FormInput type="password" ref={(c) => Role = c} />
              <FormLabel htmlFor="for">CheckInDate </FormLabel>
              <FormInput type="password" ref={(c) => CID = c} />
              <FormLabel htmlFor="for">CheckOutDate </FormLabel>
              <FormInput type="password" ref={(c) => COD = c} />
              <FormLabel> {message} </FormLabel>
              <FormButton type="submit" class="button" onClick={doRegister}>Register User</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default RegisterAccount;