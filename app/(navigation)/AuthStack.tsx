// src/navigation/AuthStack.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../(screens)/home";
import Login from "../(screens)/login";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
}
