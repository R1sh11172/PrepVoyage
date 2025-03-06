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
import { db } from "@/firebaseConfig";
import { useLocalSearchParams } from "expo-router";

export default function PackingList() {
  const { destination, startDate, endDate, activities } =
    useLocalSearchParams();
  const [packingList, setPackingList] = useState<Set<string>>(new Set());

  async function fetchListBasedOnWeather(location: string) {
    const loc = location.toLowerCase();
    const weathers = await fetchWeatherBasedOnLocation(loc);
    if (weathers) {
      const ref = doc(db, "testData", "weather");
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const lists = docSnap.data();
        for (const weather of weathers) {
          if (lists[weather]) {
            setPackingList((prev) => new Set([...prev, ...lists[weather]]));
          }
        }
      }
    }
  }

  async function fetchWeatherBasedOnLocation(location: string) {
    const ref = doc(db, "testData", "destinations");
    const docSnap = await getDoc(ref);
    const loc = location.toLowerCase();
    if (docSnap.exists()) {
      if (docSnap.data()[loc]) {
        return docSnap.data()[loc] as string[];
      }
    }

    return [];
  }

  useEffect(() => {
    fetchListBasedOnWeather(destination);
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <WeatherWidget />
      <Text style={styles.title}>{destination} List ✈️</Text>
      <View style={[styles.container, styles.packingListContainer]}>
        {[...packingList].map((item, index) => (
          <PackingListItem
            key={index}
            item={item}
            onRemove={() => {
              setPackingList(
                (prev) => new Set([...prev].filter((i) => i !== item))
              );
            }}
          />
        ))}
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
  packingListContainer: {
    flexDirection: "column",
    display: "flex",
    gap: 10,
  },
});
