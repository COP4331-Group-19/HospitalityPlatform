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
      <GuestH2>{props.items}</GuestH2>
    </GuestCard>
  );
};

export default GuestCardComponent;