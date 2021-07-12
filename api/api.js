const jwt = require('jsonwebtoken');
const authn = require('./authn');
const bcrypt = require("bcrypt");

exports.setApp = function (app, db_client) {

// Account Endpoints
// Register                      v only admin can create reservations!
app.post("/api/account/create", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
    const {username, first_name, last_name, email, phone, role, checkin, checkout, room} = req.body;
    const db = db_client.db();
    const results = await
        // search if username already exists
        db.collection('Accounts').find({
            $or: [
                { Login: username },
                { Email: email },
                { PhoneNumber: phone }
            ]
        }).toArray();
    console.log(results);
    if (results.length > 0) {
        return res.status(400).json(errGen(400, "Username, Email, or Phone Number Taken"));
    } else {
        let newUser = {
            AccountType: role,
            Login: username,
            // Use plain-text mode to make sure session lifetimes are shortened.
            // As soon as the password is changed, users should re-log.
            Password: "",
            FirstName: first_name,
            LastName: last_name,
            Email: email,
            PhoneNumber: phone,
            RoomNumber: room,
            CheckInDate: checkin,
            CheckOutDate: checkout,
            UserID: await getNextSequence(db, "userid")
        };
        let createAction = await db.collection('Accounts').insertOne(newUser);

        // Send SMS to get user to create account.
        if (global.twilio) {
            const hotelInfo = await db.collection('Hotel_Detail').find({}).toArray();
            // Create shortlink via Senko
            let url = `${INSTANCE_URL}/register?username=${username}`;
            if (process.env.SHORTLINK_KEY) {
                url = createShortlink(url);
            }
            // Send the link
            let message = `Hello, ${first_name}! You are almost ready to stay at ${hotelInfo[0].Name}! Please visit ${url} to create your account.`;
            global.twilio.messages
                .create({
                    body: message,
                    from: '+14073052775',
                    to: '+1' + phone
                });
        }
        let user_data_api_compliant = accountGen(createAction.ops[0]);
        delete user_data_api_compliant.password;
        return res.status(200).json(user_data_api_compliant);
    }
})

// List all accounts.
app.get("/api/account/all", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
    const db = db_client.db();
    const results = await
        db.collection('Accounts').find({}).toArray();
    let formatted = []
    for (let i = 0; i < results.length; i++) {
        formatted[i] = accountGen(results[i]);
        delete formatted[i].password;
    }
    return res.status(200).json(formatted);
})

// Login
app.post("/api/account/login", async (req, res, next) => {
    // grab login and password from request
    const {username, password} = req.body;
    let lifetime = 10800000;
    let is_plaintext_mode = false;

    const db = db_client.db();
    // Once createAccount has been implemented, we should instead search for
    //      only the login and verify the password with bcrypt.
    const results = await
        db.collection('Accounts').find({Login: username}).toArray();

    if (results.length > 0) {
        // Substantially neuter the token lifetime if logging in via "plain-text mode"
        if (results[0].Password !== "$" && results[0].Password.length !== 60) {
            lifetime = 600000;
            is_plaintext_mode = true;
        }

        let acc = results[0].AccountType;
        let id = results[0].UserID;

        if (is_plaintext_mode) {
            // CRY!
            if (results[0].Password === password) {
                const token = jwt.sign({
                    'username': username,
                    'role': acc.toLowerCase(),
                    'id': id,
                    'login-ref': "first_access"
                }, process.env.JWT_SECRET, {expiresIn: lifetime});
                res.cookie('session', 'Bearer ' + token, {expire: lifetime + Date.now()});
                return res.status(200).json({
                    // https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
                    "token": "Bearer " + token,
                    "notice": "Please change your password immediately using PATCH /account/"
                });
            } else {
                return res.status(401).json(errGen(401));
            }
        } else {
            bcrypt.compare(password, results[0].Password, (err, result) => {
                // If hash works, let it through
                if (result) {
                    const token = jwt.sign({
                        'username': username,
                        'role': acc.toLowerCase(),
                        'id': id,
                        'login-ref': "password"
                    }, process.env.JWT_SECRET, {expiresIn: lifetime});
                    res.cookie('session', 'Bearer ' + token, {expire: lifetime + Date.now()});
                    return res.status(200).json({
                        // https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
                        "token": "Bearer " + token
                    });
                } else {
                    return res.status(401).json(errGen(401));
                }
            });
        }
    } else return res.status(401).json(errGen(401));
})

