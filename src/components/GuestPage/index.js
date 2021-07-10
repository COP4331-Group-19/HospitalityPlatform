import React from "react";
import Icon1 from "../../images/svg-1.svg";
import Icon2 from "../../images/svg-3.svg";
import Icon3 from "../../images/svg-5.svg";
import {
  GuestContainer,
  GuestH1,
  GuestWrapper,
  GuestCard,
  GuestIcon,
  GuestH2,
  GuestP,
} from "./GuestElements";

const Guest = () => {
  return (
    <GuestContainer id="Guest">
      <GuestH1>Welcome Guest</GuestH1>
      <GuestWrapper>
        <GuestCard>
          {/* <GuestIcon src={Icon1} /> */}
          <GuestH2>Pillows</GuestH2>
          <GuestP>Click Here</GuestP>
        </GuestCard>
        <GuestCard>
          {/* <GuestIcon src={Icon2} /> */}
          <GuestH2>Blankets</GuestH2>
          <GuestP>Click Here</GuestP>
        </GuestCard>
        <GuestCard>
          {/* <GuestIcon src={Icon3} /> */}
          <GuestH2>Linens</GuestH2>
          <GuestP>Click Here</GuestP>
        </GuestCard>
      </GuestWrapper>
    </GuestContainer>
  );
};

export default Guest;
