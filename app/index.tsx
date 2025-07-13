import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crowd Sourced Fitness Challenges</Text>
      <Link href="/login" style={styles.button}>
        Login For More
      </Link>
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
    fontSize:30
  },

   button: {
    fontSize: 20,
    color: 'white',
    backgroundColor: "grey"
  },
});

