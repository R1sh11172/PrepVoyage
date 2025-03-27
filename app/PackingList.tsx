import React, { useState, useEffect, useId } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import WeatherWidget from "@/components/WeatherWidget";
import PackingListItem from "@/components/PackingListItem";
import { useLocalSearchParams } from "expo-router";
import { generatePackingList } from "@/services/geminiService";
import { useRouter } from "expo-router";

import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";


export default function PackingList() {
  const router = useRouter();
  const { tripId, destination, startDate, endDate, activities, additionalInfo } = useLocalSearchParams();
  // Expect packingList to be an object with category keys and array of strings as values.
  const [packingList, setPackingList] = useState<{ [category: string]: { name: string, checked: boolean }[] }>({});
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const userId = getAuth().currentUser?.uid;

  useEffect(() => {
    const fetchPackingList = async () => {
      try {
        const listRef = doc(db, `users/${userId}/packingLists/${tripId}`);
        const docSnap = await getDoc(listRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
        
          // Migrate old string[] format to new { name, checked }[] format
          const migratedList: { [category: string]: { name: string; checked: boolean }[] } = {};
          Object.entries(data).forEach(([category, items]) => {
            if (Array.isArray(items)) {
              if (typeof items[0] === "string") {
                // Old format
                migratedList[category] = items.map((item) => ({ name: item, checked: false }));
              } else {
                // New format
                migratedList[category] = items as { name: string; checked: boolean }[];
              }
            }
          });
        
          setPackingList(migratedList);
        } else {

          const geminiResponse = await generatePackingList(
            destination,
            startDate,
            endDate,
            activities.split(","),
            additionalInfo || ""
          );
  
          // Validate and normalize the response.
          // For each category, ensure we have an array of strings.
          const validatedList: { [category: string]: { name: string; checked: boolean }[] } = {};
          Object.entries(geminiResponse).forEach(([category, items]) => {
            if (Array.isArray(items)) {
              validatedList[category] = items.map((item) => ({ name: item, checked: false }));
            } else if (typeof items === "string") {
              validatedList[category] = items
                .split(/\r?\n/)
                .map((item) => item.trim())
                .filter((item) => item.length > 0)
                .map((item) => ({ name: item, checked: false }));
            } else {
              validatedList[category] = [];
            }
          });
  
          setPackingList(validatedList);
        }
      } catch (error) {
        console.error("Failed to fetch packing list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackingList();
  }, []);

  const addItem = () => {
    if (newCategory.trim() && newItem.trim()) {
      setPackingList((prev) => {
        const categoryInput = newCategory.trim();
        const existingCategoryKey = Object.keys(prev).find(
          (key) => key.toLowerCase() === categoryInput.toLowerCase()
        );
  
        const targetCategory = existingCategoryKey || categoryInput;
  
        return {
          ...prev,
          [targetCategory]: [...(prev[existingCategoryKey] || []), { name: newItem.trim(), checked: false }],
        };
      });
  
      setNewCategory("");
      setNewItem("");
    }
  };

  const generateRandomTripId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let tripId = "";
    for (let i = 0; i < 12; i++) {
      tripId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return tripId;
  };

  function getSubstringBeforeComma(address: string): string {
    const index = address.indexOf(',');
    return index !== -1 ? address.substring(0, index) : address;
  }

  const savePackingList = async () => {
    try {
      let finalTripId = tripId ? tripId : generateRandomTripId(); // Generate if empty

      const listRef = doc(db, `users/${userId}/packingLists/${finalTripId}`);
      await setDoc(listRef, packingList);

      const tripRef = doc(db, `users/${userId}/trips/${finalTripId}`);
      await setDoc(tripRef, {
        id: finalTripId,
        destination,
        startDate,
        endDate,
        imageUrl: `https://source.unsplash.com/featured/?${destination}`, // Auto-generate an image
      });

      router.push({
        pathname: "/Home",
      })

      alert("Packing list & trip saved successfully!");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save. Try again.");
    }
  };


  return (
    <ScrollView style={styles.scrollContainer}>
      {/* <WeatherWidget /> */}
      <Text style={styles.title}>{getSubstringBeforeComma(destination)} Packing List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#009688" />
      ) : (
        <View style={styles.packingListContainer}>
          {Object.entries(packingList).map(([category, items], index) => (
            <View key={index} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
              {Array.isArray(items) &&
                items.map((item, i) => (
                  <PackingListItem
                    key={i}
                    item={item.name}
                    checked={item.checked}
                    onToggle={() => {
                      setPackingList((prev) => ({
                        ...prev,
                        [category]: prev[category].map((el, j) =>
                          j === i ? { ...el, checked: !el.checked } : el
                        ),
                      }));
                    }}
                    onRemove={() =>
                      setPackingList((prev) => ({
                        ...prev,
                        [category]: prev[category].filter((_, j) => j !== i),
                      }))
                    }
                  />
                ))}
            </View>
          ))}
        </View>
      )}

      {/* Section for adding a custom item */}
      <TextInput
        style={styles.input}
        placeholder="Enter category"
        value={newCategory}
        onChangeText={setNewCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Add an item"
        value={newItem}
        onChangeText={setNewItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={addItem}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Save Packing List & Trip */}
      <TouchableOpacity style={styles.saveButton} onPress={savePackingList}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  categoryContainer: { marginBottom: 20 },
  categoryTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#00796B" },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
  addButton: {
    backgroundColor: "#009688",
    borderRadius: 999,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  addButtonText: { color: "#fff", fontSize: 24, textAlign: "center" },
  packingListContainer: { flexDirection: "column", gap: 10 },
  saveButton: {
    backgroundColor: "#14B8A6",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 20,
  },
  saveButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default PackingList;