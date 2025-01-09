import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";

export default function CurrentAddressScreen() {
  const [address, setAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = async () => {
    setIsLoading(true);
    try {
      // Yêu cầu quyền truy cập vị trí
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Quyền bị từ chối",
          "Ứng dụng cần quyền truy cập vị trí để hoạt động."
        );
        setIsLoading(false);
        return;
      }

      // Lấy vị trí hiện tại
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      // Geocoding để lấy địa chỉ
      const geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geocode.length > 0) {
        const {
          name,
          street,
          district,
          subregion,
          city,
          region,
          country,
        } = geocode[0];

        // Gộp các phần địa chỉ
        const formattedAddress = `${name || ""} ${
          street || ""
        }, ${district || ""}, ${subregion || ""}, ${city || region || ""}, ${
          country || ""
        }`;

        setAddress(formattedAddress);
      } else {
        setAddress("Không thể lấy địa chỉ.");
      }
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lấy địa chỉ hiện tại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGetLocation}>
        <Text style={styles.buttonText}>Hiển thị địa chỉ hiện tại</Text>
      </TouchableOpacity>

      {isLoading && (
        <ActivityIndicator size="large" color="#cf3339" style={styles.loader} />
      )}

      {address && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    backgroundColor: "#cf3339",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  addressContainer: {
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  addressText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
