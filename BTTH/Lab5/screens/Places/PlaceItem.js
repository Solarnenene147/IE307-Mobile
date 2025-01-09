import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native'; 


const PlaceItem = ( { item }) => {
  const place = item;
  const log = () => {
    console.log(place.image_path);
  }
  return (
    <TouchableOpacity style={styles.container} onPress={log}>
      <Image style={styles.image} source={{ uri: place.image_path }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address} numberOfLines={3}>{place.address}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    elevation: 5,
    marginHorizontal: 10,
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
});

export default PlaceItem;