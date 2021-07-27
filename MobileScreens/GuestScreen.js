/* READ ThIS BEFORE EDITING

     This is the profile and order page for guest mobile. Add to cart button is made but not functional. It just needs a couple if statements and a message screen*/

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ImageBackground,Button, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons' ;
/*import React, { Component } from "react";*/


{/* guest profile info variables that are gonna be changed by database */}
const name = "Guest_name";
const phoneNumber = "3863835150";
const checkIn_date = "07/21/2021";
const checckOut_date = "07/23/2021";
const quantity = 3;
const roomNumber = 104;
const numOfGuests = 3;
const hotelName = "Chateau Mar Beach Resorts";
// items names 
const item11 = "Towels";
const item2 = "Toilet paper";
const item3 = "Pillows";
const item4 = "Blanket";
const item5 = "Sheet";


export default class app extends React.Component {
  
  state = {
    item1_quantity: 0,
    item2_quantity: 0,
    item3_quantity: 0,
    item4_quantity: 0,
    item5_quantity: 0,
    total_Taps: 0
  }

  /* increment and decrement item1 quantity functions */
  incrementi_item1_quantity = () => {
    this.setState({
      item1_quantity: item1_quantity + 1,
      total_Taps: this.state.total_Taps + 1
    })
  }
  decrement_Item1_Quantity = () => {
    this.setState({
      item1_quantity: item1_quantity - 1,
      total_Taps: this.state.total_Taps + 1
    })
  }

  /* increment and decrement item 2 quantity functions */
  increment_item2_quantity = () => {
    this.setState({
      item2_quantity: this.state.item2_quantity + 1,
      total_Taps: this.state.total_Taps + 1
    })
  }
  decrement_item2_quantity = () => {
    this.setState({
      item2_quantity: this.state.item2_quantity - 1,
      total_Taps: this.state.total_Taps + 1
    })
  }

 /* increment and decrement item3 quantity functions */
  increment_item3_quantity = () => {
    this.setState({
      item3_quantity: this.state.item3_quantity + 1,
      total_Taps: this.state.total_Taps + 1
    })
  }
  decrement_item3_quantity = () => {
    this.setState({
      item3_quantity: this.state.item3_quantity - 1,
      total_Taps: this.state.total_Taps + 1
    })
  }

 /* increment and decrement item4 quantity functions */
  increment_item4_quantity = () => {
    this.setState({
      item4_quantity: this.state.item4_quantity + 1,
      total_Taps: this.state.total_Taps + 1
    })
  }
  decrement_item4_quantity = () => {
    this.setState({
      item4_quantity: this.state.item4_quantity - 1,
      total_Taps: this.state.total_Taps + 1
    })
  }

 /* increment and decrement item5 quantity functions */
  increment_item5_quantity = () => {
    this.setState({
      item5_quantity: this.state.item5_quantity + 1,
      total_Taps: this.state.total_Taps + 1
    })
  }
  decrement_item5_quantity = () => {
    this.setState({
      item5_quantity: this.state.item5_quantity - 1,
      total_Taps: this.state.total_Taps + 1
    })
  }

  addToCart = () => {
    this.setState({
      item5_quantity: this.state.item5_quantity - 1,
      total_Taps: this.state.total_Taps + 1
    })
  }

