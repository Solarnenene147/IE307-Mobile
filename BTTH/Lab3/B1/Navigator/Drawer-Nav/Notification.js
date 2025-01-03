import React from 'react';
import { View, Text, Button } from 'react-native';

const Notification = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications screen</Text>
      <Button 
        title="Go to Details" 
        onPress={() => navigation.navigate('NotificationsDetailsScreen')} // Điều hướng sang NotiDetail
      />
    </View>
  );
};

export default Notification;
