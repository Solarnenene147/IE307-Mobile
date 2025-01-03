import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import Nav from './Nav';
import { AuthProvider } from './AuthContext'; // Đảm bảo đường dẫn đến AuthContext


const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
          <Stack.Screen name="Nav" component={Nav} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
