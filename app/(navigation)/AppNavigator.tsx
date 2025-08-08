// src/navigation/AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Import createNativeStackNavigator
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native'; // Added StyleSheet

// Make sure these paths are correct relative to AppNavigator.tsx
import { auth } from '../../firebase/config'; // Your Firebase auth instance

// Import all your screen components
import CreateChallengeScreen from '../(screens)/create-challenge'; // Renamed variable
import Home from '../(screens)/home';
import LoginScreen from '../(screens)/login'; // Renamed variable to avoid conflict
import ProfileScreen from '../(screens)/profile'; // Renamed variable
import UserRegistrationScreen from '../(screens)/register'; // Renamed variable
import UpdateUserProfileScreen from '../(screens)/update-profile'; // Renamed variable
import WallOfFameScreen from '../(screens)/wall-of-fame'; // Renamed variable


const AuthStack = createNativeStackNavigator();
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Profile" component={ProfileScreen} />
     
      <AppStack.Screen name="CreateChallenge" component={CreateChallengeScreen} />
      <AppStack.Screen name="CreateChallenge" component={CreateChallengeScreen} />
      <AppStack.Screen name="WallOfFame" component={WallOfFameScreen} />
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={UserRegistrationScreen} />
    </AuthStack.Navigator>
  );
}

const AppStack = createNativeStackNavigator();
function AppStackNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Profile" component={ProfileScreen} />
      <AppStack.Screen name="updateProfile" component={UpdateUserProfileScreen} />
      <AppStack.Screen name="CreateChallenge" component={CreateChallengeScreen} />
      <AppStack.Screen name="WallOfFame" component={WallOfFameScreen} />
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={UserRegistrationScreen} />
    </AppStack.Navigator>
  );
}


export default function AppNavigator() {


  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (
    user ? <AppStackNavigator /> : <AuthStackNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});