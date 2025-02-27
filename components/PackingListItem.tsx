import { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";
export default function PackingListItem({ item }: { item: string }) {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={[styles.checkbox, checked && styles.checked]}
        onPress={() => {
          setChecked((prev) => !prev);
        }}
      />
      <Text>{item}</Text>
      <TouchableOpacity>
        <IconSymbol name="xmark" size={20} color="#FF6F61" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkbox: {
    borderColor: "black",
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  xIcon: {
    width: 20,
    height: 20,
  },
  checked: {
    backgroundColor: "#FFB74D",
  },
});