  render() {
    return (
      <View>
      {/* Profile screen */}

        <ImageBackground style = {styles.backgroundImage} source = {require ("../guest/images/login_background.jpg")}> 
          <Feather name = 'user' size = {60} color = "red"  />
          <Text>  Your name: {name} </Text>
          <Text> Phone#: {phoneNumber} </Text>
          <Text> Check-in date: {checkIn_date} </Text>
          <Text> Check-out date: {checckOut_date} </Text>
          <Text> Room #: {roomNumber} </Text>
          <Text> # of guests: {numOfGuests} {'\n\n\n'}</Text>

          <Text style = {styles.title}>About {hotelName}  </Text>
          <Text> {'\n'} details </Text>
        </ImageBackground>
      
      {/* ORDER screen */}
        <Text style = {{fontSize: 60, color: 'red', textAlign: 'left'}}> Order here </Text>
        {/* item1 item and button*/}
        <ImageBackground style = {styles.item1} source = {require ("../guest/images/item1.jpg")}>
          <Text style = {{ fontSize: 20, pading: 20, color: 'red'}}> {item11} </Text>
          <StatusBar style = "auto" />
          <View style = {styles.item1_button}> 
            <Button onPress = {this.decrement_Item1_Quantity} title = "-" />
          <Text style = {{ fontSize: 25, margintop: 100,}}> {this.state.item1_quantity} </Text>
            <Button onPress = {this.incrementi_item1_quantity} title = "+" />
          </View>
        </ImageBackground>
        
        {/* item2 item and button */}
        <ImageBackground style = {styles.item2} source = {require ("../guest/images/item2.jpeg")}>
          <Text style = {{ fontSize: 18, pading: 20, color: 'red'}}> {item2} </Text>
          <StatusBar style = "auto" />
          <View style = {styles.item2_button}> 
            <Button onPress = {this.decrement_item2_quantity} title = "-" />
          <Text style = {{ fontSize: 25, margintop: 100,}}> {this.state.item2_quantity} </Text>
            <Button onPress = {this.increment_item2_quantity} title = "+" />
          </View>
        </ImageBackground>

        {/* Item3 item and button */}
        <ImageBackground style = {styles.item3} source = {require ("../guest/images/item3.jpg")}>
          <Text style = {{ fontSize: 20, pading: 20, color: 'red'}}> {item3} </Text>
          <StatusBar style = "auto" />
          <View style = {styles.item3_button}> 
            <Button onPress = {this.decrement_item3_quantity} title = "-" />
          <Text style = {{ fontSize: 25, margintop: 100,}}> {this.state.item3_quantity} </Text>
            <Button onPress = {this.increment_item3_quantity} title = "+" />
          </View>
        </ImageBackground>

        {/* item4  item and button */}
        <ImageBackground style = {styles.item4} source = {require ("../guest/images/item4.jpeg")}>
          <Text style = {{ fontSize: 20, pading: 20, color: 'yellow'}}> {item4} </Text>
          <StatusBar style = "auto" />
          <View style = {styles.item4_button}> 
            <Button onPress = {this.decrement_item4_quantity} title = "-" />
            <Text style = {{ fontSize: 25, margintop: 100,}}> {this.state.item4_quantity} </Text>
            <Button onPress = {this.increment_item4_quantity} title = "+" />
          </View>
        </ImageBackground>

        {/* item5 item and button */}
        <ImageBackground style = {styles.item5} source = {require ("../guest/images/item5.jpg")}>
          <StatusBar style = "auto" />
          <Text style = {{ fontSize: 20, pading: 30, color: 'red'}}> {item5} </Text>
          <View style = {styles.item5_button}> 
            <Button onPress = {this.decrement_item5_quantity} title = "-" />
          <Text style = {{ fontSize: 25, margintop: 100,}}> {this.state.item5_quantity} </Text>
            <Button onPress = {this.increment_item5_quantity} title = "+" />
          </View>
        </ImageBackground>
        <View style = {styles.addtoCart_button}> 
          <Button  onPress = {this.addToCart} title = "Add to Cart" />
          <Feather name = 'shopping-cart' size = {25} color = "red"

/>

        </View>
  
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: '',
  },

  Profile: {
    color: "red",
    borderRadius: 5,
    padding: 10,
    width: '99%',
    opacity: 0.8,
    
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    opacity: 0.9,
  },
  title: {
    fontsize: 20,
    fontWeight: "bold", 
    color: "purple",
    
  },
  item1: {
    width: 100,
    height: 100,
    position: 'relative',
    right: 80,
    left: 20,
    top: 50,
    bottom: -20,
    alignItems: "center",
    opacity: 0.9,
    
  },

  item1_button: {
    position: 'relative', 
    right: -100, 
    left: 0,
    top: 80,
    bottom: -50,
    backgroundcolor: 'red', 
    flexDirection: 'row'
  },

   item2: {
    width: 100,
    height: 100,
    position: 'relative',
    right: 50,
    left: 170,
    top: -40,
    bottom: -20,
    alignItems: "center",
    opacity: 0.9,
    
  },

  item2_button: {
    position: 'relative', 
    right: -100, 
    left: 0,
    top: 70,
    bottom: -50,
    backgroundcolor: 'red', 
    flexDirection: 'row'
  },

  item3: {
    width: 100,
    height: 100,
    position: 'relative',
    right: 50,
    left: 170,
    top: 30,
    bottom: -20,
    alignItems: "center",
    opacity: 0.9,
    
  },

  item3_button: {
    position: 'relative', 
    right: -100, 
    left: 0,
    top: 70,
    bottom: -50,
    backgroundcolor: 'red', 
    flexDirection: 'row'
  },

  item4: {
    width: 100,
    height: 100,
    position: 'relative',
    right: 80,
    left: 20,
    top: -70,
    bottom: -20,
    alignItems: "center",
    opacity: 0.9,
    
  },

  item4_button: {
    position: 'relative', 
    right: -100, 
    left: 0,
    top: 70,
    bottom: -50,
    backgroundcolor: 'red', 
    flexDirection: 'row'
  },

  
  item5: {
    width: 100,
    height: 100,
    position: 'relative',
    right: 80,
    left: 20,
    top: 0,
    bottom: -20,
    alignItems: "center",
    opacity: 0.9,
    
  },

  item5_button: {
    position: 'relative', 
    right: -100, 
    left: 0,
    top: 70,
    bottom: -50,
    backgroundcolor: 'red', 
    flexDirection: 'row'
  },

  addtoCart_button: {
    justifyContent: 'center',
    
    position: 'relative', 
    right: -100, 
    left: 0,
    top: 70,
    bottom: -50,
    color: 'red', 
    flexDirection: 'row'
  },

  
  
});
