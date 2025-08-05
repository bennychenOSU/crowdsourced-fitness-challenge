import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import createChallenge from "../(screens)/create-challenge";
import Profile from "../(screens)/profile";
import updateProfile from "../(screens)/update-profile";
import wallOfFame from "../(screens)/wall-of-fame";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="create-challenge" component={createChallenge} />
      <Stack.Screen name="wall-of-fame" component={wallOfFame} />
      <Stack.Screen name="update-profile" component={updateProfile} />
    </Stack.Navigator>
  );
}
