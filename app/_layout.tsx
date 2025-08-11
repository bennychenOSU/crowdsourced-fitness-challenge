import { SessionProvider } from "@/providers/SessionProvider";
import { Slot } from "expo-router";
import { View } from "react-native";

export default function Layout() {
  return (
    <SessionProvider>
      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </SessionProvider>
  );
}
