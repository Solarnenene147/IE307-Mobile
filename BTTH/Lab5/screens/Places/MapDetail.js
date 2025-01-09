import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Text,
  Animated,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";
import { convertCoordinatesToAddress } from "../../supports/mapapi";

const MapDetail = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState("");
  const addressOpacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Please allow access to your location."
          );
          setIsLoading(false);
          return;
        }

        const locationResult = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setCurrentLocation(locationResult.coords); // Lưu vị trí hiện tại
      } catch (error) {
        Alert.alert("Error", "Unable to fetch location");
      } finally {
        setIsLoading(false);
      }
    };

    getLocation();
  }, []);

  const handleMapPress = async () => {
    Animated.timing(addressOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
  }

  const handleMarkerPress = async (latitude, longitude) => {
    const newAddress = await convertCoordinatesToAddress(latitude, longitude);
    setAddress(newAddress);

    Animated.timing(addressOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation?.latitude || 10.807064,
          longitude: currentLocation?.longitude || 106.642628,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={() => handleMapPress()}
      >
        {/* Marker cứng */}
        <Marker
          coordinate={{
            latitude: 10.807064,
            longitude: 106.642628,
          }}
          onPress={() => handleMarkerPress(10.807064, 106.642628)}
        />
      </MapView>
      {/* Hiển thị địa chỉ */}
      <Animated.View
        style={[styles.addressContainer, { opacity: addressOpacity }]}
      >
        <Text style={styles.addressText} numberOfLines={2}>
          {address}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  addressText: {
    color: "#333",
    fontSize: 14,
    width: 250,
  },
});

export default MapDetail;
