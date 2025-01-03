import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { updateNote, getNotes } from '../db';
import { SettingContext } from '../SettingContext';
import Icon from 'react-native-vector-icons/FontAwesome';

function Edit({ route, navigation }) {
  const { darkMode, fontSize } = useContext(SettingContext);
  const { noteId } = route.params; // Nhận `noteId` từ tham số truyền vào
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [originalTitle, setOriginalTitle] = useState(""); // Lưu tiêu đề gốc
  const [originalContent, setOriginalContent] = useState(""); // Lưu nội dung gốc

  // Lấy dữ liệu ghi chú ban đầu để hiển thị
  useEffect(() => {
    getNotes((notes) => {
      const note = notes.find((n) => n.id === noteId);
      if (note) {
        setNoteTitle(note.title);
        setNoteContent(note.content);
        setOriginalTitle(note.title); // Lưu tiêu đề gốc
        setOriginalContent(note.content); // Lưu nội dung gốc
      }
    });
  }, [noteId]);

  const saveNote = async () => {
    if (noteTitle.trim() === "" || noteContent.trim() === "") {
      Alert.alert("Notification", "Please fill all the blanks.");
      return;
    }

    try {
      await updateNote(noteId, noteTitle, noteContent);
      navigation.goBack(); // Quay lại màn hình trước
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Error", "Something went wrong. Please try again!");
    }
  };

  const cancelEdit = () => {
    // Kiểm tra xem có thay đổi so với bản gốc hay không
    if (noteTitle.trim() === originalTitle && noteContent.trim() === originalContent) {
      navigation.goBack(); // Nếu không có thay đổi, quay lại ngay lập tức
      return;
    }

    // Nếu có thay đổi, hiển thị xác nhận
    Alert.alert(
      "Confirm",
      "Do you want to discard this changing?",
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
        <View style={[styles.circleButton, { backgroundColor: "red" }]} onTouchEnd={cancelEdit}>
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

export default Edit;
