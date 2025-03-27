import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";



export default function Account() {
  return (
    <SafeAreaView style={styles.container}>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, marginBottom: 20},
  title: { fontSize: 36, fontWeight: "600", color: "#2e7d6f" },
  separator: { height: 2, backgroundColor: "#f28b82", marginVertical: 10 },
  card: { marginBottom: 25 },
  image: { height: 100, justifyContent: "space-between", padding: 10 },
  imageStyle: { borderRadius: 15 },
  cardTitle: { color: "#fff", fontSize: 20, fontWeight: "600" },
  sponsored: { color: "#fff", fontWeight: "500", textAlign: "right" },
  cardText: { marginTop: 5, fontSize: 14, color: "#000" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2e7d6f",
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: 20,
  },
  navItem: { alignItems: "center" },
  navText: { color: "#fff", fontSize: 12, marginTop: 2 },
});
