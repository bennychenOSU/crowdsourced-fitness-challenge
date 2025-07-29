import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
      {/* Top Background Section with Image and Logo */}
      <View style={styles.headerBackground}>
    
        <Text style={styles.headerText}>Crowd Sourced Fitness Challenges</Text>
      </View>

      {/* Login Card */}
      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Log In</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201A31", // Dark background color from the image
    alignItems: "center",
    justifyContent: "space-between", // Distribute content
    paddingTop: 0, // No padding at the top if header is full width
  },
  headerBackground: {
    width: "100%",
    height: 200, // Adjust height as needed
    backgroundColor: "#3A2E5B", // Placeholder color, ideally this would be an ImageBackground
    justifyContent: "center",
    alignItems: "center",
    // You would typically use ImageBackground here for the track image
    // For now, it's just a colored background
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  loginCard: {
    width: "90%", // Wider card
    backgroundColor: "white",
    borderRadius: 20, // Rounded corners
    padding: 30,
    marginTop: -80, // Pulls the card up to overlap the header
    alignItems: "center",
    shadowColor: "#000", // Shadow for depth
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginTitle: {
    fontSize: 32, // Larger title
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F0F0F0", // Light background for input fields
    borderRadius: 10, // Rounded input fields
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputIcon: {
    fontSize: 20, // Adjust icon size
    marginRight: 10,
    color: "#888", // Icon color
  },
  input: {
    flex: 1, // Take up remaining space
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#6A5ACD", // Purple button color
    borderRadius: 10, // Rounded button
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#6A5ACD", // Purple color for link
    fontSize: 14,
    textDecorationLine: "underline",
  },
  footerContainer: {
    flexDirection: "row",
    marginTop: 40, // Space between login card and footer
    marginBottom: 10,
    alignItems: "center",
  },
  footerText: {
    color: "white",
    fontSize: 16,
    marginRight: 5,
  }
});

