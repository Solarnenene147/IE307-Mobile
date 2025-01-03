import React, { useContext } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import Slider from '@react-native-community/slider';
import { SettingContext } from "../SettingContext";

const Setting = () => {
  const { darkMode, toggleDarkMode, fontSize, changFontSize } = useContext(SettingContext);

  const handleSliderChange = (value) => {
    changFontSize(value);
  };

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#000" : "rgb(238, 238, 238)" }]}>
      <View style={styles.dark}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000", fontSize }]}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{
            false: darkMode ? "#666" : "#ccc", // Màu track khi tắt
            true: darkMode ? "#00ff00" : "#007AFF", // Màu track khi bật
          }}
          thumbColor={darkMode ? "#00cc00" : "#0044cc"} // Màu thumb khi bật
        />
      </View>
      <View style={styles.font}>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000", fontSize }]}>Font Size</Text>
        <Text style={[styles.text, { color: darkMode ? "#fff" : "#000", fontSize }]}>{fontSize}</Text>
      </View>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={12}
        maximumValue={36}
        step={2}
        value={fontSize} // Đây là giá trị mặc định (sẽ là 24 nếu chưa thay đổi)
        onSlidingComplete={handleSliderChange} 
        minimumTrackTintColor="#007AFF"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  dark: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  font: {
    width: '100%',
    display:'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
  }
});

export default Setting;
