import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  return (
      <KeyboardAvoidingView style={styles.container}>
        <ScrollView style={styles.scroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={styles.register}>
            <Text style={styles.reg}>Register</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputbox}>
              <TextInput style={styles.input} placeholder='Full Name' placeholderTextColor={'white'}></TextInput>
            </View>
            <View style={styles.inputbox}>
              <TextInput style={styles.input} placeholder='Username' placeholderTextColor={'white'}></TextInput>
            </View>
            <View style={styles.inputbox}>
              <TextInput style={styles.input} placeholder='Email' placeholderTextColor={'white'}></TextInput>
            </View>
            <View style={styles.inputbox}>
              <TextInput style={styles.input} placeholder='Password' placeholderTextColor={'white'}></TextInput>
            </View>
            <View style={styles.inputbox}>
              <TextInput style={styles.input} placeholder='Confirm Password' placeholderTextColor={'white'}></TextInput>
            </View>
          </View>
          <View style={styles.submit}>
            <TouchableOpacity style={styles.subm} type='submit'>
              <Text style={styles.st}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.topleft}></View>
        <View style={styles.topright}></View>
        <View style={styles.botleft}></View>
        <View style={styles.botright}></View>
        </ScrollView> 
    </KeyboardAvoidingView>
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
    width:'100%',
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
    height:790,
    borderColor: '#137e9e',
    borderWidth: 16,
    borderStyle: 'solid',
  },
  register:
  {
    alignItems:'center',
    height: '15%',
  },
  reg:
  { 
    marginTop:'15%',
    fontSize:30,
  },
  form:
  {
    width: '100%',
    height: '60%',
  },
  inputbox:
  {
    alignSelf:'center',
    backgroundColor:'#2fbce7',
    width:'80%',
    justifyContent:'space-between',
    marginVertical:'5%',
    flex:1,
    justifyContent:'center',
    
  },
  input:
  {
    marginStart: 5,
    color: 'white',
  },
  submit:
  {
    alignSelf:'center',
    width:'80%',
    height:'25%',
  },
  subm:
  {
    alignItems: 'center',
    height:55,
    marginTop:50,
    backgroundColor:'black',
    justifyContent:'center',
  },
  st:
  {
    color:'white',
    fontSize:20,
  },
  avoid: 
  {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
