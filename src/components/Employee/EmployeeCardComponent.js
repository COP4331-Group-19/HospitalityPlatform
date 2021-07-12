import React from "react";

import { EmployeeCard, EmployeeH2, EmployeeP } from "./EmployeeElements";

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
