import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

export default function MediaLibraryScreen({ navigation }) {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Kiểm tra còn dữ liệu hay không

  const fetchMediaFiles = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please allow access to your media files."
      );
      return;
    }

    const media = await MediaLibrary.getAssetsAsync({
      mediaType: [
        MediaLibrary.MediaType.photo,
        MediaLibrary.MediaType.video,
      ],
      first: 16 * page, // Lấy số lượng ảnh/video theo trang
      sortBy: [MediaLibrary.SortBy.creationTime],
    });

    if (media.assets.length > 0) {
      // Loại bỏ ảnh đã có trong mediaFiles
      const newFiles = media.assets.filter(
        (newItem) => !mediaFiles.some((existingItem) => existingItem.id === newItem.id)
      );

      // Nếu có ảnh mới, thêm vào danh sách
      setMediaFiles((prevFiles) => [...prevFiles, ...newFiles]);
    } else {
      setHasMore(false); // Nếu không còn ảnh/video để tải
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchMediaFiles(); // Gọi fetch khi load lần đầu
  }, [page]); // Gọi lại khi page thay đổi

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.mediaItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.uri }} style={styles.image} />
        {item.mediaType === MediaLibrary.MediaType.video && (
          <View style={styles.videoIcon}>
            <MaterialIcons name="play-arrow" size={40} color="white" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleEndReached = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Tăng trang khi cuộn xuống cuối
    }
  };

  return (
    <View style={styles.container}>
      {mediaFiles.length > 0 ? (
        <FlatList
          data={mediaFiles}
          keyExtractor={(item, index) => `${item.id}-${index}`} // Kết hợp id và index để tạo khóa duy nhất
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
          onEndReached={handleEndReached} // Khi cuộn đến cuối thì gọi hàm
          onEndReachedThreshold={0.1} // Kích hoạt khi cuộn đến 10% cuối
          ListFooterComponent={loading ? <ActivityIndicator color="#cf3339" size="large" /> : null} // Hiển thị khi đang tải thêm
        />
      ) : loading ? (
        <ActivityIndicator color="#cf3339" size="large" />
      ) : (
        <Text>No media files found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    padding: 10,
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  mediaItem: {
    flex: 1,
    margin: 5,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 5,
  },
  videoIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 5,
  },
  cameraButton: {
    backgroundColor: "#cf3339",
    borderRadius: 30,
    width: 40,
    height: 40,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  mediaImage: {
    width: 80,
    height: 80,
    margin: 5,
  },
});
