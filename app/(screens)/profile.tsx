import { StyleSheet, View } from 'react-native';
import UpdateProfile from '../(components)/update-profile';

export default function Profile() {
  return (
    <View style={styles.container}>
       <UpdateProfile/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
})