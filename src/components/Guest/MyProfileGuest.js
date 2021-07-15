import React from "react";
import GuestAccountSettingComponent from "./GuestAccountSettingComponent";
import GuestCardComponent from "./GuestCardComponent";
import NavbarGuest from "../Navbar/NavbarGuest";
import {
  AccountSettingWrapper,
  GuestContainer,
  GuestH1,
  GuestWrapper,
  GuestCard,
  GuestIcon,
  GuestH2,
  GuestH3,
  GuestP,
  FormWrap,
  FormContent,
  Form,
  FormLittle,
  Button,
  FormButton,
  IncDecButton,
  Value,
  EditAccountBtnLink,
} from "./GuestElements";

const MyProfileGuest = () => {
  return (
    <>
      <GuestContainer>
        <FormWrap>
          <FormContent>
            {/* <Form>
              <GuestH3>hello</GuestH3>
              <FormLittle action="#">
                <GuestH3>Room 221B</GuestH3>
              </FormLittle>
            </Form> */}
          </FormContent>
        </FormWrap>
        {/* <GuestH1>Active Orders</GuestH1> */}

        <GuestWrapper>
          {/*           
          <GuestCardComponent
            items={"Blankets"}
            description={"Need more blankets? we'll get you some!"}
          />
          <GuestCardComponent 
          items={"Pillows"}
          description={"To keep your head supported"}/>
          <GuestCardComponent />
          <GuestCardComponent />
          <GuestCardComponent />
          <GuestCardComponent /> */}
        </GuestWrapper>
        {/* <GuestH1>Account Settings</GuestH1> */}
        {/* <FormButton>Click me</FormButton> */}
        <EditAccountBtnLink to="/editaccountguest">
          Edit Account{" "}
        </EditAccountBtnLink>

        <AccountSettingWrapper>
          <GuestAccountSettingComponent
            settingTitle="FirstName"
            description="Guest_FirstName_Placeholder"
          />
          <GuestAccountSettingComponent
            settingTitle="LastName"
            description="Guest_LastName_Placeholder"
          />
          <GuestAccountSettingComponent
            settingTitle="PhoneNumber"
            description="Guest_PhoneNumber_Placeholder"
          />
          <GuestAccountSettingComponent
            settingTitle="Email"
            description="Guest_Email_Placeholder"
          />
          <GuestAccountSettingComponent
            settingTitle="UserName"
            description="Guest_UserName_Placeholder"
          />
        </AccountSettingWrapper>
        {/*Setting container*/}
        {/* AccountSettingComponent settingTitle="FirstName" value="Angel*/}
        {/* AccountSettingComponent settingTitle="Password hidden={true}*/}
      </GuestContainer>
    </>
  );
};

export default MyProfileGuest;
