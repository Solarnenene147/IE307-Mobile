import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={styles.scroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
          <View style={styles.main}>
            <View style={styles.Title}>
              <Text style={styles.Ttext}>Member Login</Text>
            </View>
            <View style={styles.form}>
              <TextInput style={styles.in} placeholder='Email' placeholderTextColor={'white'} />
              <TextInput style={styles.in} placeholder='Password' placeholderTextColor={'white'} secureTextEntry={true} />
            </View>
            <View style={styles.subm}>
              <TouchableOpacity>
                <Text style={styles.tsm}>Sign in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ex}>
              <TouchableOpacity style={styles.check} onPress={toggleCheckbox}>
                {isChecked && <Icon name="check" size={35} color="white" />}
              </TouchableOpacity>
              <Text style={styles.xtext}>Remember me</Text>
              <TouchableOpacity style={styles.for}>
                <Text>Forgot password</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.topleft}></View>
          <View style={styles.topright}></View>
          <View style={styles.botleft}></View>
          <View style={styles.botright}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView> 
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  scroll:
  {
    width:'100%',
    height:'100%',
  },
  topleft: 
  {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 90,
    borderTopWidth: 90,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#2fbce7',
  },
  topright: 
  {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 90,
    borderRightWidth: 0,
    borderTopWidth: 90,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#2fbce7',
  },
  botleft: 
  {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 90,
    borderBottomWidth: 90,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#2fbce7', // Màu của tam giác
  },
  botright: 
  {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 90,
    borderRightWidth: 0,
    borderBottomWidth: 90,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#2fbce7', // Màu của tam giác
  },
  main:
  {
    width: '100%',
    height: 790,
    borderColor: '#137e9e',
    borderWidth: 16,
    borderStyle: 'solid',
  },
  Title:
  {
    width:'100%',
    alignItems:'center',
    height:'28%',
  },
  Ttext:
  {
    marginTop:'40%',
    fontSize:30,
  },
  form:
  {
    width:'100%',
    height:'25%',
    alignItems:'center',
  },
  in:
  {
    marginBottom:20,
    marginTop:20,
    backgroundColor:'#2fbce7',
    width: '80%',
    height:45,
    paddingLeft:5,
  },
  subm:
  {
    backgroundColor:'black',
    width:'80%',
    alignSelf:'center',
    height:45,
    justifyContent:'center',
  },
  tsm:
  {
    color:'white',
    alignSelf:'center',
    fontSize:20,
  },
  ex:
  {
    flexDirection:'row',
    marginTop:75,
    justifyContent:'center',
  },
  check:
  {
    borderColor:'black',
    borderWidth:3,    
    backgroundColor:'black',
    flex:1,
    marginLeft:20,
    width:30,
    height:40,
  },
  xtext:
  {
    flex:3,
    marginRight:30,
    marginLeft:10,
    paddingTop:8.5,
  },
  for:
  {
    flex:4,
    justifyContent:'center',
  }
});
