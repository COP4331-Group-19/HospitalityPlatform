import React, { useState, useEffect } from "react";
import axios from "axios";
import Storage from '../../tokenStorage.js';

import {
  EmployeeContainer,
  EmployeeH1,
  EmployeeWrapper,
  EmployeeCard,
  EmployeeH2,
  EmployeeP,
  Button,
} from "./EmployeeElements";

const Orders = () => {
  //UseState
  const [unClm, setunClm] = useState([]);
  const [Clm, setClm] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageUC, setMessageUC] = useState(null);
  const [messageC, setMessageC] = useState(null);
  var numINV = 0;
  var ItemsArray = [];

  //Variables
  var Token = Storage.retrieveToken()
  var bp = require("../Path.js");

  //INVENTORY
  var config = {
    method: "get",
    url: bp.buildPath("api/inventory"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };
  useEffect(async () => {
    axios(config).then(function (response) {
      var ud = response.data;
      numINV = ud.length;
      for (var i = 0; i < ud.length; i++) {
        ItemsArray[i] = ud[i].name + '#' + ud[i].description + '#' + ud[i].img + '#' + ud[i].item_id;
      }
    }).catch(function (error) {
      setMessage(' ' + error);
    });

  }, []);

  //GETTING UNCLAIMED ORDERS
  var configU = {
    method: "get",
    url: bp.buildPath("api/orders/unclaimed"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };
  useEffect(async () => {
    setunClm([]);
    axios(configU).then(function (response) {

      var ud = response.data;
      if (ud.err_code) {
        setMessageUC(' ' + ud.description);
      }
      else {
        for (var i = 0; i < ud.length; i++) {
          for (let j = 0; j < ItemsArray.length; j++) {
            if (ud[i].item_id.toString() === ItemsArray[j].split('#')[3]) {
              setunClm(item => [...item, ItemsArray[j].split('#')[0] + '#' + ud[i].quantity + '#' + ud[i].room_id + '#' + ud[i].order_id + '#' + ItemsArray[j].split('#')[2]]);
            }
          }
        }
      }
    }).catch(function (error) {
      setMessageUC(' ' + error);
    });

  }, []);
  const EmployeeCardComponentUn = (props) => {

    const claimOrd = async event => {
      var configCO = {
        method: "get",
        url: bp.buildPath("api/orders/claim/" + props.order),
        headers: {
          "Content-Type": "application/json",
          "authorization": Token
        }
      };

      axios(configCO).then(function (response) {
        var check = response.data;
        if (check.err_code) {
          setMessageUC(' ' + check.description);
        } else {
          setMessageUC('Success');
          //Makes it look like its working
          let Aray = [...unClm];
          var index = Aray.indexOf(props.name + '#' + props.qun + '#' + props.room + '#' + props.order + '#' + props.img);
          if (index > -1) {
            //Puts the item in to clm
            setClm(items => [...items, Aray[index]]);
            //Removes the item from unclm
            Aray.splice(index, 1);
          }
          setunClm(Aray);
        }
      }).catch(function (error) {
        setMessageUC(' ' + error);
      });
    }

    return (
      <EmployeeCard style={{ backgroundImage: `url(${props.img})` }}>
        <EmployeeH2>{props.qun} {props.name}</EmployeeH2>
        <EmployeeP>RoomNo. {props.room}</EmployeeP>
        <Button onClick={claimOrd}>Claim</Button>
      </EmployeeCard>
    );
  };

  //GETTING TODO ORDERS
  var configMy = {
    method: "get",
    url: bp.buildPath("api/orders/my"),
    headers: {
      "Content-Type": "application/json",
      "authorization": Token
    }
  };
  useEffect(async () => {
    setClm([]);
    axios(configMy).then(function (response) {

      var ud = response.data;
      if (ud.err_code) {
        setMessageC(' ' + ud.description);
      }
      else {
        for (var i = 0; i < ud.length; i++) {
          for (let j = 0; j < ItemsArray.length; j++) {
            if (ud[i].item_id.toString() === ItemsArray[j].split('#')[3]) {
              setClm(item => [...item, ItemsArray[j].split('#')[0] + '#' + ud[i].quantity + '#' + ud[i].room_id + '#' + ud[i].order_id + '#' + ItemsArray[j].split('#')[2]]);
            }
          }
        }
      }
    }).catch(function (error) {
      setMessageC(' ' + error);
    });

  }, []);
  const EmployeeCardComponent = (props) => {
    const markOrd = async event => {
      var configMO = {
        method: "delete",
        url: bp.buildPath("api/orders/fulfill/" + props.order),
        headers: {
          "Content-Type": "application/json",
          "authorization": Token
        }
      };

      axios(configMO).then(function (response) {
        var check = response.data;
        if (check.err_code) {
          setMessageC(' ' + check.description);
          //Makes it look like its working
          let Aray = [...Clm];
          var index = Aray.indexOf(props.name + '#' + props.qun + '#' + props.room + '#' + props.order + '#' + props.img);
          if (index > -1) {
            //Removes the item from C
            Aray.splice(index, 1);
          }
          setClm(Aray);
        }
      }).catch(function (error) {
        setMessageC(' ' + error);
      });
    }

    return (
      <EmployeeCard style={{ backgroundImage: `url(${props.img})` }}>
        <EmployeeH2>{props.qun} {props.name}</EmployeeH2>
        <EmployeeP>RoomNo. {props.room}</EmployeeP>
        <Button onClick={markOrd}>Mark Complete</Button>
      </EmployeeCard>
    );
  };

  return (
    <EmployeeContainer id="Employee">
      <EmployeeH1>Active Orders</EmployeeH1>
      <EmployeeH2>{messageC}</EmployeeH2>
      <EmployeeWrapper>
        {
          Clm.map(ord => <EmployeeCardComponent name={ord.split('#')[0]} qun={ord.split('#')[1]} room={ord.split('#')[2]} order={ord.split('#')[3]} img={ord.split('#')[4]} />)
        }
      </EmployeeWrapper>
      <EmployeeH1>Unclaimed Orders</EmployeeH1>
      <EmployeeH2>{messageUC}</EmployeeH2>
      <EmployeeWrapper>
        {
          unClm.map(ord => <EmployeeCardComponentUn name={ord.split('#')[0]} qun={ord.split('#')[1]} room={ord.split('#')[2]} order={ord.split('#')[3]} img={ord.split('#')[4]} />)
        }
      </EmployeeWrapper>
    </EmployeeContainer>
  );
};

export default Orders;
