import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import bp from '../Path.js';
import axios from 'axios';
import Storage from '../tokenStorage.js';

global.Login = "";
global.Password = "";

export default class LoginScreen extends Component {
  constructor() {
    super()
    this.state =
    {
      message: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Navigation Bar */}
        <View style={styles.topbar}>
          <TouchableOpacity
            color="black"
            style={styles.DrawerButton}
            onPress={() => navigation.openDrawer()}
          ></TouchableOpacity>
          <Text style={styles.topbartext}> Hotel Knightro</Text>
        </View>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../images/testphoto.jpg")}
        >
          {/*Break*/}
          <Text>{"\n"}</Text>
          <View style={styles.blanck}>
            <View>
              <Text style={styles.title}> Login </Text>
            </View>
            {/*Break*/}
            <Text>{"\n"}</Text>
            {/* UserName */}
            <View style={styles.login_pack}>
              <Feather name="user" size={40} color="black" />
              <TextInput
                style={styles.login}
                placeholder="UserName"
                onChangeText={(val) => {
                  this.changeLoginNameHandler(val)
                }}
              />
            </View>
            {/*Break*/}
            <Text>{"\n"}</Text>
            {/* Password */}
            <View style={styles.login_pack}>
              <Feather name="eye-off" size={40} color="black" />
              <TextInput
                style={styles.password}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(val) => {
                  this.changePasswordHandler(val)
                }}
              />
            </View>
            {/*Break*/}
            <Text>{"\n"}</Text>
            <View>
              <Text style={styles.status}>{this.state.message}</Text>
            </View>
            {/*Break*/}
            <Text>{"\n"}</Text>
            <TouchableOpacity
              color="black"
              title="LOGIN"
              style={styles.button}
              onPress={this.doLogin}
            >
              <View style={styles.button_pack}>
                <Text style={styles.button}>Log In </Text>
                <Feather name="log-in" size={40} color="black" />
              </View>
            </TouchableOpacity>
            {/*Break*/}
            <Text>{"\n"}</Text>
            <TouchableOpacity
              color="black"
              title="PasswordRes"
              style={styles.button}
              onPress={this.doPassReset}
            >
              <Text style={styles.resetbutton}>Forgot Password ?</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }

  doLogin = async () => {
    this.setState({message:''});
    //JSON OBJECT
    var obj = { username: global.Login.trim(), password: global.Password.trim() };
    var js = JSON.stringify(obj);
    const url = bp.buildPath("api/account/login");
    this.setState({message:' LogingIn.....'});
    try {

      const response = await fetch(url, { method: 'post', body: js, headers: { "Content-Type": "application/json"} });

      var res = JSON.parse(await response.text());
      if (res.err_code) {
        //Error Message
        this.setState({message:'Error '+ res.err_code +': ' + res.description});
      } else {
        
        Storage.storeToken(res);
        var Acc = res.role;

        //Go to the user Window
        if (Acc === 'guest') {
          this.props.navigation.navigate('Guest');
        }
        if (Acc === 'employee') {
          this.props.navigation.navigate('Employee');
        }
        if (Acc === 'admin') {
          this.props.navigation.navigate('Admin');
        }
      }

    } catch (e) {
      this.setState({message:e.message});
    }
  }
  doPassReset = async () => {

  }
  changeLoginNameHandler = async (val) => {
    global.Login = val;
  }
  changePasswordHandler = async (val) => {
    global.Password = val;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  topbar: {
    flexDirection: "row",
    marginTop: 50,
    backgroundColor: "#14CCA4",
    width: "100%",
  },
  topbartext: {
    fontSize: 40,
    color: "black",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  login_index: {
    textAlign: "center",
    fontSize: 25,
    color: "green",
    backgroundColor: "orange",
    fontWeight: "bold",
    borderRadius: 5,
  },
  login: {
    textAlign: "left",
    fontSize: 40,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    height: 50,
  },
  password: {
    textAlign: "left",
    fontSize: 40,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    height: 50,
  },
  button: {
    textAlign: "center",
    fontSize: 30,
    backgroundColor: "#14CCA4",
    borderRadius: 5,
    fontWeight: "bold",
    height: 40,
    color: "white",
  },
  status: {
    fontSize: 20,
    textAlign: "center",
    color: "#BC3908",
    fontWeight: "bold",
  },
  blanck: {
    padding: 20,
    backgroundColor: "#3D3D3D",
    borderRadius: 5,
    width: "75%",
  },
  login_pack: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "lightgrey",
    borderRadius: 5,
  },
  button_pack: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#14CCA4",
    borderRadius: 5,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  resetbutton: {
    textAlign: "center",
    fontSize: 25,
    backgroundColor: "#BC3908",
    borderRadius: 5,
    fontWeight: "bold",
    height: 40,
    color: "white",
  },
});
