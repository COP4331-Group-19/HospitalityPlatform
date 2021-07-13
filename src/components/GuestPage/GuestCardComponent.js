//import React from "react";
import React, { useEffect, useState } from "react";
// import Icon1 from "../../images/svg-1.svg";

import {
  GuestCard,
  GuestH2,
  GuestP,
  IncDecButton,
  Value,

  // GuestIcon,
} from "./GuestElements";

const GuestCardComponent = (props) => {

    const [value, setValue] = useState(0);

    const dec = () => {
        setValue(v => v - 1)
    }
 
    const inc = () => {
        setValue(v => v + 1)
    }

  return (
    <GuestCard>
      {/* <AdminIcon src={Icon1} /> */}
      <GuestH2>{props.items}</GuestH2>
      <GuestP>{props.description}</GuestP>
      {/* <IncDecButton onClick={dec}> - </IncDecButton>
      <Value> {value} </Value>
      <IncDecButton onClick={inc}> + </IncDecButton> */}
    </GuestCard>
  );
};

export default GuestCardComponent;