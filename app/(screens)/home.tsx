import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Button, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../(navigation)/types';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'home'>;

export default function Home() {

 
  const navigate = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text>Welcome To Crowd Sourced Fitness Challenge!</Text>
      {<Button title="login" onPress={() => navigate.navigate('login')} />}
       {<Button title="register" onPress={() => navigate.navigate('register')} />}
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