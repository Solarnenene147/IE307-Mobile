import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const PlaceDetail = ({ route }) => {
  const { place } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: place.image_path }} style={styles.image} resizeMode="cover" />
      <Text style={styles.address}>{place.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '80%',
  },
  infoContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  address: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default PlaceDetail;