import { getAuth, updateEmail, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // For demonstration

  const handleUpdate = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "No user is signed in.");
      return;
    }
    try {
      // Update display name
      if (name) await updateProfile(user, { displayName: name });
      // Update email
      if (email && email !== user.email) await updateEmail(user, email);
      Alert.alert("Success", "Your profile has been updated!");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update profile.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your new name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your new email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Update Profile" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    maxWidth: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
});