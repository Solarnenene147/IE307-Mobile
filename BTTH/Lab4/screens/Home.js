import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { getAllProducts } from '../helps/helps';
import { Dimensions } from 'react-native';
import ProductCard from '../components/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [hotProducts, setHotProducts] = useState([]);
  const width = Dimensions.get("window").width;
  const [isLoading, setIsLoading] = useState(true);

  const bannerData = [
    { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUZ-PJSlJ0116PxrD2eL3FY_-RMwHX0sLvsQ&s" },
    { uri: "https://www.addictioncenter.com/app/uploads/2023/07/ShoppingAddiction.jpeg" },
    { uri: "https://llv.edu.vn/media/2019/08/2-shooping.jpg" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getAllProducts();
        setNewProducts(products.filter((product) => product.rating.rate <= 4));
        setHotProducts(products.filter((product) => product.rating.rate > 4));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text>{item.title}</Text>      
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Shopping is an art. You are an artist.</Text>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={bannerData}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.uri }} style={styles.image} />
          </View>
        )}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.subheader}>Hot Deals <FontAwesomeIcon icon={faFire} size={15} color='red' /></Text>
        <FlatList
          data={hotProducts}
          keyExtractor={(item) => item.id.toString()}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.flatListContent}
          numColumns={2}
          renderItem={renderItem}
          scrollEnabled={false}
          />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.subheader}>New Arrivals</Text>
        <FlatList
          data={newProducts}
          keyExtractor={(item) => item.id.toString()}
          nestedScrollEnabled={true}
          contentContainerStyle={styles.flatListContent}
          numColumns={2}
          renderItem={renderItem}
          scrollEnabled={false}
          />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FCFAFA',
    },
  title: {
    color: '#02D0A0',
    fontStyle: 'italic',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
  },
  itemContainer: {
    backgroundColor: "transparent",
    borderRadius: 5,
    height: 150,
    paddingHorizontal: 10,
    alignItems: 'center',
    width:"50%",
    height: "fit-content",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    marginVertical: 10,
    width: "100%",
  },
});

export default Home;