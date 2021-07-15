import React from "react";
// import Icon1 from "../../images/svg-1.svg";

import {
  AdminCard,
  AdminH2,
  AdminP,
  // AdminIcon,
} from "./AdminElements";

const AdminCardComponent = (props) => {
  return (
    <AdminCard>
      {/* <AdminIcon src={Icon1} /> */}
      <AdminH2>{props.items}</AdminH2>
      <AdminP>{props.description}</AdminP>
    </AdminCard>
  );
};

export default AdminCardComponent;
