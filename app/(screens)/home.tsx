// src/(screens)/home.tsx
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNotification } from '../(utilities)/NotificationGenerator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';

const LAST_NOTIFICATION_KEY = 'last_notification_date';

type AuthStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Home'>;

export default function Home() {
  const navigate = useNavigation<HomeScreenNavigationProp>();
  const { showNotification } = useNotification();

  useEffect(() => {
    const checkAndShowNotification = async () => {
      try {
        const today = new Date().toISOString().split('T')[0]; // e.g., '2025-08-04'
        const lastShown = await AsyncStorage.getItem(LAST_NOTIFICATION_KEY);

        if (lastShown != today) {
          // Show notification
          showNotification('Welcome back! Make sure to check in on your active challenges 😊');

          // Update stored date
          await AsyncStorage.setItem(LAST_NOTIFICATION_KEY, today);
        }
      } catch (error) {
        console.error('Error checking notification date:', error);
      }
    };

    checkAndShowNotification();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text>Welcome To Crowd Sourced Fitness Challenge!</Text>
      {/* Ensure 'Login' and 'Register' match the screen names in AuthStackNavigator */}
      {<Button title="Login" onPress={() => navigate.navigate('Login')} />}   
      {<Button title="Register" onPress={() => navigate.navigate('Register')} />}
      {<Button
        title="create challenge"
        onPress={() => navigate.navigate("CreateChallenge")}
      />}
      <Button
        title="my challenges"
        onPress={() => navigate.navigate("My Challenges")}
      />
    </View>
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
  },
});
