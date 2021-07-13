import React from "react";
// import Icon1 from "../../images/svg-1.svg";

import {
  EmployeeCard,
  EmployeeH2,
  EmployeeP,
  // EmployeeIcon,
} from "./EmployeeElements";

const EmployeeCardComponent = (props) => {
  return (
    <EmployeeCard>
      {/* <EmployeeIcon src={Icon1} /> */}
      <EmployeeH2>{props.items}</EmployeeH2>
      <EmployeeP>{props.description}</EmployeeP>
    </EmployeeCard>
  );
};

export default EmployeeCardComponent;
