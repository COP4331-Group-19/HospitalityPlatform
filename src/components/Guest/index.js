import React, { useState } from "react";
import GuestAccountSettingComponent from "./GuestAccountSettingComponent";
import GuestCardComponent from "./GuestCardComponent";
import NavbarGuest from "../Navbar/NavbarGuest";
import {
  AccountSettingWrapper,
  GuestContainer,
  GuestH1,
  GuestPageHeader,
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
import { FaAlignCenter } from "react-icons/fa";

// const Guest = () => {
//   //UserInfo
//   var guest = localStorage.getItem("user_data");
//   var ud = JSON.parse(guest);
//   var AccountType = ud.AccountType;
//   var UserID = ud.UserID;
//   var FirstName = ud.FirstName;
//   var LastName = ud.LastName;
//   var RoomNumber = ud.RoomNumber;
//   var PhoneNumber = ud.PhoneNumber;
//   var Email = ud.Email;
//   var COD = ud.CheckOutDate;

//   return (
//     <>
//       <GuestContainer>
//         <GuestPageHeader>Guest Account</GuestPageHeader>
//         <FormWrap>
//           <FormContent>
//             <Form>
//               <GuestH3>
//                 {FirstName} {LastName}
//               </GuestH3>
//               <FormLittle action="#">
//                 <GuestH3>Room {RoomNumber}</GuestH3>
//               </FormLittle>
//             </Form>
//           </FormContent>
//         </FormWrap>
//         <GuestH1>Order Service</GuestH1>

//         <GuestWrapper>
//           <GuestCardComponent
//             items={"Blankets"}
//             description={"Need more blankets? we'll get you some!"}
//           />
//           <GuestCardComponent
//             items={"Pillows"}
//             description={"To keep your head supported"}
//           />
//           <GuestCardComponent />
//           <GuestCardComponent />
//           <GuestCardComponent />
//           <GuestCardComponent />
//         </GuestWrapper>
//         <GuestH1>Account Settings</GuestH1>
//         {/* <Link to="/signin">Edit</Link> */}
//         <AccountSettingWrapper>
//           <GuestAccountSettingComponent
//             settingTitle="FirstName"
//             description={FirstName}
//           />
//           <GuestAccountSettingComponent
//             settingTitle="LastName"
//             description={LastName}
//           />
//           <GuestAccountSettingComponent
//             settingTitle="PhoneNumber"
//             description={PhoneNumber}
//           />
//           <GuestAccountSettingComponent
//             settingTitle="Email"
//             description={Email}
//           />
//         </AccountSettingWrapper>
//         {/*Setting container*/}
//         {/* AccountSettingComponent settingTitle="FirstName" value="Angel*/}
//         {/* AccountSettingComponent settingTitle="Password hidden={true}*/}
//       </GuestContainer>
//     </>
//   );
// };

// export default Guest;

const Guest = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <GuestContainer id="Guest">
      <FormWrap>
        <FormContent>
          <Form>
            <GuestH3>Guest_FirstName Guest_LastName</GuestH3>
            <FormLittle action="#">
              <GuestH3>Room 221B</GuestH3>
            </FormLittle>
          </Form>
        </FormContent>
      </FormWrap>
      <GuestH1>Services</GuestH1>
      <GuestWrapper>
        <GuestCardComponent
          items={"Blankets"}
          description={"Need more blankets? we'll get you some!"}
        />
        <GuestCardComponent
          items={"Pillows"}
          description={"Need more blankets? we'll get you some!"}
        />
        <GuestCardComponent
          items={"Hamburger"}
          description={"Best hamburger any hotel has to offer!"}
        />
        <GuestCardComponent
          items={"Hot Dog"}
          description={"Best Hot Dog any hotel has to offer!"}
        />
        <GuestCardComponent
          items={"French Fries"}
          description={"Best French Fries any hotel has to offer!"}
        />
        <GuestCardComponent
          items={"Soft Drink"}
          description={"Best Soft Drink any hotel has to offer!"}
        />
      </GuestWrapper>
      <GuestH1>Your Orders</GuestH1>
      <GuestWrapper>
        <GuestCardComponent
          items={"Temp placeholder"}
          description={"temp placeholder"}
        />
        <GuestCardComponent />
        <GuestCardComponent />
        <GuestCardComponent />
        <GuestCardComponent />
        <GuestCardComponent />
      </GuestWrapper>
    </GuestContainer>
  );
};

export default Guest;

