import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Media from '../screens/Media/Media';
import Record from '../screens/Media/Record';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MediaStack = createStackNavigator();

const MediaNav = () => {
  return (
    <MediaStack.Navigator initialRouteName="Media">
      <MediaStack.Screen
        name="My Gallery"
        component={Media}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Record Video')} 
              style={{ marginRight: 15, padding: 5 }}
            >
              <Icon name="video-camera" size={30} color="blue" />
            </TouchableOpacity>
          ),
        })}
      />
      <MediaStack.Screen name="Record Video" component={Record}/>
    </MediaStack.Navigator>
  );
};


export default MediaNav;
