//22521152 Huỳnh Minh Phước
import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function Count({ count, type="Like" }) {
    return (
        <View style={styles.action}>
            <Text style={styles.actshow}>
                {count === 1 || count === 0
                    ? count + " " + type
                    : count + " " + type + "s"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    actshow: {
        fontSize: 12,
    },
});

export default Count;
