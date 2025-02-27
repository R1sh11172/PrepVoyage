import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import WeatherWidget from "@/components/WeatherWidget";
import PackingListItem from "@/components/PackingListItem";

export default function PackingList() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <WeatherWidget />
      <Text style={styles.title}>Location List ✈️</Text>
      <View style={styles.container}>
        <PackingListItem item={"Item 1"} />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
    padding: 20, // Add padding for better spacing
    paddingTop: "10%",
    paddingBottom: 0,
    backgroundColor: "#f8f9fa",
  },
  addButton: {
    backgroundColor: "#009688",
    borderRadius: 999,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
});
