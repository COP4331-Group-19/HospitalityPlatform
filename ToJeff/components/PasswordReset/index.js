import React, { useState } from "react";
//import { Link } from 'react-router';
import { Link } from 'react-router-dom'
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
  FormButton1,
  Text,
} from "./PasswordResetElements";
import axios from "axios";


const ResetPassword = () => {
  const [message, setMessage] = useState("");

  var PhoneNumber = '';

  var bp = require("../Path.js");

  const getPasswordReset = async (event) => {
    event.preventDefault();

    if (PhoneNumber.charAt(4) === '-' && PhoneNumber.charAt(8) === '-') {
      //JSON OBJECT
      var obj = { phone: PhoneNumber.value };
      var js = JSON.stringify(obj);

      //Making a Payload
      var config = {
        method: "get",
        url: bp.buildPath("/api/account/letmein/:phone"),
        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config).then(function (response) {
        var res = response.data;
        if (res.err_code) {
          setMessage(res.description);
        }
        else {
          setMessage('Dont know what should go here ');
        }
      });
    }
    else{
      setMessage('Please Enter Phonenumber like this 123-456-7890');
    }
  }

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">CyberHotel</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Forgot Password</FormH1>
              <FormLabel htmlFor="for">Phone Number "XXX-XXX-XXXX</FormLabel>
              <FormInput type="phone" required ref={(c) => PhoneNumber = c} />
              <FormLabel> {message} </FormLabel>
              <FormButton type="submit" onClick={getPasswordReset}>Reset</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default ResetPassword;
