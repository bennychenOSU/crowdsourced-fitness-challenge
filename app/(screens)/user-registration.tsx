import { StyleSheet, Text, View } from 'react-native';
export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register Screen</Text>
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
