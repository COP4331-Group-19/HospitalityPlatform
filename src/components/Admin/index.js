import React from "react";
import { Link } from "react-router-dom";
import AdminAccountSettingComponent from "./AdminAccountSettingComponent";
import AdminCardComponent from "../Admin/AdminCardComponent";
import {
  AccountSettingWrapper,
  AdminContainer,
  AdminH1,
  AdminWrapper,
  AdminCard,
  AdminIcon,
  AdminH2,
  AdminH3,
  AdminP,
  FormWrap,
  FormContent,
  Form,
  FormLittle,
} from "./AdminElements";
const Admin = () => {
  return (
    <>
      <AdminContainer>
        <AdminH1>Room Availability</AdminH1>
        <AdminWrapper>
          {/* 300-304 rooms */}
          {/* I linked to register account to give you some code that
          will link to another page or whatever you need */}
          <Link to="/registeraccount">
            <AdminCardComponent
              username={"username"}
              vacancy={"vacant"}
              roomnumber="Room 300"
            />
          </Link>
          <AdminCardComponent />
          <AdminCardComponent />
          <AdminCardComponent />
          {/* 200-204 rooms */}
          <AdminCardComponent
            username={"username"}
            vacancy={"vacant"}
            roomnumber="Room 200"
          />
          <AdminCardComponent />
          <AdminCardComponent />
          <AdminCardComponent />
          {/* 100-104 rooms */}
          <AdminCardComponent
            username={"username"}
            vacancy={"vacant"}
            roomnumber="Room 100"
          />
          <AdminCardComponent />
          <AdminCardComponent />
          <AdminCardComponent />
        </AdminWrapper>
        {/* <AdminH1>Account Settings</AdminH1> */}
        {/* <AccountSettingWrapper>
          <AdminAccountSettingComponent
            settingTitle="FirstName"
            description="this is a description"
          />
          <AdminAccountSettingComponent settingTitle="LastName" />
          <AdminAccountSettingComponent settingTitle="PhoneNumber" />
          <AdminAccountSettingComponent settingTitle="Email" />
          <AdminAccountSettingComponent settingTitle="Username" />
          <AdminAccountSettingComponent settingTitle="Password" />
        </AccountSettingWrapper> */}
      </AdminContainer>
    </>
  );
};

export default Admin;
