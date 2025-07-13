import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { login } from '../../firebase/auth';

export default function Login() {
     const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      Alert.alert('Login successful!');
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    }
  };

  const handleRegister = async () => {
  }

  return (
    <View style={styles.container}>
      <Text>Welcome To Crowd Sourced Fitness Challenge!</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {<Button title="Login" onPress={handleLogin} />}
       {<Button title="Register" onPress={handleRegister} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
});