import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CateScreen from './CategoriesTop';
import ProductDetail from '../components/ProductDetail';

const CateStack = createStackNavigator();

const CateNav = () => {
    return (
        <CateStack.Navigator>
            <CateStack.Screen name="Categories" component={CateScreen} options={({ route }) => ({
                    headerLeft: () => null, // Không hiển thị nút trở về
                    gestureEnabled: false, // Không cho phép vuốt để trở về
                })} />
            <CateStack.Screen 
                name="ProductDetail" 
                component={ProductDetail} 
                options={({ route }) => ({ title: route.params.title })} 
            />            
        </CateStack.Navigator>
    );
};

export default CateNav;