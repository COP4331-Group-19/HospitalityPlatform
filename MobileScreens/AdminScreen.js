import React, { Component, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    FlatList,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerItems } from "react-navigation-drawer";
import { withTheme } from "react-native-elements";
import Storage from '../tokenStorage.js';
import bp from '../Path.js';
import { measure } from "react-native-reanimated";

//HomeScreen for Admin
function HomeScreen({ navigation }) {
    //Room Details
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState(null);
    const [roomP, setRoomP] = useState([]);
    var Token = Storage.retrieveToken();
    // var Search;

    // const changeSearch = async (val) => {
    //     Search = val;
    // }
    // const doSearch = async event => {
    //     if(Search === ''){
    //         for(let i = 0; i < rooms.length; i++){
    //             setRoomP(items=> [...items, rooms[i]]);
    //         }
            
    //     } 
    // }
    const urlAA = bp.buildPath("api/account/all");
    useEffect(async () => {
        try {
            const response = await fetch(urlAA, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
            var user = JSON.parse(await response.text());

            var RPF = 4;
            var TF = 3;
            var room;
            var int;
            var check = 0;

            for (let j = 0; j < (RPF * TF); j++) {
                int = j / RPF;
                int = parseInt(int) + 1;
                room = (100 * int) + (j % RPF);
                for (let i = 0; i < user.length; i++) {
                    if (user[i].role === 'guest') {
                        if (user[i].room === room.toString()) {
                            setRooms(items => [...items, user[i].first_name + ' ' + user[i].last_name + '#' + room]);
                            check = 1;
                            continue;
                        } 
                    }
                }
                if(check === 0){
                    setRooms(items => [...items, "-------" + '#' + room]);
                }
                check = 0;
                
            }
        } catch (e) {
            setMessage(' ' + e.message);
        }
    }, []);
    const RoomComponent = (props) => {
        return (
            <View style={styles.Tasks}>
                <View style={styles.separator}>
                    <Text style={styles.taskinfo}> Room: {props.room} </Text>
                    <Text style={styles.taskinfo}>{" "}Username: {props.username}{" "}</Text>
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
                    <Text style={styles.topbartext}> Home</Text>
                </View>
                {/*Break*/}
                <Text>{"\n"}</Text>
                <View style={styles.h1}> Room Availability</View>
                <Text>{"\n"}</Text>
                <Text>{message}</Text>
                {/* List of Tasks */}
                <View style={styles.listoftasks}>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <TextInput
                            style={styles.activetext}
                            placeholder="Search"
                            onChangeText={(val) => { changeSearch(val) }}
                        />
                        <TouchableOpacity
                            color="black"
                            title="LOGIN"
                            onPress={doSearch}
                            style={{ backgroundColor: 'white' }}
                        >
                            <Text>Search</Text>
                        </TouchableOpacity>
                    </View> */}
                    <View>
                        {
                            rooms.map(rm =>
                                <RoomComponent room={rm.split('#')[0]} username={rm.split('#')[1]} />
                            )
                        }
                    </View>
                </View>
                {/*Break*/}
                <Text>{"\n"}</Text>
            </ImageBackground>
        </View>
    );
}

//Profile
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

    useEffect(async () => {
        var Token = Storage.retrieveToken();

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
                <View style={styles.Profile}>
                    <Text style={styles.ProfileInfo}>{message}</Text>
                    <Text style={styles.ProfileInfo}>FirstName: {FirstName}</Text>
                    <Text style={styles.ProfileInfo}>LastName: {LastName}</Text>
                    <Text style={styles.ProfileInfo}>PhoneNumber: {PhoneNumber}</Text>
                    <Text style={styles.ProfileInfo}>Email: {Email}</Text>
                    <Text style={styles.ProfileInfo}>UserName: {UserName}</Text>
                    <Text style={styles.ProfileInfo}>Password: {Password}</Text>
                    <Text style={{ color: "blue" }}>(*editing user info feature is only available for website)</Text>
                </View>
            </ImageBackground>
        </View >
    );
}

//Drawer
const Drawer = createDrawerNavigator();

//Actual Screen
export default class AdminScreen extends Component {
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
                    initialRouteName="Tasks"
                    drawerType="slide"
                    drawerStyle={styles.Drawer}
                >
                    <Drawer.Screen name="Home" component={HomeScreen} />
                    <Drawer.Screen name="Profile" component={ProfileScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }

    handlerClick = async () => {
        try {
            this.props.navigation.navigate("Login");
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
        backgroundColor: "#3D3D3D",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: "#3D3D3D",
        opacity: 1,
    },
    h1: {
        color: "white",
        fontSize: 30,
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
        borderColor: "#black",
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
});