// Get account data.
app.get("/api/account/", authn.isAuthorized, async (req, res, next) => {
    const db = db_client.db();
    const results = await
        db.collection('Accounts').find({Login: req.user.username}).toArray();
    let accountData = accountGen(results[0]);
    // We don't want to return the password lol
    delete accountData.password;
    return res.status(200).json(accountData);
});

// Get account data.
app.get("/api/account/letmein/:phone", async (req, res, next) => {
    // Send SMS to get user to create account.
    if (global.twilio) {
        const db = db_client.db();
        const results = await
            db.collection('Accounts').find({PhoneNumber: req.params.phone}).toArray();

        // If the phone number exists, silently fail.
        if (results.length <= 0)
            return res.status(200).json(errGen(200, "We have sent the phone number on file a password reset request."));
        else
            // If it does work, we NEED to send it at the SAME TIME as the failure, or else a hacker can use this to test for accounts.
            res.status(200).json(errGen(200, "We have sent the phone number on file a password reset request."));

        let accountData = accountGen(results[0]);

        // Create JWT that will last a half-hour.
        let lifetime = 1800000;
        const token = jwt.sign({
            'username': accountData.username,
            'role': accountData.role,
            'id': accountData.user_id,
            'login-ref': "password_reset"
        }, process.env.JWT_SECRET, {expiresIn: lifetime});

        let url = `${INSTANCE_URL}/resetPassword?token=${token}`;
        if (process.env.SHORTLINK_KEY) {
            url = createShortlink(url);
        }


        const hotelInfo = await db.collection('Hotel_Detail').find({}).toArray();

        // Send the link
        let message = `Hello, ${accountData.first_name}! We have received a password request for your account at ${hotelInfo[0].Name}. `
            + `Visit ${url} in the next thirty minutes to reset it, or do nothing and your password will not be changed.`;
        global.twilio.messages
            .create({
                body: message,
                from: '+14073052775',
                to: '+1' + accountData.phone
            });
    } else {
        return res.status(501).json("This server is not configured to allow password resets.");
    }
});

app.patch("/api/account/", authn.isAuthorized, async (req, res, next) => {
    const db = db_client.db();

    const body = req.body;

    // A user should not change these properties (even if priv'd):
    delete body.user_id;
    delete body.role;
    delete body.checkin;
    delete body.checkout;
    delete body.room;

    if (body.password) {
        // Change password.
        body.password = await hashPassword(body.password);
    }

    let databaseIfy = backwardsAccountGen(body);

    await db_client.db().collection('Accounts').findOneAndUpdate({Login: req.user.username}, {$set: databaseIfy});
    // Note: this is not as runtime-efficient as the inventory PATCH, just because of the extra DB call.
    // However, it's a lot more readable, so consider the trade-offs there.
    const results = await db.collection('Accounts').find({Login: req.user.username}).toArray();
    let accountData = accountGen(results[0]);
    // We don't want to return the password lol
    delete accountData.password;
    return res.status(200).json(accountData);
});

