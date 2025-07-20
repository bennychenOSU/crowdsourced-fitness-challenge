import React from "react";
import { Text, View } from "react-native";

export interface TagProps {
  text: string;
  onClear: () => void;
  inCreateScreen?: boolean;
}

export default function Tag({ text, onClear, inCreateScreen }: TagProps) {
  return (
    <View
      style={{
        backgroundColor: "#e0e0e0",
        borderRadius: 12,
        padding: 8,
        margin: 4,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
        alignSelf: "flex-start",
      }}
    >
      <Text
        onPress={onClear}
        numberOfLines={1}
        style={{ color: "#333", fontSize: 14 }}
      >
        {`${inCreateScreen ? "✓ " : ""}${text}`}
      </Text>
      <Text onPress={onClear} style={{ fontSize: 14 }}>
        x
      </Text>
    </View>
  );
}
