import React, { useState } from "react";
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

const AboutEmployeePageComponent = () => {
  return (
    <>
      <EmployeeContainer id="Employee">
        <FormWrap>
          <FormContent>
            <Form>
              <EmployeeH3>Employee name: </EmployeeH3>
            </Form>
          </FormContent>
        </FormWrap>
        <EmployeeH1>ABOUT PAGE</EmployeeH1>
        {/* <Link to="/signin">Edit</Link> */}
        <AccountSettingWrapper></AccountSettingWrapper>
        {/*Setting container*/}
        {/* AccountSettingComponent settingTitle="FirstName" value="Angel*/}
        {/* AccountSettingComponent settingTitle="Password hidden={true}*/}
      </EmployeeContainer>
    </>
  );
};

export default AboutEmployeePageComponent;
