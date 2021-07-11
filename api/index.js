// Init
var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;
var path = require('path');
var cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());


// const request = require("request");
const async = require("async");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.JWT_SECRET) {
    console.error("[ERROR] Environment variables are not set!");
    console.debug(`[DEBUG] JWT_SECRET=${process.env.DB_USERNAME}`);
    console.debug(`[DEBUG] DB_USERNAME=${process.env.DB_USERNAME}`);
    try {
        console.debug(`[DEBUG] DB_PASSWORD=${(process.env.DB_PASSWORD).substring(0, 3)}**********`);
    } catch(err) {
        console.debug(`[DEBUG] DB_PASSWORD=(null)`);
    }
}
// security guard
if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 40) {
    console.error("[WARNING] The JWT secret defined is not secure enough! If the secret is guessable, you might as well not have passwords! Remedy this ASAP.");
}

// Note: make sure you authenticate correctly!
    const MongoClient = require('mongodb').MongoClient;
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qaihg.mongodb.net/HotelManagement?retryWrites=true&w=majority`;
    const db_client = new MongoClient(uri, { useNewUrlParser: true });
    db_client.connect().then((client) => {
        console.log("[HospitalityPlatform] MongoDB connected!");
    });

console.log(`[HospitalityPlatform] Server running on port ${port}`);

// DB schema -> API schema converters.
global.accountGen = (dbObj) => {
    return {
        "user_id": dbObj.UserID,
        "role": dbObj.AccountType.toLowerCase(),
        "checkin": dbObj.CheckInDate,
        "checkout": dbObj.CheckOutDate,
        "room": dbObj.RoomNumber,
        "username": dbObj.Login,
        "password": "**********",
        "first_name": dbObj.FirstName,
        "last_name": dbObj.LastName,
        "email": dbObj.Email,
        "phone": dbObj.PhoneNumber
    }
}
global.backwardsAccountGen = (apiObj) => {
    let tmp = {};
    if (apiObj.user_id) tmp.UserID = apiObj.user_id;
    if (apiObj.checkin) tmp.CheckInDate = apiObj.checkin;
    if (apiObj.checkout) tmp.CheckOutDate = apiObj.checkout;
    if (apiObj.room) tmp.RoomNumber = apiObj.room;
    if (apiObj.username) tmp.Login = apiObj.username;
    if (apiObj.password) tmp.Password = "(bcrypt hash)";
    if (apiObj.first_name) tmp.FirstName = apiObj.first_name;
    if (apiObj.last_name) tmp.LastName = apiObj.last_name;
    if (apiObj.email) tmp.Email = apiObj.email;
    if (apiObj.phone) tmp.PhoneNumber = apiObj.phone;
    if (apiObj.role) tmp.AccountType = apiObj.role.toLowerCase();
    return tmp;
}
global.inventoryGen = (dbObj) => {
    return {
        "item_id": dbObj.Item_ID,
        "name": dbObj.Name,
        "description": dbObj.Description,
        "img": dbObj.IMG,
        "quantity": dbObj.Quantity
    }
}
global.orderGen = (dbObj) => {
    return {
        "order_id": dbObj.OrderID,
        "room_id": dbObj.RoomID,
        "staff": dbObj.Staff,
        "item_id": dbObj.ItemID,
        "quantity": dbObj.Quantity,
        "guest": dbObj.Guest
    }
}
global.roomGen = (dbObj) => {
    let apiObj = {
        "room_id": dbObj.RoomID,
        "occupant": dbObj.Occupant,
        "floor": dbObj.Floor,
        "orders": []
    }
    for (let i = 0; i < dbObj.Orders.length; i++) {
        apiObj.orders[i] = orderGen(dbObj.Orders[i]);
    }
    return apiObj;
}

// Create API-compliant error objects.
global.errGen = (errCode, str) => {
    let desc;
    if (!str) {
        if (errCode == 400) desc = "Asset already exists.";
        else if (errCode == 401) desc = "You are not logged in.";
        else if (errCode == 403) desc = "You do not have permission to view this asset.";
        else if (errCode == 404) desc = "Asset not found.";
        else if (errCode >= 400 && errCode < 500) desc = "Malformed request.";
        else if (errCode >= 500 && errCode < 600) desc = "The server is having some issues. Please report this!";
        else if (errCode == 200) desc = "Success!";
        else desc = "Something bad happened."
    } else {
        desc = str;
    }
    return {
        "err_code": errCode,
        "description": desc
    }
}

// Incrementing user IDs.
// Originally from below link but probably doesn't resemble it at all after fixes:
// https://stackoverflow.com/questions/49500551/insert-a-document-while-auto-incrementing-a-sequence-field-in-mongodb
global.getNextSequence = async (db, counterName) => {
    let query = await db.collection('counters').findOneAndUpdate(
        {
            _id: counterName
        },
        {
            "$inc": {seq: 1},
        }
    ).catch(err => {
        console.error(err);
        throw err;
    });
    return query.value.seq;
}

let api = require('./api.js');
api.setApp( app, db_client );

// Web server stuff.
app.all("/", (req, res) => {
    let options = {
        root: path.join(__dirname, 'static'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.send("<h1>Hello COP4331</h1>");
})
app.all("/static/:file", (req, res) => {
    let options = {
        root: path.join(__dirname, 'static'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }
    res.sendFile(req.params.file, options);
})

app.listen(port);
