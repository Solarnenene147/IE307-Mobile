import React, { useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "../AuthContext";
import { jwtDecode } from "jwt-decode";
import { getUser } from "../helps/helps";
import { getUser as getUserFromDB, saveUser } from "../database/db";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  const { userToken, logOut } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: {
      firstname: "John",
      lastname: "Doe",
    },
    username: "johnd",
    email: "john@gmail.com",
    phone: "1-570-236-7033",
    address: {
      street: "new road",
      number: "7682",
      city: "kilcoole",
    },
  });
  const isUserIncomplete = (user) => {
    return (
      !user.name ||
      !user.name.firstname ||
      !user.name.lastname ||
      !user.username ||
      !user.email ||
      !user.phone ||
      !user.address ||
      !user.address.street ||
      !user.address.number ||
      !user.address.city
    );
  };
  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        setLoading(true);
        const decoded = jwtDecode(userToken);
        const userId = decoded.sub;
        if (getUserFromDB(userId) === null) {
          try {
            const user = await getUser(userId);
            const userData = { ...user, cart: [] };
            saveUser(userId, userData);
            setUser(userData);
          } catch (error) {
            console.error("Failed to fetch user data", error);
          } finally {
            setLoading(false);
          }
        } else {
          try {
            const user = await getUserFromDB(userId);
            if (isUserIncomplete(user)) {
              const userInfo = await getUser(userId);
              const userData = { ...userInfo, cart: [] };
              saveUser(userId, userData);
              setUser(userData);
            } else {
              console.log(user);
              setUser(user);
            }
          } catch (error) {
            console.error("Failed to fetch user data", error);
          } finally {
            setLoading(false);
          }
        }
      };

      fetchUser();
    }, [userToken])
  );

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          logOut();
          navigation.navigate("Login");
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" color="#cf3339" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "hhttps://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // URL ảnh đại diện
          }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text
            style={styles.fullName}
          >{`${user.name.firstname} ${user.name.lastname}`}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfile", { user })}
          >
            <Icon name="edit" size={24} color="#02D0A0" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Name:</Text>
          <Text
            style={styles.infoText}
          >{`${user.name.firstname} ${user.name.lastname}`}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Username:</Text>
          <Text style={styles.infoText}>{user.username}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Email:</Text>
          <Text style={styles.infoText}>{user.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Phone:</Text>
          <Text style={styles.infoText}>{user.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Address:</Text>
          <Text style={styles.infoText}>
            {`${user.address.number}, ${user.address.street}, ${user.address.city}`}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  fullName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  infoTitle: {
    fontWeight: "bold",
    width: 100,
  },
  infoText: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "#02D0A0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
