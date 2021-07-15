import React from "react";
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
        <FormWrap>
          <FormContent>
            <Form>
              <AdminH3>hello</AdminH3>
              <FormLittle action="#">
                <AdminH3>Room 221B</AdminH3>
              </FormLittle>
            </Form>
          </FormContent>
        </FormWrap>
        <AdminH1>Admin Account</AdminH1>
        <AdminWrapper>
          <AdminCardComponent
            items={"blankets"}
            description={"this is a description"}
          />
          <AdminCardComponent />
          <AdminCardComponent />
          <AdminCardComponent />
          <AdminCardComponent />
          <AdminCardComponent />
        </AdminWrapper>
        <AdminH1>Account Settings</AdminH1>
        {/* <Link to="/signin">Edit</Link> */}
        <AccountSettingWrapper>
          <AdminAccountSettingComponent
            settingTitle="FirstName"
            description="this is a description"
          />
          <AdminAccountSettingComponent settingTitle="LastName" />
          <AdminAccountSettingComponent settingTitle="PhoneNumber" />
          <AdminAccountSettingComponent settingTitle="Email" />
          <AdminAccountSettingComponent settingTitle="Username" />
          <AdminAccountSettingComponent settingTitle="Password" />
        </AccountSettingWrapper>
        {/*Setting container*/}
        {/* AccountSettingComponent settingTitle="FirstName" value="Angel*/}
        {/* AccountSettingComponent settingTitle="Password hidden={true}*/}
      </AdminContainer>
    </>
  );
};

export default Admin;
