import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { getNotes, deleteNote } from '../db'; // Thêm deleteNote từ db
import { SettingContext } from '../SettingContext';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon từ react-native-vector-icons

function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const { darkMode, fontSize } = useContext(SettingContext);

  // Làm mới danh sách ghi chú
  const refreshNotes = () => {
    getNotes((fetchedNotes) => {
      setNotes(fetchedNotes);
    });
  };

  useEffect(() => {
    // Lấy ghi chú ban đầu
    refreshNotes();

    // Làm mới danh sách mỗi khi màn hình được focus
    const unsubscribe = navigation.addListener('focus', () => {
      refreshNotes();
    });

    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (noteId) => {
    try {
      await deleteNote(noteId); // Xóa ghi chú
      refreshNotes(); // Làm mới danh sách ghi chú
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: darkMode ? '#000' : 'rgb(238, 238, 238)' },
      ]}
    >
      <View style={styles.headContent}>
        <Text
          style={[styles.title, { color: darkMode ? '#fff' : '#666', fontSize: fontSize + 3 }]}
        >
          All Notes
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddNote')}
          style={[styles.addButton, { backgroundColor: darkMode ? 'rgb(46, 104, 229)' : '#FFA500' }]}
        >
          <Text style={[styles.addButtonText, { color: darkMode ? '#000' : '#fff' }]}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
          >
            <View style={styles.notecover}>
              <View style={styles.noteContainer}>
                <Text
                  style={[styles.notetitle, { color: darkMode ? '#fff' : '#666', fontSize: fontSize + 5 }]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[styles.notecontent, { color: darkMode ? '#fff' : '#888', fontSize }]}
                >
                  {item.content}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)} // Gọi hàm xóa ghi chú
              >
                <Icon name="trash" size={25} color={darkMode ? '#fff' : '#000'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  notecover: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  noteContainer: {
    width: '90%',
  },
  notetitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  notecontent: {
    marginBottom: 8,
  },

  deleteButton: {
    padding: 10,
  },
});

export default HomeScreen;
