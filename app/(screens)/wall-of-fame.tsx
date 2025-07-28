import React from "react";
import { StyleSheet, View } from "react-native";

export default function wallOfFame() {
  return <View style={styles.container}>Create Challenge</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