// Admin Endpoints
// Get room information by room Number
app.get("/api/room/:room_id", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
  const db = db_client.db();
  const results = await
      // search if username already exists
      db.collection('Room').find({RoomID: req.params.room_id}).toArray();
      console.log(results);
  if (results.length > 0) {
    let roomData = roomGen(results[0]);
    return res.status(200).json(roomData);
  }
  else
    return res.status(404).json(errGen(404, "Room Not Found"));
})
// Create room with given room number, if it does not yet exist
app.post("/api/room/:room_id", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
  const { floor } = req.body;
  const room_id = req.params.room_id;
  const db = db_client.db();
  const results = await
      // search if username already exists
      db.collection('Room').find({RoomID:room_id}).toArray();
      console.log(results);
  if (results.length > 0) {
      return res.status(400).json(errGen(400, "Room Occupied"));
  }
  else {
      let newRoom = {
          RoomID: room_id,
          Floor: floor,
          Orders: [],
          Occupant: -1
      };
      let createAction = await db.collection('Room').insertOne(newRoom);

      return res.status(200).json(roomGen(createAction.ops[0]));
  }
})
// Edit a preexisting room
app.patch("/api/room/:room_id", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {

})
// Delete a room
app.delete("/api/room/:room_id", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
  const db = db_client.db();
  const results = await
      // search if username already exists
      db.collection('Room').find({RoomID: req.params.room_id}).toArray();
      console.log(results);
  if (results.length > 0) {
    db.collection('Room').deleteOne({RoomID: req.params.room_id});

    return res.status(200).json(errGen(200));
  }
  else
    return res.status(404).json(errGen(404, "Room Not Found"));
})
// Get all rooms on a given floor
app.get("/api/floor/:floor_number", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
  const db = db_client.db();
  const results = await
      // search if username already exists
      db.collection('Room').find({Floor: Number(req.params.floor_number)}).toArray();
      console.log(results);
  if (results.length > 0) {
    let floorData = [];
    for (let i = 0; i < results.length; i++)
    floorData[i] = roomGen(results[i]);
    return res.status(200).json(floorData);
  }
  else
    return res.status(404).json(errGen(404, "No Rooms on this Floor"));
})

// List all Items from Inventory
app.get("/api/inventory", authn.isAuthorized, async (req, res, next) => {
    const db = db_client.db();
    const results = await
        db.collection('Inventory').find({}).toArray();
    let formatted = []
    for (let i = 0; i < results.length; i++) {
        formatted[i] = inventoryGen(results[i]);
    }
    return res.status(200).json(formatted);
})
// Add Item to Inventory
app.post("/api/inventory", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
    // Admin guard: authn.isAdmin. Requires isAuthorized to be called FIRST; Order matters a lot here!
    // Can be replaced with isStaff to check if an endpoint is available for staff and admin (not guest).

    let {name, description, img, quantity} = req.body;
    if (!name) return res.status(403).json(errGen(403, 'Missing "name" field in request.'));
    if (!description) description = "";
    if (!img) img = "";
    if (!quantity) quantity = -1;

    const db = db_client.db();

    // What will end up in the DB, sans item ID.
    const obj = {
        // The await is VERY important.
        "Item_ID": await getNextSequence(db, "itemid"),
        "Name": name,
        "Description": description,
        "IMG": img,
        "Quantity": quantity
    };

    // Insert, format, and then return.
    db.collection('Inventory').insertOne(obj).then((out) => {
        const results = out.ops[0];
        return res.status(200).json(inventoryGen(results));
    }).catch((err) => {
        return res.status(500).json(errGen(500, err));
    });
})
// Delete Item from Inventory
app.delete("/api/inventory/:inventory_id", [authn.isAuthorized, authn.isAdmin], async (req, res, next) => {
    let inventory_id = req.params.inventory_id;
    try {
        inventory_id = Number(inventory_id);
        if (isNaN(inventory_id))
            return res.status(400).json(errGen(400, "Invalid item ID."));
    } catch (err) {
        // If we can't cast a number
        return res.status(400, "Invalid item ID.");
    }
    db_client.db().collection('Inventory').deleteOne({Item_ID: inventory_id}).then((out) => {
        if (out.deletedCount === 0)
            return res.status(200).json(errGen(200, "No items deleted."));
        return res.status(200).json(errGen(200, "Item successfully deleted."));
    }).catch((err) => {
        return res.status(500).json(errGen(500, err));
    });
});
//
app.patch("/api/inventory/:inventory_id", [authn.isAuthorized, authn.isStaff], async (req, res, next) => {
    // Get inventory ID and validate it is, indeed, a number.
    let inventory_id = req.params.inventory_id;
    try {
        inventory_id = Number(inventory_id);
        if (isNaN(inventory_id))
            return res.status(400).json(errGen(400, "Invalid item ID."));
    } catch (err) {
        // If we can't cast a number
        return res.status(400, "Invalid item ID.");
    }

    const {name, quantity, description, img} = req.body;
    let newObj = {}
    // Properties staff AND admin can edit.
    if (quantity) newObj.Quantity = quantity;
    // Properties ONLY admin can edit.
    if (req.user.role === "admin") {
        if (name) newObj.Name = name;
        if (description) newObj.Description = description;
        if (img) newObj.IMG = img;
    }

    // This is a good candidate for refactoring. See PATCH /account/ for a good(???) example.
    db_client.db().collection('Inventory').findOneAndUpdate({Item_ID: inventory_id}, {$set: newObj})
        .then((out) => {
            // crappy union
            if (newObj.Quantity) out.value.Quantity = newObj.Quantity;
            if (newObj.Name) out.value.Name = newObj.Name;
            if (newObj.Description) out.value.Description = newObj.Description;
            if (newObj.IMG) out.value.IMG = newObj.IMG;

            return res.status(200).json(inventoryGen(out.value));
        })
        .catch((err) => {
            if (err.toString() === "TypeError: Cannot read property 'Item_ID' of null")
                return res.status(500).json(errGen(500, "Entity does not exist."));
            return res.status(500).json(errGen(500, err.toString()));
        });
});

