import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getProductsByCategory, getAllProducts } from '../helps/helps'; // Hàm lấy tất cả sản phẩm
import ProductCard from '../components/ProductCard';

const Categories = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Hiển thị trạng thái tải
      try {
        const data = category
          ? await getProductsByCategory(category) 
          : await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
        setProducts([]);
      } finally {
        setLoading(false); // Tắt trạng thái tải
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <ProductCard item={item} />
    </View>
  );

  return (
    <View>
      {products.length > 0 ? (
        <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        nestedScrollEnabled={true}
        contentContainerStyle={styles.flatListContent}
        numColumns={2}
        renderItem={renderItem}
        />
      ) : (
        <Text>No products found</Text> // Hiển thị nếu không có sản phẩm
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 10,
  },
  flatListContent: {
    paddingBottom: 100,
  },
});

export default Categories;
