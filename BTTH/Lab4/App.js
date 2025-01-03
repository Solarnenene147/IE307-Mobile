import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Nav from './navigators/MainTab';
import { AuthProvider } from './AuthContext';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Product already exists in the cart',
]);

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Nav" component={Nav} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
    </AuthProvider>
  );
}
