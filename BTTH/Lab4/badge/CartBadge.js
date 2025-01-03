import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../AuthContext";

function CartIconWithBadge({ color, size }) {
  const { countCart } = useContext(AuthContext);
  return (
    <View style={{ width: size, height: size }}>
      <Icon name="shopping-cart" size={size} color={color} />
      {countCart > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{countCart}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 8,
    fontWeight: "bold",
  },
});

export default CartIconWithBadge;
