import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="login" options={{ title: 'Login'}} />
      <Stack.Screen name="profile" options={{ title: 'Profile'}} />
      <Stack.Screen name="create-challenge" options={{ title: 'Create Challenges'}} />
      <Stack.Screen name="wal-of-fame" options={{ title: 'Wall Of Fame'}} />
    </Stack>
  );
}
