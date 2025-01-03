import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import Signup from './Signup';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
        name="Sign up" 
        component={Signup} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-plus" color={color} size={size} />
          ),
          headerShown: false,
        }}/>
        <Tab.Screen 
        name="Log in" 
        component={Login} 
        options={{
          tabBarIcon: ({ color, size}) => (
            <Icon name="sign-in" color={color} size={size}/>
          ),
          headerShown: false,
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
