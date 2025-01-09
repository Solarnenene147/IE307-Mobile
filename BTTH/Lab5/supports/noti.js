import * as Notifications from "expo-notifications";
import { Alert } from "react-native";

export const sendNotification = async (title, body) => {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    console.log("Notification permission status:", status, title, body);

    if (status !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert("Permission Denied", "Cannot send notifications without permission.");
        return;
      }
    }

    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: {
        seconds: 1,  // Có thể thay đổi thời gian trigger tại đây
      },
    });

    console.log("Notification scheduled successfully");

  } catch (error) {
    console.error("Error sending notification:", error);
    Alert.alert("Error", "Unable to send notification at the moment.");
  }
};
