import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler'; // Import Swipeable
import { deletePlace } from '../../databases/db'; // Import hàm xóa
import { useNavigation } from '@react-navigation/native';

const PlaceItem = ({ item, onDelete }) => { // Nhận prop onDelete
  const place = item;
  const navigation = useNavigation();

  const HandleDetail = () => {
    navigation.navigate('PlaceDetail', { place, title: place.title });
  }

  // Render phần "Swiped" (nút xóa)
  const renderRightActions = () => {
    return (
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => {
          deletePlace(place.id, () => onDelete(place.id));  // Gọi deletePlace và truyền callback
        }}
      >
        <Text style={styles.deleteText}>Xóa</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}> 
      <TouchableOpacity style={styles.container} onPress={HandleDetail}>
        <Image style={styles.image} source={{ uri: place.image_path }} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{place.title}</Text>
          <Text style={styles.address} numberOfLines={3}>{place.address}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    height: 120,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
  image: {
    width: '30%',
    borderRadius: 5,
  },
  infoContainer: {
    width: '70%',
    padding: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 120,
    borderRadius: 5,
    marginVertical: 5,
    marginEnd: 20,
    marginStart: 0,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PlaceItem;
