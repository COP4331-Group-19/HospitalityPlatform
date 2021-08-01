import React, { Component, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import bp from '../Path.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

//HomeScreen for Guest
function HomeScreen({ navigation }) {
    //Variables
    const [Name, setName] = useState("");
    const [message, setMessage] = useState(null);
    const url = bp.buildPath("api/account");

    //UserInfo
    useEffect(() => {
        async function getUserData() {
            var Token = (await AsyncStorage.getItem('token_data')).toString();
            try {
                const response = await fetch(url, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
                var ud = JSON.parse(await response.text());
                if (ud.err_code) {
                    setMessage(ud.description + Token);
                } else {
                    var name = ud.first_name + ' ' + ud.last_name;
                    //Getting info needed for this page
                    setName(name);
                }

            } catch (e) {
                setMessage(' ' + e.message);
            }
        }
        //Calls Async Function
        getUserData();
    });


    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
            // source={require("../images/testphoto.jpg")}
            >
                {/* Navigation Bar */}
                <View style={styles.topbar}>
                    <TouchableOpacity
                        color="black"
                        style={styles.DrawerButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="align-justify" size={50} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.topbartext}> Home</Text>
                </View>
                {/*Break*/}
                <Text>{"\n"}</Text>
                {/* CheckIn */}
                <View style={styles.active}>
                    <Text style={styles.activetext}>Welcome back {Name}!</Text>
                </View>
                <Text style={styles.activetext}>{message}</Text>
            </ImageBackground>
        </View>
    );
}

//Profile Screen
function ProfileScreen({ navigation }) {
    const [message, setMessage] = useState(null);
    const [FirstName, setFName] = useState(null);
    const [LastName, setLName] = useState(null);
    const [PhoneNumber, setPNumber] = useState(null);
    const [Email, setEmail] = useState(null);
    const [UserName, setUName] = useState(null);
    const [Password, setPass] = useState(null);
    //Getting user Info
    const urlA = bp.buildPath("api/account");

    useEffect(() => {
        async function getUserData() {
            var Token = (await AsyncStorage.getItem('token_data')).toString();
            const response = await fetch(urlA, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
            //Get user info everytime we lode the page
            try {

                var ud = JSON.parse(await response.text());

                //Getting info needed for this page
                setFName(ud.first_name);
                setLName(ud.last_name);
                setPNumber(ud.phone);
                setEmail(ud.email);
                setUName(ud.username);
                setPass(ud.password);
            } catch (e) {
                setMessage(' ' + e.message);
            }
        }
        getUserData();
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
            // source={require("../images/testphoto.jpg")}
            >
                {/* Navigation Bar */}
                <View style={styles.topbar}>
                    <TouchableOpacity
                        color="black"
                        style={styles.DrawerButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="align-justify" size={50} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.topbartext}> Profile</Text>
                </View>
                {/*Break*/}
                <Text>{"\n"}</Text>
                <Text style={styles.ProfileInfo}>{message}</Text>
                <View style={styles.Profile}>
                    <Text style={styles.ProfileInfo}>First Name: {FirstName}</Text>
                    <Text style={styles.ProfileInfo}>Last Name: {LastName}</Text>
                    <Text style={styles.ProfileInfo}>Phone Number: {PhoneNumber}</Text>
                    <Text style={styles.ProfileInfo}>Email: {Email}</Text>
                    <Text style={styles.ProfileInfo}>Username: {UserName}</Text>
                    <Text style={styles.ProfileInfo}>Password: {Password}</Text>
                </View>
            </ImageBackground>
        </View >
    );
}

//Pending Order Screen
function PendingOrderScreen({ navigation }) {

    var ItemsArray = [];
    let ItemsDB = {};
    const [message, setMessage] = useState(null);
    const [WO, setWO] = useState([]);

    const urlI = bp.buildPath("api/inventory");
    const urlWO = bp.buildPath("api/room");
    useEffect(() => {
        //Geting Ivnentory Items
        async function getInv() {
            var Token = (await AsyncStorage.getItem('token_data')).toString();
            const response = await fetch(urlI, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
            try {
                var ud = JSON.parse(await response.text());
                for (var i = 0; i < ud.length; i++) {
                    ItemsDB[ud[i].item_id.toString()] = {
                        "name": ud[i].name,
                    }
                }
            } catch (e) {
                setMessage(' ' + e.message);
            }
        }
        getInv();

        //Getting Room orders
        async function getWOrder() {
            var Token = (await AsyncStorage.getItem('token_data')).toString();
            const response = await fetch(urlWO, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
            try {
                let itemID;
                let itemObj;
                var res = JSON.parse(await response.text());
                var ud = res.orders;
                for (let i = 0; i < ud.length; i++) {
                    itemID = ud[i].item_id.toString();
                    let a = 0;
                    if(itemID === -1){
                        a++;
                        setMessage(a);
                    }
                    itemObj = ItemsDB[itemID];
                    // Deleted item = is invalid.
                    if (typeof itemObj === "undefined")
                        continue;
                    setWO(item => [...item, itemObj.name + '#' + ud[i].quantity + '#' + ud[i].order_id]);
                }
            } catch (e) {
                setMessage(' ' + e.message);
            }
        }
        getWOrder();

    }, []);

    const WOrderList = (props) => {

        return (
            <View style={styles.Tasks}>
                <View style={styles.separator}>
                    <Text style={styles.taskinfo}>{" "}Order: {props.quantity} {props.name}{" "}</Text>
                </View>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
            // source={require("../images/testphoto.jpg")}
            >
                {/* Navigation Bar */}
                <View style={styles.topbar}>
                    <TouchableOpacity
                        color="black"
                        style={styles.DrawerButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="align-justify" size={50} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.topbartext}> Pending Orders</Text>

                </View>
                {/*Break*/}
                <Text>{"\n"}</Text>
                <View style={styles.listoftasks}>
                    <Text style={styles.title}>Orders You Are Waiting On...</Text>
                    <Text style={{ color: 'red' }}>{message}</Text>
                    <ScrollView style={{ height: '70%' }}>
                        {
                            WO.map(itm =>
                                <WOrderList key={itm.split('#')[2]} name={itm.split('#')[0]} quantity={itm.split('#')[1]} order={itm.split('#')[2]} />
                            )
                        }
                    </ScrollView>
                </View>
            </ImageBackground>

        </View>
    );
}

//Services Screen
function ServicesScreen({ navigation }) {
    var ItemsArray = [];
    const [message, setMessage] = useState(null);
    const [Inv, setInv] = useState([]);
    const [Ord, setOrd] = useState([]);
    //INVENTORY
    const urlI = bp.buildPath("api/inventory");
    useEffect(() => {
        async function getInv() {
            var Token = (await AsyncStorage.getItem('token_data')).toString();
            const response = await fetch(urlI, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
            try {
                var ud = JSON.parse(await response.text());
                for (var i = 0; i < ud.length; i++) {
                    ItemsArray[i] = ud[i].name + '#' + ud[i].description + '#' + ud[i].img + '#' + ud[i].item_id;
                    setInv(item => [...item, ud[i].name + '#' + ud[i].description + '#' + ud[i].img + '#' + ud[i].item_id]);
                }
            } catch (e) {
                setMessage(' ' + e.message);
            }
        }
        getInv();
    }, []);

    const GuestCardComponentInv = (props) => {
        const [value, setValue] = useState(0);
        const decIvn = async event => {
            setValue(value - 1);
            if (value === 0) {
                setValue(0);
            }
        }
        const incIvn = async event => {
            setValue(value + 1);
        }
        const AddToOrder = async event => {
            if (value !== 0) {
                setOrd(item => [...item, props.items + "#" + props.des + "#" + props.img + "#" + props.id + '#' + value]);
            }
            else {
                setMessage('You cant order Nothing');
            }
        }
        return (
            <View style={styles.Tasks}>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        color="black"
                        style={styles.claimButton}
                        onPress={incIvn}
                    >
                        <Text style={styles.taskinfo}>+</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.taskinfo}>{props.items}</Text>
                        <Text style={styles.taskinfo}>{value}</Text>
                    </View>
                    <TouchableOpacity
                        color="black"
                        style={styles.claimButton}
                        onPress={decIvn}
                    >
                        <Text style={styles.taskinfo}>-</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    color="black"
                    style={styles.claimButton}
                    onPress={AddToOrder}
                >
                    <Text style={styles.taskinfo}>Add To Cart</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const GuestCardComponentOrd = (props) => {

        return (
            <View style={styles.Tasks}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.taskinfo}>{" "}{props.quantity}{" "}</Text>
                    <Text style={styles.taskinfo}>{props.items}</Text>
                </View>
            </View>
        );
    };

    const Order = async => {
        async function order() {
            for (let i = 0; i < Ord.length; i++) {
                var Token = (await AsyncStorage.getItem('token_data')).toString();
                const urlO = bp.buildPath("api/inventory/" + Ord[i].split('#')[3] + "/" + Ord[i].split('#')[4])
                try {
                    const response = await fetch(urlO, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
                    var O = JSON.parse(await response.text());
                    if (O.err_code) {
                        setMessage(' ' + O.description);
                        i = Ord.length;
                    } else {
                        setMessage("All Things Ordered");
                        setOrd([]);
                    }
                } catch (e) {
                    setMessage(' ' + e.message);
                }
            }
        }
        order();
    }

    const Cancel = async => {
        setOrd([]);
        setMessage('Cancel');
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.backgroundImage}
            // source={require("../images/testphoto.jpg")}
            >
                {/* Navigation Bar */}
                <View style={styles.topbar}>
                    <TouchableOpacity
                        color="black"
                        style={styles.DrawerButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="align-justify" size={50} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.topbartext}> Services</Text>
                </View>
                {/*Break*/}
                <Text>{"\n"}</Text>
                <View style={styles.listoftasks}>
                    <Text style={{ color: 'red' }}>{message}</Text>
                    <TouchableOpacity
                        color="black"
                        style={styles.EditButton}
                        onPress={Order}
                    >
                        <Text>Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        color="black"
                        style={styles.EditButton}
                        onPress={Cancel}
                    >
                        <Text>Clear Cart</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Cart</Text>
                    <ScrollView style={{ height: '30%' }}>
                        {
                            Ord.map(itm =>
                                <GuestCardComponentOrd key={itm.split('#')[3]} items={itm.split("#")[0]} id={itm.split('#')[3]} quantity={itm.split('#')[4]} />
                            )
                        }
                    </ScrollView>
                    <Text style={styles.title}>Menu</Text>
                    <ScrollView style={{ height: '70%' }}>
                        {
                            Inv.map(itm =>
                                <GuestCardComponentInv key={itm.split('#')[3]} items={itm.split("#")[0]} id={itm.split('#')[3]} />
                            )
                        }
                    </ScrollView>
                </View>

            </ImageBackground>

        </View>
    );
}

//Drawer
const Drawer = createDrawerNavigator();

//Actual Screen
export default class GuestScreen extends Component {
    //Message
    constructor() {
        super();
        this.state = {
            message: " ",
        };
    }

    //Login Screen
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator
                    initialRouteName="Home"
                    drawerType="slide"
                    drawerStyle={styles.Drawer}
                    drawerContent={props => {
                        return (
                            <DrawerContentScrollView {...props}>
                                <DrawerItemList {...props} />
                                <DrawerItem label="Logout" onPress={this.handlerClick} />
                            </DrawerContentScrollView>
                        );
                    }}
                >
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Profile" component={ProfileScreen} />
                    <Drawer.Screen name="Services" component={ServicesScreen} />
                    <Drawer.Screen name="Pending Orders" component={PendingOrderScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }

    handlerClick = () => {
        try {
            this.props.navigation.navigate('Login');
        } catch (e) {
            this.setState({ message: e.message });
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: "#3D3D3D",
        opacity: 1,
    },
    Drawer: {
        backgroundColor: "#14CCA4",
        fontSize: 50,
        color: "red",
    },
    topbar: {
        flexDirection: "row",
        backgroundColor: "#14CCA4",
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        paddingTop: 20,
        elevation: 11,
    },
    topbartext: {
        fontSize: 40,
        color: "black",
    },
    LogoutButton: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#BC3908",
        width: "100%",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    logouttext: {
        color: "black",
        fontSize: 25,
    },
    active: {
        backgroundColor: "#6D7275",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        borderRadius: 10,
        padding: 100,
        width: "99%",
        opacity: 1,
    },
    activetext: {
        fontSize: 30,
        color: "white",
    },
    ActiveButton: {
        backgroundColor: "#14CCA4",
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    activebuttontext: {
        fontSize: 30,
        padding: 5,
        color: "black",
    },
    Profile: {
        backgroundColor: "#6D7275",
        borderRadius: 5,
        padding: 10,
        width: "99%",
        opacity: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    ProfileInfo: {
        fontSize: 30,
        color: "white",
    },
    EditButton: {
        flexDirection: "row",
        backgroundColor: "#BC3908",
        alignContent: "center",
        justifyContent: "center",
        width: "30%",
        borderRadius: 5,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    editbuttontext: {
        fontSize: 30,
        color: "black",
    },
    BreakButton: {
        backgroundColor: "#14CCA4",
        padding: 10,
        flexDirection: "row",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    breaktext: {
        fontSize: 30,
    },
    listoftasks: {
        maxHeight: "70%",
        width: "80%",
    },
    Tasks: {
        padding: 0,
        borderRadius: 1,
        backgroundColor: "white",
        borderColor: "#6D7275",
        borderWidth: 10,
    },
    separator: {
        flex: 1,
        borderWidth: 2,
        borderColor: "black",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    taskinfo: {
        fontSize: 30,
    },
    claimButton: {
        backgroundColor: "#14CCA4",
        padding: 10,
        flexDirection: "row",
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    title: {
        fontSize: 25,
        color: 'green'
    }
});
