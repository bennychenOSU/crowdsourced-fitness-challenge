// src/(screens)/home.tsx
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Welcome To Crowd Sourced Fitness Challenge!</Text>
      <Link href="/login" style={styles.link}>Login</Link>
      <Link href="/register" style={styles.link}>Register</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#5865F2",
    color: "white",
    borderRadius: 5,
  },
});