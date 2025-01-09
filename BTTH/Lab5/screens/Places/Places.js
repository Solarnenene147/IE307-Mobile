import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import PlaceItem from './PlaceItem';
import { getPlaces, initPlace, deletePlace } from '../../databases/db';
import { useFocusEffect } from "@react-navigation/native";

const Places = () => {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch places data when screen is focused
    useFocusEffect(
        useCallback(() => {
          setIsLoading(true);
          initPlace();
          getPlaces(setPlaces);  // Fetch the places and set them
          setIsLoading(false);
        }, [])
    );

    // Handle deletion of place
    const handleDelete = (id) => {
      setPlaces(prevPlaces => prevPlaces.filter(place => place.id !== id));  // Remove the place from the list
    };

    const renderPlaceItem = ({ item }) => (
        <PlaceItem item={item} onDelete={handleDelete} />  // Pass handleDelete to PlaceItem
    );

    return (
        <View style={styles.container}>
          {places.length > 0 ? (
            <FlatList
              data={places}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderPlaceItem}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          ) : isLoading ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator size="large" color="#cf3339" />
            </View>
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={styles.text}>
                No places found.
                {"\n"}
                Maybe start <Text style={{...styles.text, color: 'red'}}>adding</Text> some!
              </Text>
            </View>
          )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: '#666',
        textAlign: 'center',
    },
});

export default Places;
