import React, { Component, useState } from "react";
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

//HomeScreen for Admin
function HomeScreen({ navigation }) {
  const [people, setPeople] = useState([
    { room: "101", username: "TestA", vacancy: true, key: "1" },
    { room: "102", username: "TestB", vacancy: true, key: "2" },
    { room: "103", username: " ", vacancy: false, key: "2" },
  ]);

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

        {/* List of Tasks */}
        <View style={styles.listoftasks}>
          <FlatList
            data={people}
            renderItem={({ item }) => (
              <View style={styles.Tasks}>
                <View style={styles.separator}>
                  <Text style={styles.taskinfo}> Room: {item.room} </Text>
                  <Text style={styles.taskinfo}>
                    {" "}
                    Username: {item.username} {item.vacancy}{" "}
                  </Text>
                </View>
              </View>
            )}
          />
        </View>
        {/*Break*/}
        <Text>{"\n"}</Text>
      </ImageBackground>
    </View>
  );
}

//Settings Screen
function SettingScreen({ navigation }) {
  //Logout Method

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
          <Text style={styles.topbartext}> Settings</Text>
        </View>
        {/*Break*/}
        <Text>{"\n"}</Text>
        {/* LogOut */}
        <View>
          <TouchableOpacity
            color="black"
            style={styles.LogoutButton}
            onPress={() => navigation.openDrawer()}
          >
            <Text style={styles.logouttext}>Log Out</Text>
            <Feather name="log-out" size={35} color="black" />
          </TouchableOpacity>
        </View>
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
          <Drawer.Screen name="Settings" component={SettingScreen} />
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
