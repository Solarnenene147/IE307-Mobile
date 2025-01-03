import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import MediaNav from './navigations/MediaNav';
import PlacesNav from './navigations/PlacesNav';

const Tab = createBottomTabNavigator();

export default function Main() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'MediaNav') {
                            iconName = 'photo';
                        } else if (route.name === 'PlacesNav') {
                            iconName = 'map-marker';
                        }

                        return <FontAwesome name={iconName} size={size} color={color} />;
                    },
                    headerShown: false,
                })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="MediaNav" component={MediaNav} />
                <Tab.Screen name="PlacesNav" component={PlacesNav} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}