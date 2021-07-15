import React, { useState } from "react";
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
} from "../../components/SignIn/SigninElements.js";
// import Storage from "../../tokenStorage.js";

const EditAccountEmployee = () => {
  const [message, setMessage] = useState("");

  //   //required files
  //   var bp = require("../Path.js");

  //   //variables used to login
  //   var LoginName;
  //   var LoginPassword;

  //   // doLogin just a login function
  //   const doLogin = async (event) => {
  //     event.preventDefault();

  //     //JSON OBJECT
  //     var obj = { username: LoginName.value, password: LoginPassword.value };
  //     var js = JSON.stringify(obj);

  //     //Making a Payload
  //     var config = {
  //       method: "post",
  //       url: bp.buildPath("api/account/login"),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: js,
  //     };

  //     //Sending Payload to the server
  //     axios(config)
  //       .then(function (response) {
  //         var res = response.data;

  //         if (res.err_Code) {
  //           //Error Message
  //           setMessage(res.description);
  //         } else {
  //           //Import Jasonwebtoken
  //           var jwt = require("jsonwebtoken");

  //           //Removing Bearer
  //           var decoded = res.token.replace("Bearer ", "");

  //           //Decoding the jwt to get the user data
  //           var ud = jwt.decode(decoded);

  //           //Taking out of the payload
  //           var userId = ud.id;
  //           var UserName = ud.username;
  //           var Role = ud.role;

  //           //Puting stuff in to the user
  //           var user = { UserName: UserName, Role: Role, userId: userId };

  //           //Locally storing user Data
  //           localStorage.setItem("user_data", JSON.stringify(user));

  //           //Go to the user Window
  //           window.location.href = "/user";
  //         }
  //       })
  //       .catch(function (error) {
  //         //Error function to show error as consol logs
  //         setMessage(" " + error);
  //       });
  //   };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Click Cyber Hotel</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Edit Account</FormH1>
              <FormLabel htmlFor="for">First Name</FormLabel>
              <FormInput type="name" />
              <FormLabel htmlFor="for">Last Name</FormLabel>
              <FormInput type="name" />
              <FormLabel htmlFor="for">Phone Number</FormLabel>
              <FormInput type="phonenumber" />
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput type="email" />
              <FormLabel htmlFor="for">UserName</FormLabel>
              <FormInput type="name" />
              <FormLabel htmlFor="for">Old Password </FormLabel>
              <FormInput type="password" required />
              <FormLabel htmlFor="for">New Password</FormLabel>
              <FormInput type="password" />

              {/* // <FormLabel> {message} </FormLabel> */}
              <FormLabel> {message} </FormLabel>
              {/* //{" "} */}
              {/* <FormButton type="submit" class="button" onClick={doLogin}>
                // Continue //{" "}
              </FormButton> */}
              <FormButton to="/myprofileemployee">Submit Changes</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default EditAccountEmployee;
