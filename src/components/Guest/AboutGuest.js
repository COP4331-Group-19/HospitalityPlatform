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
} from "./GuestElements";

const AboutGuest = () => {
  //UserInfo
  // var guest = localStorage.getItem("user_data");
  // var ud = JSON.parse(guest);
  // var AccountType = ud.AccountType;
  // var UserID = ud.UserID;
  // var FirstName = ud.FirstName;
  // var LastName = ud.LastName;
  // var RoomNumber = ud.RoomNumber;
  // var PhoneNumber = ud.PhoneNumber;
  // var Email = ud.Email;
  // var COD = ud.CheckOutDate;

  return (
    <>
      <GuestContainer>
        <FormWrap>
          <GuestH1>Guest Account</GuestH1>
          <FormContent>
            <Form>
              <GuestH3>hello</GuestH3>
              <FormLittle action="#">
                <GuestH3>Room 221B</GuestH3>
              </FormLittle>
            </Form>
          </FormContent>
        </FormWrap>
        {/* <GuestH1> " " </GuestH1>
        <GuestH1> " " </GuestH1> */}
        <GuestH1>About us</GuestH1>

        <GuestWrapper>{/* <GuestH3>hello</GuestH3> */}</GuestWrapper>
        <GuestH3>Welcome to our Hotel, Come, stay and enjoy your day!</GuestH3>
        {/* <GuestH1>Account Settings</GuestH1> */}
        {/* <Link to="/signin">Edit</Link> */}
        <AccountSettingWrapper>
          {/* <GuestAccountSettingComponent
            settingTitle="FirstName"
            description="this is a description"
          />
          <GuestAccountSettingComponent settingTitle="LastName" />
          <GuestAccountSettingComponent settingTitle="PhoneNumber" />
          <GuestAccountSettingComponent settingTitle="Email" />
          <GuestAccountSettingComponent settingTitle="Username" />
          <GuestAccountSettingComponent settingTitle="Password" /> */}
        </AccountSettingWrapper>
        {/*Setting container*/}
        {/* AccountSettingComponent settingTitle="FirstName" value="Angel*/}
        {/* AccountSettingComponent settingTitle="Password hidden={true}*/}
      </GuestContainer>
    </>
  );
};

export default AboutGuest;
