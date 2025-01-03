//22521152 Huỳnh Minh Phước
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function Reaction({
    onClick,
    isClicked = false,
    icon = "thumbs-up",
    type = "Like"
}) {
    return (
        <TouchableOpacity onPress={onClick} style={styles.Button}>
            <View style={styles.iconTextContainer}>
                <Icon name={icon} size={20} color={isClicked ? "#3598db" : "#ccc"}/>
                <Text style={[styles.acttext, { color: isClicked ? "#3598db" : "black" }]}>
                    {type}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    Button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    acttext: {
        marginLeft: 5,
        fontSize: 16,
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default Reaction;
