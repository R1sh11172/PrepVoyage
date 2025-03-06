import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import WeatherWidget from "@/components/WeatherWidget";
import PackingListItem from "@/components/PackingListItem";
import { db } from "@/firebaseConfig";
import { useLocalSearchParams } from "expo-router";

export default function PackingList() {
  const { destination, startDate, endDate, activities } = useLocalSearchParams();
  const [packingList, setPackingList] = useState<Set<string>>(new Set());
  const [listName, setListName] = useState(destination + " List ✈️");
  const [newItem, setNewItem] = useState("");
  const [initialized, setInitialized] = useState(false);

  const getUserPackingList = async (destination: string) => {
    const ref = doc(db, "testData", "users", getAuth().currentUser.uid, destination.toLowerCase());
    const docSnap = await getDoc(ref);
    if (docSnap.exists() && docSnap.data()) {
      setPackingList(new Set(docSnap.data().list));
      return true;
    }
    return false;
  };

  useEffect(() => {
    const fetchList = async () => {
      await getUserPackingList(destination.toLowerCase());
    };
    fetchList();
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      const ref = doc(db, "testData", "users", getAuth().currentUser.uid, destination.toLowerCase());
      setDoc(ref, { list: [...packingList] });
    }
  }, [packingList]);

  const addItem = () => {
    if (newItem.trim() !== "") {
      setPackingList((prev) => new Set([...prev, newItem.trim()]));
      setNewItem("");
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <WeatherWidget />
      <TextInput
        style={styles.titleInput}
        value={listName}
        onChangeText={setListName}
      />
      <View style={[styles.container, styles.packingListContainer]}>
        {[...packingList].map((item, index) => (
          <PackingListItem
            key={index}
            item={item}
            onRemove={() => setPackingList((prev) => new Set([...prev].filter((i) => i !== item)))}
          />
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Add an item"
        value={newItem}
        onChangeText={setNewItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={addItem}>
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
  titleInput: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    borderBottomWidth: 1,
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  addButton: {
    backgroundColor: "#009688",
    borderRadius: 999,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  packingListContainer: {
    flexDirection: "column",
    gap: 10,
  },
});
