import React from "react";
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


const ResetPassword = () => {
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">CyberHotel</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Forgot Password</FormH1>
              <FormLabel htmlFor="for">Phone Number "XXX-XXX-XXXX</FormLabel>
              <FormInput type="email" required />
              <FormButton type="submit">Reset</FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default ResetPassword;
