import React from "react";
import { StyleSheet } from "react-native";
import AppNavigator from "./(navigation)/AppNavigator";

export default function Index() {
  return <AppNavigator />;
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
    fontSize: 30,
  },

  button: {
    fontSize: 20,
    color: "white",
    backgroundColor: "grey",
  },
});
