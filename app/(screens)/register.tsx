import { Link, useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { signup } from "../../firebase/auth";
import ScreenLayout from "../(components)/ScreenLayout";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    console.log('Handling sign up...');
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      console.log('Calling signup function...');
      await signup(email, password, displayName);
      console.log('Signup successful!');
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("create-profile");
    } catch (error: any) {
      console.error('Sign up error:', error);
      Alert.alert("Sign Up failed", error.message);
    }
  };

  return (
    <ScreenLayout>
      <Text style={styles.signUpTitle}>Sign Up</Text>

      <View style={styles.inputField}>
        <MaterialIcons name="person" size={20} color="#333" style={styles.icon} />
        <TextInput
          placeholder="Full Name"
          value={displayName}
          onChangeText={setDisplayName}
          style={styles.input}
        />
      </View>

      <View style={styles.inputField}>
        <MaterialIcons name="email" size={20} color="#333" style={styles.icon} />
        <TextInput
          placeholder="your@email.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputField}>
        <MaterialIcons name="lock" size={20} color="#333" style={styles.icon} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputField}>
        <MaterialIcons name="lock" size={20} color="#333" style={styles.icon} />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <Button title="Sign Up" onPress={handleSignUp} color="#5865F2" />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Link href="/login" style={[styles.loginText, styles.loginLink]}>
          Log In
        </Link>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  signUpTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#333",
  },
  loginLink: {
    color: "#5865F2",
    marginLeft: 5,
    fontWeight: "bold",
  },
});
