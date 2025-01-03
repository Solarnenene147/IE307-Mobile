import React, { useState, useContext } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { addNote } from "../db";
import { SettingContext } from '../SettingContext';
import Icon from 'react-native-vector-icons/FontAwesome';

function Add({ navigation }) {
  const { darkMode, fontSize } = useContext(SettingContext);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const saveNote = async () => {
    if (noteTitle.trim() === "" || noteContent.trim() === "") {
      Alert.alert("Notification", "Please fill all the blanks.");
      return;
    }

    try {
      await addNote(noteTitle, noteContent);
      navigation.goBack();
      navigation.navigate("Home", { refresh: true }); // Làm mới danh sách ghi chú
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong. Please try again!");
    }
  };

  const cancelNote = () => {
    // Nếu cả tiêu đề và nội dung đều trống, quay lại ngay lập tức
    if (noteTitle.trim() === "" && noteContent.trim() === "") {
      navigation.goBack();
      return;
    }

    // Nếu có nội dung, hiển thị xác nhận
    Alert.alert(
      "Confirm",
      "Do you want to discard this note?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => navigation.goBack() },
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#000" : "#f8f8f8" },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#fff" : "#ccc",
            fontSize: fontSize,
          },
        ]}
        placeholder="Enter your title"
        placeholderTextColor={darkMode ? "#fff" : "#888"}
        value={noteTitle}
        onChangeText={setNoteTitle}
      />
      <TextInput
        style={[
          styles.input,
          styles.textArea,
          {
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#fff" : "#ccc",
            fontSize: fontSize,
          },
        ]}
        placeholder="Enter your note"
        placeholderTextColor={darkMode ? "#fff" : "#888"}
        value={noteContent}
        onChangeText={setNoteContent}
        multiline={true}
        numberOfLines={4}
      />
      <View style={styles.buttonContainer}>
        <View style={[styles.circleButton, { backgroundColor: "red" }]} onTouchEnd={cancelNote}>
          <Icon name="times" size={30} color={darkMode ? "#000" : "#fff"} />
        </View>
        <View style={[styles.circleButton, { backgroundColor: "green" }]} onTouchEnd={saveNote}>
          <Icon name="check" size={30} color={darkMode ? "#000" : "#fff"} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "center",
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: 'center',
    marginTop: 16,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
});

export default Add;
