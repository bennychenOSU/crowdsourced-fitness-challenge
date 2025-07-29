// RootStack.tsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useContext, useState } from "react";
import CreateChallenge from "../(screens)/create-challenge";
import Home from "../(screens)/home";
import login from "../(screens)/login";
import MyProfileScreen from "../(screens)/profile";
import UpdateUserProfile from "../(screens)/update-user-profile";
import userRegistration from "../(screens)/user-registration";

export const SignInContext = createContext({
  isSignedIn: false,
  setIsSignedIn: (signedIn: boolean) => {},
});

// 1. Define the stack navigator object outside the component or memoize it.
//    Use a distinct name like 'Stack' to avoid collision with the component name.
const Stack = createNativeStackNavigator();

export default function RootStack() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  // These functions are for your custom authentication logic, not navigator configuration.
  function useIsSignedIn() {
    const context = useContext(SignInContext);
    return context.isSignedIn;
  }

  function useIsSignedOut() {
    return !useIsSignedIn();
  }

  return (
    <>
      <SignInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
        {/* 2. Use Stack.Navigator and Stack.Screen components directly */}
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="login" component={login} />
          <Stack.Screen name="register" component={userRegistration} />
          <Stack.Screen
            name="Create New Challenge"
            component={CreateChallenge}
          />
          <Stack.Screen
            name="updateUserProfile" // The name used for navigation
            component={UpdateUserProfile} // The component to render for this screen
          />
          <Stack.Screen
            name="profile" // The name used for navigation
            component={MyProfileScreen} // The component to render for this screen
          />
        </Stack.Navigator>
      </SignInContext.Provider>
    </>
  );
}