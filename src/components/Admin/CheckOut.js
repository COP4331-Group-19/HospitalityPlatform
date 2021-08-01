import React, { useState, useEffect } from "react";
import axios from "axios";
import Storage from '../../tokenStorage.js';
import { confirm } from "react-confirm-box";
import {
    AdminContainer,
    AdminH1,
    AdminH1_5,
    AdminWrapper,
} from "./AdminElements";
import {
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    Button
} from "./AdminAddInventoryElements";
import { AdminCard, AdminH2, AdminP, FormButtonDelete } from "./AdminAddInventoryElements";
import {GuestEmptyWarn} from "../Guest/GuestElements";

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

    const revert = async => {
        // document.getElementById("formBox").style.display = "grid";
        // document.getElementById("searchResults").style.display = "none";
    }

    const doSearch = async => {
        if (Search.value === '') {
            setMessage("Input Room that needs to be searched...");
            setSR([]);
        }
        else {
            setMessage('Getting User Information...');
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
            } else {
                setMessage("");
                // document.getElementById("formBox").style.display = "none";
                // document.getElementById("searchResults").style.display = "block";
            }
        }
    }

    //Hoe the Searched guest looks
    const AdminCardComponent = (props) => {

        const coGuest = async event => {
            const result = await confirm(`Are you sure you would like to check out user ${props.name}?`, {labels: {
                    confirmable: "Check Out",
                    cancellable: "Cancel"
                }});
            if (result) {
                
                var configA = {
                    method: "delete",
                    url: bp.buildPath("api/account/" + props.id),
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": Token
                    }
                };

                axios(configA).then(function (response) {
                    var ud = response.data;
                    if (ud.err_code) {
                        setMessage(ud.description);
                        setSR([]);
                    } 
                }).catch(function (error) {
                    setMessage(' ' + error);
                });

                console.log("You click yes!");
                return;
            }
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
                <FormButtonDelete class="button" onClick={coGuest}>
                    Check Out
                </FormButtonDelete>
            </AdminCard>
        );
    };

    return (
        <AdminContainer>
            <Form action="#" id="formBox">
                <FormH1>Check Out Guest</FormH1>
                <FormLabel htmlFor="for">Search Room</FormLabel>
                <FormInput type="name" ref={(c) => Search = c} />
                <FormLabel>{message}</FormLabel>
                <FormButton onClick={doSearch}>Search</FormButton>
            </Form>
            <div id="searchResults">
                <AdminH1_5>Search Results</AdminH1_5>
                {/*<Button onClick={revert}>‹ Back</Button>*/}
                <AdminP>{messageR}</AdminP>
                { (SR.length === 0) ? <GuestEmptyWarn>No results.</GuestEmptyWarn> : null }
                <AdminWrapper>
                    {
                        SR.map(itm =>
                            <AdminCardComponent name={itm.split('#')[0]} room={itm.split('#')[4]} username={itm.split('#')[3]} email={itm.split('#')[1]} phone={itm.split('#')[2]} checkin={itm.split('#')[6]} checkout={itm.split('#')[7]} id={itm.split('#')[5]} />
                        )
                    }
                </AdminWrapper>
            </div>
        </AdminContainer>
    );
};

export default CheckOut;
