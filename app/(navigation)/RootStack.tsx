import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createContext, useContext, useState } from "react";
import CreateChallenge from "../(screens)/create-challenge";
import Home from "../(screens)/home";
import login from "../(screens)/login";
import MyChallenges from "../(screens)/my-challenges";
import userRegistration from "../(screens)/register";

export const SignInContext = createContext({
  isSignedIn: false,
  setIsSignedIn: (signedIn: boolean) => {},
});

export default function RootStack() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  function useIsSignedIn() {
    const context = useContext(SignInContext);
    return context.isSignedIn;
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
      myChallenges: {
        if: useIsSignedOut,
        screen: MyChallenges,
      },
    },
  });

  return (
    <>
      <SignInContext.Provider value={{ isSignedIn, setIsSignedIn }}>
        <RootStack.Navigator>
          <RootStack.Screen name="home" component={Home} />
          <RootStack.Screen name="login" component={login} />
          <RootStack.Screen name="register" component={userRegistration} />
          <RootStack.Screen
            name="Create New Challenge"
            component={CreateChallenge}
          />
          <RootStack.Screen name="My Challenges" component={MyChallenges} />
        </RootStack.Navigator>
      </SignInContext.Provider>
    </>
  );
}
