// src/navigation/AppNavigator.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Import createNativeStackNavigator
import React, { useContext } from "react";

// Make sure these paths are correct relative to AppNavigator.tsx

// Import all your screen components
import { SessionContext } from "@/providers/SessionContext";
import ChallengesScreen from "../(screens)/challenges";
import CreateChallengeScreen from "../(screens)/create-challenge"; // Renamed variable
import Home from "../(screens)/home";
import LoginScreen from "../(screens)/login"; // Renamed variable to avoid conflict
import ProfileScreen from "../(screens)/profile"; // Renamed variable
import UserRegistrationScreen from "../(screens)/register"; // Renamed variable
import UpdateUserProfileScreen from "../(screens)/update-profile"; // Renamed variable
import WallOfFameScreen from "../(screens)/wall-of-fame"; // Renamed variable

const AuthStack = createNativeStackNavigator(); // Create the stack navigator
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={UserRegistrationScreen} />
    </AuthStack.Navigator>
  );
}

const AppStack = createNativeStackNavigator(); // Create the stack navigator
function AppStackNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Challenges" component={ChallengesScreen} />
      <AppStack.Screen
        name="CreateChallenge"
        component={CreateChallengeScreen}
      />
      <AppStack.Screen name="Profile" component={ProfileScreen} />
      <AppStack.Screen
        name="UpdateProfile"
        component={UpdateUserProfileScreen}
      />
      <AppStack.Screen name="WallOfFame" component={WallOfFameScreen} />
    </AppStack.Navigator>
  );
}

export default function AppNavigator() {
  const session = useContext(SessionContext);
  return !session?.user ? <AppStackNavigator /> : <AuthStackNavigator />;
}
