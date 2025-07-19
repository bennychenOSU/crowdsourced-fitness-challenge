import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext } from 'react';
import Home from '../(screens)/home';
import login from '../(screens)/login';
import userRegistration from '../(screens)/user-registration';

export default function RootStack() {
    const SignInContext = createContext(null);

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
      screen: userRegistration
    },
  },
});

return (<>
    <SignInContext.Provider value={useIsSignedIn()}>
      <RootStack.Navigator>
        <RootStack.Screen name="home" component={Home} />
        <RootStack.Screen name="login" component={login} />
        <RootStack.Screen name="register" component={userRegistration} />
      </RootStack.Navigator>
    </SignInContext.Provider>
</>)
}
