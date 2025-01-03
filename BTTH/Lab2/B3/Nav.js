import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Navigator/Home";
import Categories from "./Navigator/Catgories";
import Favorite from "./Navigator/Favorite";
import Profile from "./Navigator/Profile";
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function Nav() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Categories') {
                    iconName = 'th-large';
                } else if (route.name === 'Favorite') {
                    iconName = 'heart';
                } else if (route.name === 'Profile') {
                    iconName = 'user';
                }

                // Return the icon component
                return <Icon name={iconName} size={size} color={color} />;
            },
        })}
        tabBarOptions={{
            activeTintColor: 'blue',   // Màu khi được chọn
            inactiveTintColor: 'gray',   // Màu khi không được chọn
        }}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Tab.Screen name="Categories" component={Categories} options={{ headerShown: false }}/>
            <Tab.Screen name="Favorite" component={Favorite} options={{ headerShown: false }}/>
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
        </Tab.Navigator>
    );
}

export default Nav;
