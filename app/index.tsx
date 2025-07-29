import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import RootStack from "./(navigation)/RootStack";

export default function Index() {
  return (
    <NavigationContainer>
       <RootStack />
    </NavigationContainer>
   
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
    fontSize: 30,
  },

  button: {
    fontSize: 20,
    color: "white",
    backgroundColor: "grey",
  },
});
