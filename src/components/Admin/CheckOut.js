import React, { useState, useEffect } from "react";
import axios from "axios";
import Storage from '../../tokenStorage.js';
import {
    AdminContainer,
    AdminH1,
    AdminWrapper,
} from "./AdminElements";
import {
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
} from "./AdminAddInventoryElements";
import { AdminCard, AdminH2, AdminP, FormButtonDelete } from "./AdminAddInventoryElements";

const CheckOut = () => {
    var Search = '';
    const [message, setMessage] = useState(null);
    const [messageR, setMessageR] = useState(null);
    var Users = [];
    const [SR, setSR] = useState([]);

    //Variables
    var Token = Storage.retrieveToken();

    //required files
    var bp = require("../Path.js");

    //Get all user data
    var config = {
        method: "get",
        url: bp.buildPath("api/account/all"),
        headers: {
            "Content-Type": "application/json",
            "authorization": Token
        }
    };

    useEffect(async () => {
        axios(config).then(function (response) {
            var ud = response.data;
            if (ud.err_code) {
                setMessage(ud.description);
            } else {
                Users = ud;
            }
        }).catch(function (error) {
            setMessage(' ' + error);
        });
    });

    const doSearch = async => {
        if (Search.value === '') {
            setMessage("Input Room that needs to be searched...");
            setSR([]);
        }
        else {
            setMessage('Getting User Information');
            setSR([]);
            //Set SR with correct user information
            for(let i = 0; i < Users.length; i++){
                if(Users[i].room === Search.value){

                    let dateI = new Date(Users[i].checkin);
                    let dateO = new Date(Users[i].checkout);

                    setSR([Users[i].first_name + Users[i].last_name + '#' + Users[i].email + '#' + Users[i].phone + '#' + Users[i].username + '#' + Users[i].room + '#' + Users[i].user_id + '#' + dateI + '#' + dateO]);
                }
            }
            if(SR.length < 1){
                setMessage("Room is Empty");
            }
        }
    }

    //Hoe the Searched guest looks
    const AdminCardComponent = (props) => {

        const coGuest = async event => {
            setMessageR('Working');
        }
        return (
            <AdminCard>
                <AdminH2>Name : {props.name}</AdminH2>
                <AdminH2>Room : {props.room}</AdminH2>
                <AdminP>Email : {props.email}</AdminP>
                <AdminP>Phone : {props.phone}</AdminP>
                <AdminH2>UserName : {props.username}</AdminH2>
                <AdminP>CheckInDate : {props.checkin}</AdminP>
                <AdminP>CheckOutDate : {props.checkout}</AdminP>
                <FormButtonDelete type="submit" class="button" onClick={coGuest}>
                    delete
                </FormButtonDelete>
            </AdminCard>
        );
    };

    return (
        <AdminContainer>
            <Form action="#">
                <FormH1>Check Out Guest</FormH1>
                <FormLabel htmlFor="for">Search Room</FormLabel>
                <FormInput type="name" ref={(c) => Search = c} />
                <FormLabel>{message}</FormLabel>
                <FormButton type="submit" onClick={doSearch}>Search</FormButton>
            </Form>
            <AdminH1>Search Results</AdminH1>
            <br /><br /><br /><br />
            <AdminP>{messageR}</AdminP>
            <AdminWrapper>
                {
                    SR.map(itm =>
                        <AdminCardComponent name={itm.split('#')[0]} room={itm.split('#')[4]} username={itm.split('#')[3]} email={itm.split('#')[1]} phone={itm.split('#')[2]} checkin={itm.split('#')[6]} checkout={itm.split('#')[7]} id={itm.split('#')[5]} />
                    )
                }
            </AdminWrapper>
        </AdminContainer>
    );
};

export default CheckOut;