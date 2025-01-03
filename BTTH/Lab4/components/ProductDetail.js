import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { getProductById } from '../helps/helps';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ProductDetail({ route, navigation }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productData = await getProductById(id);
      setProduct(productData);
      navigation.setOptions({ title: productData.title });
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} /> 
        <Text style={styles.name}>{product.title}</Text>   
        <Text style={styles.detail}>{product.description}</Text>
        <Text style={styles.price}>Price: ${product.price}</Text>
        <Text style={styles.rating}>Rating: {product.rating.rate} <Icon name={"star"} color={"#F5ED0F"}/> ({product.rating.count})</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 16,
    },
    name: {
    fontSize: 20,
    fontWeight: 'bold',
    },
    image: {
        width: "100%",
        height: 310,
    },
    detail: {
        fontSize: 16,
        color: "#333",
        marginVertical: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginVertical: 8,
    },
});