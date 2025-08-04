import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { signup } from "../../firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Home: undefined;
  // Add other screen names here
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Register() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      await signup(email, password, displayName);
      Alert.alert("Success", "Account created successfully!");
      // Navigate to login or main app
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Sign Up failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require("../../assets/images/background.jpg")}
        style={styles.backgroundImage}
      />

      {/* Logo and Title */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.jpg")}
          style={styles.logo}
        />
        <Text style={styles.title}>FitChallenge</Text>
      </View>

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Sign Up Title */}
        <Text style={styles.signUpTitle}>Sign Up</Text>

        {/* Name Input */}
        <View style={styles.inputField}>
          <MaterialIcons
            name="person"
            size={20}
            color="#333"
            style={styles.icon}
          />
          <TextInput
            placeholder="Full Name"
            value={displayName}
            onChangeText={setDisplayName}
            style={styles.input}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputField}>
          <MaterialIcons
            name="email"
            size={20}
            color="#333"
            style={styles.icon}
          />
          <TextInput
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputField}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#333"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputField}>
          <MaterialIcons
            name="lock"
            size={20}
            color="#333"
            style={styles.icon}
          />
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        {/* Sign Up Button */}
        <Button title="Sign Up" onPress={handleSignUp} color="#5865F2" />

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.loginText, styles.loginLink]}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  logo: {
    width: 50,
    height: 50,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },

  formContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    marginTop: -50,
    elevation: 5, // For shadow on Android
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  signUpTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
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
