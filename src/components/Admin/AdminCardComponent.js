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
      <AdminH2>{props.username}</AdminH2>
      <AdminH2>{props.roomnumber}</AdminH2>
      <AdminP>{props.vacancy}</AdminP>
    </AdminCard>
  );
};

export default AdminCardComponent;
