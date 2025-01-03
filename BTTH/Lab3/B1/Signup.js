import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Signup({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return (
    <View style={styles.container}>
        <View style={styles.content}>
            <Image style={styles.img} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/1/18/React_Native_Logo.png" }} />
            <Text style={styles.createText}>Create New Account</Text>
            <View style={styles.inputbox}>
                <Icon name="user" size={25}  style={{marginHorizontal:3.75}}/>
                <TextInput
                    style={styles.input}
                    value={email}
                    placeholder="Enter Username"
                    placeholderTextColor={"#ccc"}
                    onChangeText={setEmail}
                />
            </View>
            <View style={styles.inputbox}>
                <Icon name="envelope" size={25}/>
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Enter Email"
                    placeholderTextColor={"#ccc"}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    />
            </View>
            <View style={styles.inputbox}>
                <Icon name="lock" size={25} style={{marginHorizontal:4.6}}/>
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Enter Password"
                    placeholderTextColor={"#ccc"}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    />
            </View>
            <View style={styles.inputbox}>
                <Icon name="lock" size={25} style={{marginHorizontal:4.6}}/>
                <TextInput
                    style={styles.input}
                    value={password}
                    placeholder="Confirm Password"
                    placeholderTextColor={"#ccc"}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    />
            </View>
            <TouchableOpacity style={styles.submit}>
                    <Text style={styles.submitText}>CREATE</Text>
            </TouchableOpacity>
            <View style={styles.login}>
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginText}>Login now!</Text>
                    </TouchableOpacity>
                </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '80%',
        alignItems: 'center',
    },
    img: {
        width: 100,
        height: 100,
        borderRadius:50,
    },
    createText: {
        fontSize: 24,
        marginVertical: 20,
        fontWeight:'bold',
    },
    inputbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "#ccc",
        borderWidth: 2,
        width: '100%',
        marginBottom: 15,
        paddingVertical: 5,
        paddingHorizontal:15,
        borderRadius:10,
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 5,
        width: '100%',
    },
    submit:{
        padding:10,
        backgroundColor:'orange',
        width:'100%',
        borderRadius:10,
        marginVertical:10,
    },
    submitText:{
        textAlign:'center',
        fontSize:18,
        color:'white',
    },
    login:{
        display:'flex',
        flexDirection:'row',
        marginVertical:10,
    },
    loginText: {
        color: 'blue',
        fontWeight: 'bold',
    },
});
