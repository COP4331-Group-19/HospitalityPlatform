import React from "react";
import {
  AccountSettingCard,
  AccountSettingH2,
  AccountP,
} from "./AdminElements";

const AdminAccountSettingComponent = (props) => {
  const hideText = (text) => {
    /* turn text into asterisk */
  };

  return (
    <AccountSettingCard>
      {/* <AccountSettingIcon src={Icon1} /> */}
      <AccountSettingH2>{props.settingTitle}</AccountSettingH2>
      <AccountP>{props.description}</AccountP>
      <AccountSettingH2>
        {/* {props.hidden ? hideText(props.value) : value} */}
      </AccountSettingH2>
    </AccountSettingCard>
  );
};

export default AdminAccountSettingComponent;
