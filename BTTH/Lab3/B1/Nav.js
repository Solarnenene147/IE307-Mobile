import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DrawerNav from "./Navigator/Drawer-Nav";
import CateNav from "./Navigator/Cate-Nav";
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

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',   
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { display: 'flex' },
            })}
        >
            <Tab.Screen name="Home" component={DrawerNav} options={{ headerShown: false }} />
            <Tab.Screen name="Categories" component={CateNav} />
            <Tab.Screen name="Favorite" component={Favorite} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default Nav;
