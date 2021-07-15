import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const Orders = () => {
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
      <EmployeeH1>Active Orders</EmployeeH1>
      <EmployeeWrapper>
        <EmployeeCardComponent
          items={"Room 301 needs 1 towel"}
          description={"getting 1 towel"}
        />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
      </EmployeeWrapper>
      <EmployeeH1>Unclaimed Orders</EmployeeH1>
      <EmployeeWrapper>
        <EmployeeCardComponent
          items={"Room 101 needs 1 pillow"}
          description={"-1 from db"}
        />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
        <EmployeeCardComponent />
      </EmployeeWrapper>
    </EmployeeContainer>
  );
};

export default Orders;
