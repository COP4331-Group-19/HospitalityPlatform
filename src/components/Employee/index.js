import React, { useState } from "react";
import EmployeeCardComponent from "./EmployeeCardComponent";
import AccountSettingComponent from "./AccountSettingComponent";
import Icon1 from "../../images/svg-1.svg";
import Icon2 from "../../images/svg-3.svg";
import Icon3 from "../../images/svg-5.svg";

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
            <EmployeeH3>Employee name: </EmployeeH3>
          </Form>
        </FormContent>
      </FormWrap>
      <EmployeeH1>You're logged in! Let's get to work.</EmployeeH1>
      {/* <Link to="/signin">Edit</Link> */}
      <AccountSettingWrapper></AccountSettingWrapper>
      {/*Setting container*/}
      {/* AccountSettingComponent settingTitle="FirstName" value="Angel*/}
      {/* AccountSettingComponent settingTitle="Password hidden={true}*/}
    </EmployeeContainer>
  );
};

export default Employee;
