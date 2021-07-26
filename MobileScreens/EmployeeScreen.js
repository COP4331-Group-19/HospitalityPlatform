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
import { Button } from "react-native-elements/dist/buttons/Button";
import { render } from "react-dom";
import { event } from "react-native-reanimated";



//HomeScreen for Employee
function HomeScreen({ navigation }) {
  //Variables
  const [Name, setName] = useState("");
  var Token = Storage.retrieveToken()
  const [message, setMessage] = useState(null);
  const url = bp.buildPath("api/account");

  //UserInfo
  useEffect(async () => {

    const response = await fetch(url, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
    //Get user info everytime we lode the page
    try {

      var ud = JSON.parse(await response.text());

      //Getting info needed for this page
      setName(ud.first_name + " " + ud.last_name);
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
          <Text style={styles.topbartext}> Home</Text>
        </View>
        {/*Break*/}
        <Text>{"\n"}</Text>
        {/* CheckIn */}
        <View style={styles.active}>
          <Text style={styles.activetext}>Name : {Name}</Text>
          <Text style={styles.activetext}>You're logged in! Let's get to work.</Text>
          <Text style={styles.activetext}>{message}</Text>
        </View>
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

//Task Screen
function TaskScreen({ navigation }) {
  const [UC, setUC] = useState([]);
  const [C, setC] = useState([]);
  var ItemsArray = [];
  const [message, setMessage] = useState(null);

  //Variables
  var Token = Storage.retrieveToken()

  //INVENTORY
  const urlI = bp.buildPath("api/inventory");
  useEffect(async () => {
    const response = await fetch(urlI, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
    try {
      var ud = JSON.parse(await response.text());
      for (var i = 0; i < ud.length; i++) {
        ItemsArray[i] = ud[i].name + '#' + ud[i].description + '#' + ud[i].img + '#' + ud[i].item_id;
      }
    } catch (e) {
      setMessage(' ' + e.message);
    }

  }, []);
  //UNCLAIMED ORDERS
  const urlU = bp.buildPath("api/orders/unclaimed");
  useEffect(async () => {
    setUC([]);
    const response = await fetch(urlU, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
    try {
      var ud = JSON.parse(await response.text());
      if (ud.err_code) {
        setMessage(' ' + ud.description);
      }
      else {
        for (var i = 0; i < ud.length; i++) {
          for (let j = 0; j < ItemsArray.length; j++) {
            if (ud[i].item_id.toString() === ItemsArray[j].split('#')[3]) {
              setUC(item => [...item, ItemsArray[j].split('#')[0] + '#' + ud[i].quantity + '#' + ud[i].room_id + '#' + ud[i].order_id]);
            }
          }
        }
      }
    } catch (e) {
      setMessage(' ' + e.message);
    }

  }, []);
  const UCOrderList = (props) => {

    const ClaimOrd = async event => {

      const urlCO = bp.buildPath("api/orders/claim/" + props.order);
      try {
        const response = await fetch(urlCO, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
        var check = JSON.parse(await response.text());
        if (check.err_code) {
          setMessage(' ' + check.description);
        } else {
          setMessage(' Order Claimed ');
        }
      } catch (e) {
        setMessage(' ' + e.message);
      }
    };

    return (
      <View style={styles.Tasks}>
        <View style={styles.separator}>
          <Text style={styles.taskinfo}>{" "}Room: {props.room}{" "}</Text>
          <Text style={styles.taskinfo}>{" "}Order: {props.quantity} {props.name}{" "}</Text>
          <TouchableOpacity
            color="black"
            style={styles.claimButton}
            onPress={ClaimOrd}
          >
            <Text>Claim</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  //TODO ORDERS
  const urlC = bp.buildPath("api/orders/my");
  useEffect(async () => {
    setC([]);
    const response = await fetch(urlC, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
    try {
      var ud = JSON.parse(await response.text());
      if (ud.err_code) {
        setMessage(' ' + ud.description);
      }
      else {
        for (var i = 0; i < ud.length; i++) {
          for (let j = 0; j < ItemsArray.length; j++) {
            if (ud[i].item_id.toString() === ItemsArray[j].split('#')[3]) {
              setC(item => [...item, ItemsArray[j].split('#')[0] + '#' + ud[i].quantity + '#' + ud[i].room_id + '#' + ud[i].order_id]);
            }
          }
        }
      }
    } catch (e) {
      setMessage(' ' + e.message);
    }

  }, []);
  const COrderList = (props) => {

    const MarkOrder = async event => {
      const urlMO = bp.buildPath("api/orders/fulfill/" + props.order);
      try {
        const response = await fetch(urlMO, { method: 'delete', headers: { "Content-Type": "application/json", "authorization": Token } });
        var check = JSON.parse(await response.text());
        if (check.err_code) {
          setMessage(' ' + check.description);
        }
      } catch (e) {
        setMessage(' ' + e.message);
      }
    }

    return (
      <View style={styles.Tasks}>
        <View style={styles.separator}>
          <Text style={styles.taskinfo}>{" "}Room: {props.room}{" "}</Text>
          <Text style={styles.taskinfo}>{" "}Order: {props.quantity} {props.name}{" "}</Text>
          <TouchableOpacity
            color="black"
            style={styles.claimButton}
            onPress={MarkOrder}
          >
            <Text>Mark</Text>
          </TouchableOpacity>
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
          <Text style={styles.topbartext}> Orders</Text>
        </View>
        {/*Break*/}
        <Text>{"\n"}</Text>
        <Text style={{ color: 'red' }}>{message}</Text>
        {/*Break*/}
        <Text>{"\n"}</Text>
        {/* List of Tasks */}
        <View style={styles.listoftasks}>
          <Text>UNCLAIMED ORDERS</Text>
          <Text>{"\n"}</Text>
          <View>
            {
              UC.map(itm =>
                <UCOrderList name={itm.split('#')[0]} quantity={itm.split('#')[1]} room={itm.split('#')[2]} order={itm.split('#')[3]} />
              )
            }
          </View>
          <Text>TODO ORDERS</Text>
          <Text>{"\n"}</Text>
          <View>
            {
              C.map(itm =>
                <COrderList name={itm.split('#')[0]} quantity={itm.split('#')[1]} room={itm.split('#')[2]} order={itm.split('#')[3]} />
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

//Drawer
const Drawer = createDrawerNavigator();

//Actual Screen
export default class EmployeeScreen extends Component {
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
          <Drawer.Screen name="Tasks" component={TaskScreen} />
          <Drawer.Screen name="Logout" component={this.handlerClick} />
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
});
