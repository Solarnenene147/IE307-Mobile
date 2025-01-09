import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const PlaceDetail = ({ route }) => {
  const { place } = route.params;
  const navigation = useNavigation();

  const handleViewInMap = () => {
    navigation.navigate("MapDetail", {
      latitude: place.latitude,
      longitude: place.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: place.image_path }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.address}>{place.address}</Text>
      <TouchableOpacity style={styles.mapButton} onPress={handleViewInMap}>
        <Icon name="map" size={16} color="blue" />
        <Text style={styles.mapButtonText}> View in Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "80%",
  },
  address: {
    fontSize: 20,
    color: "#666",
    marginBottom: 10,
    marginHorizontal: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    marginHorizontal: '30%',
  },
  mapButtonText: {
    fontSize: 16,
    color: "blue",
    fontWeight: "bold",
  },
});

export default PlaceDetail;
