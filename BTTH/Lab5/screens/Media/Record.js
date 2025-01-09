import React, { useEffect } from "react";
import { StyleSheet, View, Button, Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export default function App() {
  useEffect(() => {
    const registerForPushNotificationsAsync = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== "granted") {
          Alert.alert(
            "Thông báo",
            "Bạn cần cấp quyền để ứng dụng có thể gửi thông báo."
          );
          return;
        }

        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "Thông báo mặc định",
            importance: Notifications.AndroidImportance.MAX,
          });
        }
      } else {
        Alert.alert("Thông báo", "Bạn cần sử dụng thiết bị thật.");
      }
    };

    registerForPushNotificationsAsync();
  }, []);

  const handlePress = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Thông báo từ ứng dụng 🎉",
        body: "Đây là thông báo bạn vừa bấm!",
        data: { someData: "Thông tin bổ sung" },
      },
      trigger: { seconds: 1 }, // Hiển thị sau 1 giây
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Hiển thị thông báo" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
});
