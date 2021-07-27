import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

//import Screens
import LoginScreen from './screens/LoginScreen';
import EmployeeScreen from './screens/EmployeeScreen.js';
import PasswordChange from './screens/PasswordChange';
import AdminScreen from './screens/AdminScreen';

//The app function on react
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

//App navigator to all the screens
const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Employee: {
    screen: EmployeeScreen,
  },
  PasswordChange:{
    screen: PasswordChange,
  },
  Admin:{
    screen: AdminScreen,
  }

},{
  initialRouteName: "Login",
  headerMode:'none',
});

//Basically the App
const AppContainer = createAppContainer(AppNavigator);

//CSS part
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
