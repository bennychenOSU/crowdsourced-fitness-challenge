import { SessionContext } from "@/providers/SessionContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useContext, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import ScreenLayout from "../(components)/ScreenLayout";
import { login } from "../../firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useContext(SessionContext);

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      Alert.alert("Login successful!");
      router.push("/challenges"); // Redirect to challenges or main app screen
      if (session?.setUser) {
        const { setUser } = session;
        setUser(user);
      }
    } catch (error: any) {
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <ScreenLayout>
      <Text style={styles.loginTitle}>Log In</Text>

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

      <Button title="Log In" onPress={handleLogin} color="#5865F2" />

      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don&apos;t have an account?</Text>
        <Link href="/register" style={[styles.signUpText, styles.signUpLink]}>
          Sign Up
        </Link>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  loginTitle: {
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
    fontWeight: "bold",
  },
});
