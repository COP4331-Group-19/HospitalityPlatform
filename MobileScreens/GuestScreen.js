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
    const [message, setMessage] = useState(null);

    var check = 0;

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
                }
            } catch (e) {
                setMessage(' ' + e.message);
            }
        }
        getInv();
    }, [check]);

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
            </ImageBackground>

        </View>
    );
}

//Services Screen
function ServicesScreen({ navigation }) {
    var ItemsArray = [];
    const [message, setMessage] = useState(null);
    const [Inv, setInv] = useState([]);

    var check = 0;
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
    }, [check]);

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
                setOrdErr('You cant order Nothing');
            }

        }
        return (
            <View style={{ backgroundImage: `url(${props.img})`, backgroundPosition: "center" }}>
                <Text>{props.items}</Text>
                <Text>{props.des}</Text>
                {/* <RockerButtons style={{ borderRadius: "8px 8px 0 0", marginTop: "5px" }} onClick={incIvn}>▲</RockerButtons><RockerMid>{value}</RockerMid><RockerButtons style={{ borderRadius: "0 0 8px 8px" }} onClick={decIvn}>▼</RockerButtons>
                <Button onClick={AddToOrder}> Add to Cart</Button> */}
            </View>
        );
    };


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
                <View>
                    {
                        Inv.map(itm =>
                            <GuestCardComponentInv items={itm.split("#")[0]} des={itm.split("#")[1]} img={itm.split("#")[2]} id={itm.split('#')[3]} />
                        )
                    }
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
