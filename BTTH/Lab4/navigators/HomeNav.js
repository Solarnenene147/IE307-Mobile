import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import ProductDetail from '../components/ProductDetail';

const HomeStack = createStackNavigator();

const HomeNav = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={({ route }) => ({
                    headerLeft: () => null, // Không hiển thị nút trở về
                    gestureEnabled: false, // Không cho phép vuốt để trở về
                })}
            />
            <HomeStack.Screen 
                name="ProductDetail" 
                component={ProductDetail} 
                options={({ route }) => ({ title: route.params.title })} 
            />            
        </HomeStack.Navigator>
    );
};

export default HomeNav;