import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import MediaNav from './navigations/MediaNav';
import PlacesNav from './navigations/PlacesNav';
import { initPlace } from './databases/db';

const Tab = createBottomTabNavigator();

export default function Main() {
    useEffect(() => {
        initPlace()
          .then(() => {
            console.log('Database initialized successfully!');
          })
          .catch((err) => {
            console.log('Failed to initialize database!', err);
          });
      }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Media') {
                            iconName = 'photo';
                        } else if (route.name === 'Places') {
                            iconName = 'map-marker';
                        }

                        return <FontAwesome name={iconName} size={size} color={color} />;
                    },
                    headerShown: false,
                })}
                tabBarOptions={{
                    activeTintColor: 'blue',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Places" component={PlacesNav} />
                <Tab.Screen name="Media" component={MediaNav} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}