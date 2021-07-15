import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';


function PasswordChange() {

    var Email;

    const [message, setMessage] = useState('');

    const doPassReset = async event => {
        setMessage('PasswordReset');
    }

    return (
        <View style={styles.container}>

            <ImageBackground style={styles.backgroundImage} source={require('../images/login_background.jpg')}>

                {/*Break*/}
                <Text>{'\n'}</Text>
                <View style={styles.blanck}>
                    <View>
                        <Text style={styles.title}> Hotel Knightro </Text>
                    </View>
                    {/*Break*/}
                    <Text>{'\n'}</Text>

                    {/* Email */}
                    <View style={styles.email_pack}>
                        <Feather name='mail' size={30} color="black" />
                        <TextInput
                            style={styles.email}
                            placeholder="Enter Your Email"
                            onChangeText={(val) => { Email = val }}
                        />
                    </View>
                    {/*Break*/}
                    <Text>{'\n'}</Text>

                    {/* Status */}
                    <View>
                        <Text style={styles.status}>{message}</Text>
                    </View>
                    {/*Break*/}
                    <Text>{'\n'}</Text>

                    {/* Reset */}
                    <TouchableOpacity
                        color="black"
                        title="LOGIN"
                        style={styles.button}
                        onPress={doPassReset}
                    >
                        <View style={styles.button_pack}>
                            <Text style={styles.button}>Reset</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
    email: {
        textAlign: 'left',
        fontSize: 20,
        backgroundColor: "lightgrey",
        borderRadius: 5,
        height: 50,
        maxWidth:'80%'
    },
    button: {
        textAlign: 'center',
        fontSize: 30,
        backgroundColor: 'blue',
        borderRadius: 5,
        fontWeight: 'bold',
        height: 40,
        color: 'white'
    },
    status: {
        fontSize: 20,
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold'
    },
    blanck: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 5,
        width: '75%'
    },
    email_pack: {
        justifyContent: 'flex-start',
        alignItems:'center',
        flexDirection: 'row',
        backgroundColor: 'lightgrey',
        borderRadius: 5
    },
    button_pack: {
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'blue',
        borderRadius: 5
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black'
    }
});

export default PasswordChange;