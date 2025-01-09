import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Places from '../screens/Places/Places';
import PlaceItem from '../screens/Places/PlaceItem';
import AddPlace from '../screens/Places/AddPlace';
import Map from '../screens/Places/MapPicker';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PlaceStack = createStackNavigator();

const PlaceNav = () => {
  return (
    <PlaceStack.Navigator initialRouteName="My Places">
      <PlaceStack.Screen
        name="My Places"
        component={Places}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Add a new Place')} 
              style={{ marginRight: 10 }}
            >
              <Icon name="plus" size={30} color="#333" />
            </TouchableOpacity>
          ),
        })}
      />
      <PlaceStack.Screen name="PlaceItem" component={PlaceItem} 
      options={({
        route: {
          params: { title },
        },
      }) => ({ title })}/>
      <PlaceStack.Screen name="Add a new Place" component={AddPlace} />
      <PlaceStack.Screen name="Map" component={Map} />
    </PlaceStack.Navigator>
  );
};

export default PlaceNav;
