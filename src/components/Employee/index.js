import React, { useState } from "react";
import NavbarEmployee from "../Navbar/NavbarEmployee";
import Icon1 from "../../images/svg-1.svg";
import Icon2 from "../../images/svg-3.svg";
import Icon3 from "../../images/svg-5.svg";
// import Table from "..react-bootstrap/Table";
// import Card from "../../../react-bootstrap/Cards";
// import CardGroup from "../react-bootstrap/CardGroup";

import {
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
          <Form action="#">
            <FormLittle action="#">
              <EmployeeH3>221B</EmployeeH3>
            </FormLittle>
          </Form>
        </FormContent>
      </FormWrap>
      <EmployeeH1>Our Employee</EmployeeH1>
      <EmployeeWrapper>
        <EmployeeCard>
          {/* <EmployeeIcon src={Icon1} /> */}
          <EmployeeH2>Example1</EmployeeH2>
          <EmployeeP>Example1</EmployeeP>
        </EmployeeCard>
        <EmployeeCard>
          {/* <EmployeeIcon src={Icon2} /> */}
          <EmployeeH2>Example2</EmployeeH2>
          <EmployeeP>Example2</EmployeeP>
        </EmployeeCard>
        <EmployeeCard>
          {/* <EmployeeIcon src={Icon3} /> */}
          <EmployeeH2>Example3</EmployeeH2>
          <EmployeeP>Example3</EmployeeP>
        </EmployeeCard>
      </EmployeeWrapper>
    </EmployeeContainer>
  );
};

export default Employee;
