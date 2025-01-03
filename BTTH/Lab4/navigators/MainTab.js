import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./HomeNav";
import CartIconWithBadge from "../badge/CartBadge";
import Categories from "./CategoriesNav";
import Profile from "./ProfileNav";
import Cart from "../screens/Cart";
import Icon from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function MainTab() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    // Đặt icon dựa trên tên route
                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Categories") {
                        iconName = focused ? "grid" : "grid-outline";
                    } else if (route.name === "Cart") {
                        return <CartIconWithBadge color={color} size={size} />;
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person" : "person-outline";
                    }

                    // Trả về icon tương ứng
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#02D0A0", // Màu khi được chọn
                tabBarInactiveTintColor: "gray", // Màu khi không được chọn
                tabBarStyle: { height: 60 }, // Tùy chỉnh chiều cao
                tabBarLabelStyle: { fontSize: 12 }, // Tùy chỉnh font chữ
            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Categories" component={Categories}  options={{ headerShown: false }} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
