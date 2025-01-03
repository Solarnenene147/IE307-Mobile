//22521152 Huỳnh Minh Phước
import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

function Mode({ type, mode = false, toggleSwitch, darkmode = false, notifymode = false }) {
    return (
        <View style={styles.container}>
            <Text style={[
                {color: darkmode ? "white" : "black"}
            ]}>{type}</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#24F996" }} 
                thumbColor={mode ? "#51A980" : "#f4f3f4"} 
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={type === "Dark Mode" ? darkmode : notifymode}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default Mode;
