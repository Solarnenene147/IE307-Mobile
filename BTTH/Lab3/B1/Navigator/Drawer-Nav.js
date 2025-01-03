import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './Drawer-Nav/Home';
import Help from './Drawer-Nav/Help';
import Notification from './Drawer-Nav/Notification';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="home" size={20} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Notifications" 
        component={Notification} 
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="bell" size={20} color={color} />
          ),
        }} 
      />
      <Drawer.Screen 
        name="Help" 
        component={Help} 
        options={{
          drawerIcon: ({ color }) => (
            <Icon name="question" size={20} color={color} />
          ),
        }} 
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
