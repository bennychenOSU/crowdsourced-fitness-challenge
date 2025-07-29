// src/(screens)/home.tsx
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View } from 'react-native';

type AuthStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Home'>;

export default function Home() {
  const navigate = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Welcome To Crowd Sourced Fitness Challenge!</Text>
      {/* Ensure 'Login' and 'Register' match the screen names in AuthStackNavigator */}
      {<Button title="Login" onPress={() => navigate.navigate('Login')} />}   
      {<Button title="Register" onPress={() => navigate.navigate('Register')} />}
      <Button title="login" onPress={() => navigate.navigate("login")} />
      <Button title="register" onPress={() => navigate.navigate("register")} />
      <Button
        title="create challenge"
        onPress={() => navigate.navigate("Create New Challenge")}
      />
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
