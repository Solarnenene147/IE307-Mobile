import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from './Navigator/HomeScreen';
import Add from './Note/AddNote';
import Edit from './Note/EditNote';
import Setting from './Navigator/Setting';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { SettingContext } from "./SettingContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  const { darkMode, fontSize } = useContext(SettingContext);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Note App" 
        component={HomeScreen} 
        options={{   
          headerShown: true,
          headerTitleAlign: 'center', 
          headerTintColor: darkMode ? 'rgb(46, 104, 229)' : 'orange',
          headerStyle: { backgroundColor: darkMode ? '#000' : '#fff', height: fontSize + 60  },
          headerTitleStyle: { fontSize: fontSize + 5 },
        }}
      />
      <Stack.Screen name="AddNote" component={Add} 
        options={{   
          headerShown: true,
          headerTitleAlign: 'center', 
          headerTintColor: darkMode ? '#fff' : 'black',
          headerStyle: { backgroundColor: darkMode ? 'rgb(30, 30, 30)' : '#fff', height: fontSize + 60  },
          headerTitleStyle: { fontSize: fontSize + 5 },
        }}/>
      <Stack.Screen name="EditNote" component={Edit} 
        options={{   
          headerShown: true,
          headerTitleAlign: 'center', 
          headerTintColor: darkMode ? '#fff' : 'black',
          headerStyle: { backgroundColor: darkMode ? 'rgb(30, 30, 30)' : '#fff', height: fontSize + 60  },
          headerTitleStyle: { fontSize: fontSize + 5 },
        }}/>
    </Stack.Navigator>
  );
};

const BotNav = () => {
  const { darkMode, fontSize } = useContext(SettingContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Settings') {
              iconName = 'gear';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: darkMode ? '#000' : '#fff',
            height: 60,
          },
          tabBarActiveTintColor: 'deepskyblue',
          tabBarInactiveTintColor: darkMode ? '#fff' : '#000',
          tabBarLabelStyle:{
            fontSize: 15,
          }
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
            
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Setting}
          options={{
            headerTitleAlign: 'left', 
            headerTintColor: darkMode ? '#fff' : '#000',
            headerStyle: { backgroundColor: darkMode ? 'rgb(30, 30, 30)' : '#fff', height: fontSize + 60 }, 
            headerTitleStyle: { fontSize: fontSize + 5 },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BotNav;
