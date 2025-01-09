import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Text,
  Animated,
} from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome";

export default function MapPickerScreen({ route }) {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState("");
  const mapRef = useRef(null);
  const addressOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.button} onPress={handleSaveLocation}>
          <Icon name="save" size={24} color="blue" />
        </TouchableOpacity>
      ),
    });
  }, []);

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

  const handleSaveLocation = async () => {
    if (mapRef.current) {
      const camera = await mapRef.current.getCamera();
      const selectedLocation = {
        latitude: camera.center.latitude,
        longitude: camera.center.longitude,
      };
      navigation.navigate("Add a new Place", { pickedLocation: selectedLocation });
    } else {
      Alert.alert("Error", "Unable to fetch location");
    }
  };

  const handleRegionChangeComplete = async (region) => {
    try {
      const geocode = await Location.reverseGeocodeAsync({
        latitude: region.latitude,
        longitude: region.longitude,
      });
  
      if (geocode.length > 0) {
        const { name, street, subregion, district, city, country } = geocode[0];
        
        // Nối số nhà và tên đường không có dấu phẩy
        const streetWithHouse = name && street ? `${name} ${street}` : name || street;
  
        // Gắn địa chỉ theo thứ tự mong muốn
        const addressParts = [
          streetWithHouse, // Số nhà + Tên đường
          subregion, // Phường
          district,  // Quận
          city,      // Thành phố hoặc Tỉnh
          country,   // Quốc gia
        ];
  
        const formattedAddress = addressParts.filter(part => part).join(', ');
        setAddress(formattedAddress);
      }
    } catch (error) {
      setAddress("Không thể lấy địa chỉ");
    }
  };
  

  const handleMapPress = () => {
    Animated.timing(addressOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleMarkerPress = () => {
    Animated.timing(addressOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleCurrentLocationPress = async () => {
    if (currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cf3339" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation?.latitude || 10.807064,
          longitude: currentLocation?.longitude || 106.642628,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
        onPress={handleMapPress}
      />
      <View style={styles.markerFixed}>
        <TouchableOpacity onPress={handleMarkerPress}>
          <Icon name="map-marker" size={40} color="#cf3339" />
        </TouchableOpacity>
        <Animated.View style={[styles.addressContainer, { opacity: addressOpacity }]}>
          <Text style={styles.addressText}>{address}</Text>
        </Animated.View>
      </View>
      <TouchableOpacity style={styles.currentLocationButton} onPress={handleCurrentLocationPress}>
        <Icon name="crosshairs" size={24} color="white"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  markerFixed: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -20,
    marginTop: -40,
    alignItems: "center",
  },
  addressContainer: {
    position: "absolute",
    top: -50,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    elevation: 5,
  },
  addressText: {
    color: "#333",
    fontSize: 14,
    width: 200,
  },
  currentLocationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#cf3339",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: '50%',
    elevation: 5,
  },
});