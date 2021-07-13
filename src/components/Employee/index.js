import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmployeeCardComponent from "./EmployeeCardComponent";
import AccountSettingComponent from "./AccountSettingComponent";
import NavbarEmployee from "../Navbar/NavbarEmployee";
import Icon1 from "../../images/svg-1.svg";
import Icon2 from "../../images/svg-3.svg";
import Icon3 from "../../images/svg-5.svg";
// import Table from "..react-bootstrap/Table";
// import Card from "../../../react-bootstrap/Cards";
// import CardGroup from "../react-bootstrap/CardGroup";

import {
  AccountSettingWrapper,
  EmployeeContainer,
  EmployeeH1,
  EmployeeWrapper,
  EmployeeCard,
  EmployeeIcon,
  EmployeeH2,
  EmployeeH3,
  EmployeeP,
  FormWrap,
  FormContent,
  Form,
  FormLittle,
} from "./EmployeeElements";

const Employee = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <EmployeeContainer id="Employee">
      <FormWrap>
        <FormContent>
          <Form>
            <EmployeeH3>hello</EmployeeH3>
            <FormLittle action="#">
              <EmployeeH3>Room 221B</EmployeeH3>
            </FormLittle>
          </Form>
        </FormContent>
      </FormWrap>
      <EmployeeH1>Our Employee</EmployeeH1>
      <EmployeeWrapper>
        <EmployeeCardComponent
          items={"blankets"}
          description={"this is a description"}
        />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
      </EmployeeWrapper>
      <EmployeeH1>Account Settings</EmployeeH1>
      {/* <Link to="/signin">Edit</Link> */}
      <AccountSettingWrapper>
        <AccountSettingComponent
          settingTitle="FirstName"
          description="this is a description"
        />
        <AccountSettingComponent settingTitle="LastName" />
        <AccountSettingComponent settingTitle="PhoneNumber" />
        <AccountSettingComponent settingTitle="Email" />
        <AccountSettingComponent settingTitle="Username" />
        <AccountSettingComponent settingTitle="Password" />
      </AccountSettingWrapper>
      {/*Setting container*/}
      {/* AccountSettingComponent settingTitle="FirstName" value="Angel*/}
      {/* AccountSettingComponent settingTitle="Password hidden={true}*/}
    </EmployeeContainer>
  );
};

export default Employee;