// Guest Endpoints
// Get Current Room Information
app.get("/api/room/:room_id", authn.isAuthorized, async (req, res, next) => {
    let room_id = req.params.room_id;
    const db = db_client.db();
    const results = await
        db.collection('Room').find({RoomID: room_id}).toArray()
    let formatted = []
    formatted[0] = roomGen(results[0])
    return res.status(200).json(formatted)
});

// Orders an inventory item to a user's room

// Get information on a specific inventory entry
app.get("/api/inventory/:inventory_id", authn.isAuthorized, async (req, res, next) => {
    let inventory_id = req.params.inventory_id
    try {
        inventory_id = Number(inventory_id);
        if (isNaN(inventory_id))
            return res.status(400).json(errGen(400, "Invalid item ID."));
    } catch (err) {
        // If we can't cast a number
        return res.status(400, "Invalid item ID.");
    }
    const db = db_client.db()
    const results = await
        db.collection('Inventory').find({Item_ID: inventory_id}).toArray();
    if (results.length > 0) {
        let formatted = inventoryGen(results[0]);
        return res.status(200).json(formatted);
    } else
        return res.status(404).json(errGen(404, "Asset not found"))
});

// Yeah, everyone can see this (regardless of authn state)
app.use('/api/hotel', async (req, res, next) => {
    var error = '';

    const db = db_client.db();
    const results = await db.collection('Hotel_Detail').find({}).toArray();

    if (results.length > 0) {
        return res.status(200).json({
            "name": results[0].Name,
            "color": results[0].Color,
            "bkgd": results[0].Background,
            "desc": results[0].Description
        })
    } else {
        return res.status(500).json(errGen(500, "Hotel is AWOL."));
    }
});

// bcrypt hash password function for POST/api/createAcc
const hashPassword = async (password, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        // hash password
        return await bcrypt.hash(password, salt)
    } catch (err) {
        console.log(err);
    }
    // return null if error
    return null
}

}
