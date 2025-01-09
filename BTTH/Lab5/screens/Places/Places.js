import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import PlaceItem from './PlaceItem';
import { getPlaces, initPlace } from '../../databases/db';
import { useFocusEffect } from "@react-navigation/native";


const Places = () => {
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
          setIsLoading(true);
          initPlace();
          getPlaces(setPlaces);
          setIsLoading(false);
        }, [])
      );

    const renderPlaceItem = ({ item }) => (
        <View>
            <PlaceItem item={item} />
        </View>
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
              <Text style={{ textAlign: "center" }}>
                No places added yet! Start adding some.
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
    },
});

export default Places;
