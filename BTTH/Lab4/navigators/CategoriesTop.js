import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Sử dụng Icon từ react-native-vector-icons
import Categories from '../screens/Categories';

const CategoriesTop = () => {
    const categories = ['All', 'Electronics', 'Jewelery', "Men's Clothing", "Women's Clothing"];
    const icons = {
        All: 'th-large', // Icon cho 'All'
        Electronics: 'mobile', // Icon cho 'Electronics'
        Jewelery: 'diamond', // Icon cho 'Jewelery'
        "Men's Clothing": 'male', // Icon cho 'Men's Clothing'
        "Women's Clothing": 'female', // Icon cho 'Women's Clothing'
    };

    const [selectedCategory, setSelectedCategory] = useState('all'); // Mặc định chọn 'All'

    return (
        <View style={{ flex: 1 }}>
            {/* Thanh lựa chọn danh mục */}
            <View style={{ padding: 10 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedCategory(category.toLowerCase())}
                            style={{
                                minWidth: 80,
                                marginHorizontal: 10,
                                padding: 12,
                                backgroundColor: selectedCategory === category.toLowerCase() ? '#C6F9ED' : '#ddd',
                                borderRadius: 5,
                                borderBottomWidth: selectedCategory === category.toLowerCase() ? 2 : 0,
                                borderBottomColor: selectedCategory === category.toLowerCase() ? '#02D0A0' : 'transparent',
                                flexDirection: 'column', // Sắp xếp icon và text theo hàng ngang
                                alignItems: 'center', // Căn giữa icon và text
                            }}
                        >
                            <Icon
                                name={icons[category]} // Lấy tên icon tương ứng với danh mục
                                size={20} // Kích thước của icon
                                color={selectedCategory === category.toLowerCase() ? '#02D0A0' : 'black'} // Màu của icon
                                style={{ marginRight: 5 }} // Khoảng cách giữa icon và text
                            />
                            <Text
                                style={{
                                    color: selectedCategory === category.toLowerCase() ? '#02D0A0' : 'black',
                                    fontWeight: selectedCategory === category.toLowerCase() ? 'bold' : 'normal',
                                    textAlign: 'center', // Căn giữa text
                                }}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Component hiển thị sản phẩm */}
            <View style={{ flex: 1 }}>
                <Categories category={selectedCategory === 'all' ? '' : selectedCategory} />
            </View>
        </View>
    );
};

export default CategoriesTop;
