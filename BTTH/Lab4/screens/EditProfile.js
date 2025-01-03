import React, { useState, useLayoutEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { saveUser } from "../database/db";

export default function EditProfileScreen({ route, navigation }) {
  const { user } = route.params;
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    saveUser(user.id, formData);
    navigation.goBack();
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          onPress={handleSave}
        >
          <Icon name="check" size={30} color="#02D0A0" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, formData]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.nameGroup}>
        <View style={styles.nameItem}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name.firstname}
            onChangeText={(text) =>
              handleChange({ ...formData.name, firstname: text })
            }
          />
        </View>
        <View style={styles.nameItem}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name.lastname}
            onChangeText={(text) =>
              handleChange({ ...formData.name, lastname: text })
            }
          />
        </View>
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={formData.username}
          onChangeText={(text) => handleChange("username", text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={formData.phone}
          onChangeText={(text) => handleChange("phone", text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>House Number</Text>
        <TextInput
          style={styles.input}
          value={formData.address.number}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              address: { ...formData.address, number: text },
            })
          }
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Street</Text>
        <TextInput
          style={styles.input}
          value={formData.address.street}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              address: { ...formData.address, street: text },
            })
          }
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={formData.address.city}
          onChangeText={(text) =>
            setFormData({
              ...formData,
              address: { ...formData.address, city: text },
            })
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  nameGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    width: "100%",
  },
  nameItem: {
    width: "48%",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
});
