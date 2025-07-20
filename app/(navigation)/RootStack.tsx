import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { createContext, useContext } from "react";
import CreateChallenge from "../(screens)/create-challenge";
import Home from "../(screens)/home";
import login from "../(screens)/login";
import userRegistration from "../(screens)/user-registration";

export default function RootStack() {
  const SignInContext = createContext<boolean>(false);

  function useIsSignedIn() {
    const isSignedIn = useContext(SignInContext);
    return isSignedIn;
  }

  function useIsSignedOut() {
    return !useIsSignedIn();
  }
  const RootStack = createNativeStackNavigator({
    screens: {
      home: {
        if: useIsSignedOut,
        screen: Home,
      },
      login: {
        if: useIsSignedOut,
        screen: login,
      },
      register: {
        if: useIsSignedOut,
        screen: userRegistration,
      },
      createChallenge: {
        if: useIsSignedOut,
        screen: CreateChallenge,
      },
    },
  });

  return (
    <>
      <SignInContext.Provider value={useIsSignedIn()}>
        <RootStack.Navigator>
          <RootStack.Screen name="home" component={Home} />
          <RootStack.Screen name="login" component={login} />
          <RootStack.Screen name="register" component={userRegistration} />
          <RootStack.Screen
            name="Create New Challenge"
            component={CreateChallenge}
          />
        </RootStack.Navigator>
      </SignInContext.Provider>
    </>
  );
}
