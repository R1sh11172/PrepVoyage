import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { IconSymbol } from "./ui/IconSymbol";

export default function PackingListItem({
  item,
  checked,
  onToggle,
  onRemove,
}: {
  item: string;
  checked: boolean;
  onToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={[styles.checkbox, checked && styles.checked]}
        onPress={onToggle}
      />
      <Text style={[styles.itemText, checked && styles.strikethrough]}>
        {item}
      </Text>
      <TouchableOpacity onPress={onRemove}>
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
    marginBottom: 8,
  },
  checkbox: {
    borderColor: "black",
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#FFB74D",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
