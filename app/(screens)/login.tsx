import React, { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { login } from "../../firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert("Login successful!");
    } catch (error: any) {
      Alert.alert("Login failed", error.message);
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
        {/* Log In Title */}
        <Text style={styles.loginTitle}>Log In</Text>

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
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* Log In Button */}
        <Button title="Log In" onPress={handleLogin} color="#5865F2" />

        {/* Forgot Password */}
        <Text style={styles.forgotPassword}>Forgot Password?</Text>

        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don&apos;t have an account?</Text>
          <Text style={[styles.signUpText, styles.signUpLink]}>Sign Up</Text>
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

  loginTitle: {
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

  forgotPassword: {
    textAlign: "center",
    marginTop: 10,
    color: "#5865F2",
  },

  signUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  signUpText: {
    fontSize: 14,
    color: "#333",
  },

  signUpLink: {
    color: "#5865F2",
    marginLeft: 5,
  },
});
