import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, ToastAndroid, TouchableOpacity, Text } from "react-native";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";
import Icon from "react-native-vector-icons/FontAwesome";
import { sendNotification } from "../../supports/noti";

export default function RecordVideoScreen({ navigation }) {
  const [isRecording, setIsRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [microPermission, requestMicroPermission] = useMicrophonePermissions();
  const [timer, setTimer] = useState(0); // State để lưu trữ thời gian
  const cameraRef = useRef(null);
  const intervalRef = useRef(null); // Lưu trữ ref cho interval

  useEffect(() => {
    if (permission !== "granted") {
      try {
        requestPermission();
      } catch (error) {
        ToastAndroid.show("Error", "Failed to get camera permission.");
        console.error(error);
        navigation.goBack();
      }
    }
    if (microPermission !== "granted") {
      try {
        requestMicroPermission();
      } catch (error) {
        ToastAndroid.show("Error", "Failed to get microphone permission.");
        console.error(error);
        navigation.goBack();
      }
    }

    // Cleanup interval khi component unmount
    return () => clearInterval(intervalRef.current);
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        setTimer(0); // Reset bộ đếm thời gian khi bắt đầu quay
        intervalRef.current = setInterval(() => {
          setTimer((prevTime) => prevTime + 1); // Cập nhật thời gian mỗi giây
        }, 1000);
        const video = await cameraRef.current.recordAsync();
        setVideoUri(video.uri);
        setIsRecording(false);
        clearInterval(intervalRef.current); // Dừng bộ đếm khi quay xong
      } catch (error) {
        ToastAndroid.show("Error", "Failed to record video.");
        setIsRecording(false);
        clearInterval(intervalRef.current); // Dừng bộ đếm khi có lỗi
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        await cameraRef.current.stopRecording();
        setIsRecording(false);
        clearInterval(intervalRef.current); // Dừng bộ đếm khi dừng quay
      } catch (error) {
        ToastAndroid.show("Error", "Failed to stop recording.");
        clearInterval(intervalRef.current); // Dừng bộ đếm khi có lỗi
      }
    }
  };

  const saveVideo = async () => {
    if (videoUri) {
      try {
        await MediaLibrary.createAssetAsync(videoUri);
        sendNotification(
          "Video saved",
          "Your video has been saved to the gallery."
        );
        navigation.goBack();
      } catch (error) {
        ToastAndroid.show("Error", "Failed to save video.");
      }
    }
  };

  // Hàm để chuyển đổi thời gian sang định dạng 00:00
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${sec < 10 ? '0' + sec : sec}`;
  };

  return (
    <View style={styles.container}>
      {videoUri ? (
        <View style={styles.videoPreview}>
          <Video
            source={{ uri: videoUri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay={true}
            isLooping={true}
            style={styles.video}
            useNativeControls
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setVideoUri(null)}
            >
              <Text style={styles.buttonText}>Re record</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "blue" }]}
              onPress={saveVideo}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <CameraView mode="video" style={styles.camera} ref={cameraRef}>
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.recordButton}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <Icon
                name={isRecording ? "stop" : "video-camera"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </View>
          {isRecording && (
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{formatTime(timer)}</Text> {/* Hiển thị bộ đếm với định dạng 00:00 */}
            </View>
          )}
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  camera: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  recordButton: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 50,
  },
  recordButtonText: {
    color: "white",
    fontSize: 18,
  },
  videoPreview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 600,
  },
  button: {
    backgroundColor: "#3eb489",
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  timerContainer: {
    position: "absolute",
    top: 30,
    left: "50%",
    transform: [{ translateX: -40 }],
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 5,
  },
  timerText: {
    color: "white",
    fontSize: 20,
  },
});
