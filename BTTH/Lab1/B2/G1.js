import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function G1({ item, isSelected, onSelect }) {
    return (
        <View style={styles.contain}>
            <Text style={styles.itemtxt}>{item.type}</Text>
            <TouchableOpacity 
                style={[styles.button]} 
                onPress={onSelect}
            >
                <Text style={styles.buttonText}>{isSelected ? 'Deselect' : 'Select'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    contain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor:'white',
        borderRadius:10,
        marginVertical:5,
    },
    itemtxt: {
        fontSize: 15,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#2BABFF',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default G1;
