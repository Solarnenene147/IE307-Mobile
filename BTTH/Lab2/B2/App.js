//22521152 Huỳnh Minh Phước
import React, { useState } from 'react';
import { View, Image, StyleSheet, Text, TextInput, Platform, Alert, Button, FlatList, Keyboard } from 'react-native';
import Mode from './Mode';

export default function App() {
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [text, setText] = useState('');
  const [inputList, setInputList] = useState([]);
  const [isNotifymode, setIsNotifymode] = useState(false);

  const handleSendPress = () => {
    if (text.trim() !== '') {
      setInputList([text,...inputList]); 
      setText(''); 
      Keyboard.dismiss();

      if (isNotifymode) {
        Alert.alert("Thank you for feedback!");
      }
    }
  };

  const handleDarkmode = () => {
    setIsDarkmode(previousState => !previousState);
  };

  const handleNotifymode = () => {
    setIsNotifymode(previousState => !previousState);
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkmode ? "black" : "white" }]}>
      <View style={styles.head}>
        <Image
          source={{ uri: 'https://www.scorchsoft.com/public/capabilities/head/react-native-logo-square.webp' }}
          style={styles.image}
        />
        <Text style={{ color: isDarkmode ? "white" : "black" }}>React Native App</Text>

        <Mode
          type="Dark Mode"
          mode={isDarkmode}
          toggleSwitch={handleDarkmode}
          darkmode={isDarkmode}
        />

        <Mode
          type="Notify Mode"
          mode={isNotifymode}
          toggleSwitch={handleNotifymode}
          darkmode={isDarkmode}
          notifymode={isNotifymode}
        />
      </View>

      <View style={styles.feedback}>
        <Text style={[styles.fbtext, { color: isDarkmode ? 'white' : 'black' }]}>Feedback</Text>
        <TextInput
          style={[styles.fbinput, { borderColor: isDarkmode ? 'white' : '#ccc',
            color: isDarkmode ? 'white' : 'black'
           }]}
          placeholder="Your feedback here..."
          placeholderTextColor={isDarkmode ? '#aaa' : '#999'}
          onChangeText={setText}
          value={text}
          multiline
          textAlignVertical="top"
        />
        <Button title="Send Feedback" onPress={handleSendPress} style={styles.send} />
      </View>
      <View style={{marginHorizontal:25}}>
        <Text style={[styles.fbtitle, {color: isDarkmode? 'white':'black'}]}>Frequently Asked Questions</Text>
        <FlatList
          data={inputList}
          renderItem={({ item }) => <Text style={[styles.item,  {color: isDarkmode? 'white':'black'}]}>Q: {item}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
  },
  head: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    marginTop: 50,
    marginBottom: 10,
    width: 100,
    height: 100,
    aspectRatio: 1 / 1,
    borderRadius: 100,
  },
  send:{
    backgroundColor: Platform.OS==='ios'? "transparent" : "blue",
  },
  feedback: {
    marginHorizontal: 25,
  },
  fbtext: {
    fontSize: 20,
  },
  fbinput: {
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    height: Platform.OS ==='ios' ? 40 : 120,
    padding: 10,
    textAlignVertical: 'top',
  },
  fbtitle:
  {
    marginTop:20,
    marginBottom:10,
    fontSize:18,
    fontWeight:'bold',
  },
  item: {
    padding: 2,
    fontSize: 15,
  },
});
