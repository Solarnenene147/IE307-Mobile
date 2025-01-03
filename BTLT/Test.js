import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

const App = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      )}
      <WebView
        source={{ uri: "https://givenow.vn" }}
        onLoadProgress={({ nativeEvent }) => {
          setProgress(nativeEvent.progress || 0); // Đảm bảo progress luôn có giá trị
          if (nativeEvent.progress === 1) {
            setIsLoading(false); // Ẩn trạng thái tải khi hoàn thành
          }
        }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#6200EE",
  },
});

export default App;
