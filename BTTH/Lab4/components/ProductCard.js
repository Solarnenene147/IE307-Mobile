import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { jwtDecode } from "jwt-decode";
import { addToCart } from "../database/db";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ToastAndroid } from 'react-native';

export default function ProductCard({ item }) {
    
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('ProductDetail', { id: item.id, title: item.title });
    };

    const { userToken, updateCountCart, countCart } = useContext(AuthContext);
    const user = userToken !== "" ? jwtDecode(userToken) : null;

    const handleAddToCart = async (userId, product) => {
        const newProduct = {
        productId: product.id,
        title: product.title,
        quantity: 1,
        price: product.price,
        image: product.image,
        };

        try {
        await addToCart(userId, newProduct);
        updateCountCart(countCart + 1);
        } catch (error) {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Image source={{ uri: item.image }} style={styles.img} />
            <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
            <View style={styles.subcontainer}>
                <View>
                    <Text style={styles.price}>${item.price}</Text>
                    <Text style={styles.rating}>
                        {item.rating.rate} <Icon name="star" color="#F5ED0F" /> ({item.rating.count})
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                    style={styles.cart}
                    onPress={async () => await handleAddToCart(user.sub, item)}
                    >
                        <Icon name="plus" size={15} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 12,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    img: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 8,
        width: '90%',
    },
    subcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    price: {
        fontSize: 14,
        color: '#f02d1f',
        textAlign: 'left',
        marginVertical: 4,
    },
    cart: {
        backgroundColor: '#02D0A0',
        borderRadius: 50,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginTop: 10,
        alignItems: 'center',
    },
});
