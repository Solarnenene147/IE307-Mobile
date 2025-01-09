import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, ToastAndroid, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { addPlace } from '../../databases/db'; // Import hàm thêm vào CSDL từ db.js
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { Marker } from 'react-native-maps';
import { sendNotification } from '../../supports/noti';
import { convertCoordinatesToAddress } from '../../supports/mapapi';

const AddPlace = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [address, setAddress] = useState('');
    const [userLocation, setUserLocation] = useState(null);  // Thêm state lưu vị trí người dùng

    useEffect(() => {
        const getPermission = async () => {
            const { status } = await sendNotification.requestPermissionsAsync();
            if (status !== 'granted') {
                ToastAndroid.show('Notification permission is required!', ToastAndroid.SHORT);
            }
        };
        getPermission();
    }, []);

    useEffect(() => {
        if (route.params?.location) {
            const { latitude, longitude } = route.params.location;
            setLatitude(latitude);
            setLongitude(longitude);
            setUserLocation({
                latitude,
                longitude,
            });
        }
    }, [route.params?.location]);

    // ---------------------- HÌNH ẢNH ----------------------

    // Yêu cầu quyền truy cập ảnh
    const requestImagePermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            ToastAndroid.show('Permission for accessing images is required!', ToastAndroid.SHORT);
            return false;
        }
        return true;
    };

    const pickImageHandler = async () => {
        const hasPermission = await requestImagePermission();
        if (!hasPermission) return;

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 1,
            });
            if (!result.canceled) {
                setImagePath(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    // Yêu cầu quyền truy máy ảnh & chụp ảnh
    const takeImageHandler = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            ToastAndroid.show('Permission for accessing camera is required!', ToastAndroid.SHORT);
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImagePath(result.assets[0].uri);
        }
    };

    // ---------------------- VỊ TRÍ ----------------------

    // Yêu cầu quyền truy cập vị trí
    const requestLocationPermission = async () => {
        const locationPermission = await Location.getForegroundPermissionsAsync();
        if (!locationPermission.granted) {
            const permissionResponse = await Location.requestForegroundPermissionsAsync();
            if (!permissionResponse.granted) {
                ToastAndroid.show('Permission for accessing location is required!', ToastAndroid.SHORT);
                return false;
            }
        }
        return true;
    };

    // Lấy vị trí hiện tại của người dùng
    const getCurrentLocation = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) return;

        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });
            setLatitude(location.coords.latitude);
            setLongitude(location.coords.longitude);
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
            
        } catch (error) {
            console.error("Error getting location:", error);
            ToastAndroid.show('Failed to get location!', ToastAndroid.LONG);
        }
    };

    // Chọn vị trí trên bản đồ
    const pickLocation = () => {
        navigation.navigate("MapPicker");
    };

    useEffect(() => {
        if (route.params?.pickedLocation) {
            const { latitude, longitude } = route.params.pickedLocation;
            setLatitude(latitude);
            setLongitude(longitude);
            setUserLocation({
                latitude,
                longitude,
            });
        }
    }, [route.params?.pickedLocation]);

    // ---------------------- LƯU DỮ LIỆU ----------------------
    // Kiểm tra xem tất cả input có hợp lệ không
    const validateInput = () => {
        if (!title || !imagePath || latitude === null || longitude === null) {
            ToastAndroid.show('All fields are required!', ToastAndroid.SHORT);
            return false;
        }
        return true;
    };

    // Gửi dữ liệu và lưu vào CSDL
    const savePlace = async () => {
        if (!validateInput()) return;
    
        try {
            // Chờ chuyển đổi tọa độ thành địa chỉ
            const newAddress = await convertCoordinatesToAddress(latitude, longitude);
            setAddress(newAddress);
    
            // Chờ thêm địa điểm sau khi đã có địa chỉ
            await addPlace(title, imagePath, latitude, longitude, newAddress, () => {
                setTitle('');
                setImagePath('');
                setLatitude(null);
                setLongitude(null);
                setAddress('');
                navigation.navigate('My Places'); 
                sendNotification(
                    'New Place Added Successfully',
                    `A new place has been added: ${title}`
                );
            });
        } catch (error) {
            console.error('Error while saving place:', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput value={title} onChangeText={setTitle} style={styles.input} />

            <View style={styles.imgcontainer}>
                {imagePath ? (
                    <Image source={{ uri: imagePath }} style={styles.img} />
                ) : (
                    <Text style={styles.imgtext}>No image selected.</Text>
                )}
            </View>

            <View style={styles.buttoncontainer}>
                <TouchableOpacity onPress={pickImageHandler} style={styles.button} >
                    <Text style={styles.btntext}>
                        <Icon name='image' /> Pick Image
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={takeImageHandler} style={styles.button} >
                    <Text style={styles.btntext}>
                        <Icon name='camera' /> Take Image
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.locationcontainer}>
                {userLocation ? (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        region={{
                            latitude: latitude || userLocation.latitude,
                            longitude: longitude || userLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onPress={(e) => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            setLatitude(latitude);
                            setLongitude(longitude);
                        }}
                    >
                        <Marker coordinate={userLocation} title="You are here" />
                    </MapView>
                ) : (
                    <Text style={styles.imgtext}>No location taken yet.</Text>
                )}
            </View>

            <View style={styles.buttoncontainer}>
                <TouchableOpacity onPress={getCurrentLocation} style={styles.button}>
                    <Text style={styles.btntext}><Icon name='map-marker' /> Locate User</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={pickLocation} style={styles.button}>
                    <Text style={styles.btntext}><Icon name='map' /> Pick on Map</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={savePlace} style={styles.submit}>
                <Text style={{color:'white'}}>Save Place</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    imgcontainer: {
        marginBottom: 10,
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    img: {
        width: '100%',
        height: '100%',
        marginBottom: 10,
    },
    imgtext: {
        color: 'gray',
        fontSize: 14,
        textAlign: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
        marginBottom: 10,
    },
    buttoncontainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'blue',
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btntext: {
        textAlign: 'center',
        color: 'blue',
    },
    locationcontainer: {
        marginBottom: 10,
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    submit: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AddPlace;