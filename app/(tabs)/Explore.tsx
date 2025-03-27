import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";



export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.separator} />

        {/* Luxury Cruises Card */}
        <View style={styles.card}>
          <ImageBackground
            source={require("../../assets/images/cruisepic.jpeg")} // Example cruise image
            style={styles.image}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.cardTitle}>Luxury Cruises</Text>
            <Text style={styles.sponsored}>*Sponsored Ad</Text>
          </ImageBackground>
          <Text style={styles.cardText}>
            *Offer available until April 17, 2025{'\n'}
            Bundle includes 5-Day Royal Caribbean Cruise aboard Harmony of the Seas.
          </Text>
        </View>

        {/* Ski Bundle Card */}
        <View style={styles.card}>
          <ImageBackground
            source={require("../../assets/images/skiingpic.jpeg")} // Example ski image
            style={styles.image}
            imageStyle={styles.imageStyle}
          >
            <Text style={styles.cardTitle}>Ski Bundle</Text>
            <Text style={styles.sponsored}>*Sponsored Ad</Text>
          </ImageBackground>
          <Text style={styles.cardText}>
            *Offer available until September 29, 2025*{'\n'}
            Bundle includes 2024 Volkl Blaze 82 Skis, Dalbello Veloce Max GW 75 Boots, and ski poles
          </Text>
        </View>
      </ScrollView>
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
