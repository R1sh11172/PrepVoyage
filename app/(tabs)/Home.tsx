import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/firebaseConfig";
import { fetchDestinationImage } from "@/services/imageService"; // Import Unsplash function
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyTripsScreen() {
  const userId = getAuth().currentUser?.uid;
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState({}); // Store images per trip
  console.log("home");
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsRef = collection(db, `users/${userId}/trips`);
        const querySnapshot = await getDocs(tripsRef);
        const tripsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTrips(tripsArray);

        // Fetch images for each trip dynamically
        tripsArray.forEach(async (trip) => {
          const imageUrl = await fetchDestinationImage(
            getSubstringBeforeComma(trip.destination)
          );
          setImages((prevImages) => ({ ...prevImages, [trip.id]: imageUrl }));
        });
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleTripPress = (trip) => {
    router.push({
      pathname: "/PackingList",
      params: {
        tripId: trip.id,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
      },
    });
  };

  function getSubstringBeforeComma(address: string): string {
    const index = address.indexOf(",");
    return index !== -1 ? address.substring(0, index) : address;
  }

  const renderTrip = ({ item }) => (
    <TouchableOpacity
      style={styles.tripCard}
      onPress={() => handleTripPress(item)}
    >
      <ImageBackground
        source={{
          uri:
            images[item.id] || "https://source.unsplash.com/featured/?travel",
        }} // Fallback image
        style={styles.tripImage}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.tripOverlay}>
          <Text style={styles.tripTitle}>
            {getSubstringBeforeComma(item.destination).toUpperCase()}
          </Text>
          <Text style={styles.tripDates}>
            {item.startDate} - {item.endDate}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Trips</Text>
      <View style={styles.separator} />

      {loading ? (
        <ActivityIndicator size="large" color="#00796B" />
      ) : (
        <FlatList
          data={trips}
          renderItem={renderTrip}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Generate Button */}
      <TouchableOpacity
        style={styles.generateButton}
        onPress={() => router.push("/Search")}
      >
        <Text style={styles.generateText}>Generate</Text>
        <Text style={styles.plusSymbol}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 20,
  },
  tripCard: { marginBottom: 15, borderRadius: 15, overflow: "hidden" },
  tripImage: { width: "100%", height: 120, justifyContent: "flex-end" },
  tripOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 15,
  },
  tripTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  tripDates: { fontSize: 14, color: "#fff" },
  separator: {
    height: 2,
    backgroundColor: "#f28b82",
    marginBottom: 24,
    width: "100%",
  },
  generateButton: {
    backgroundColor: "#14B8A6",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  generateText: { color: "white", fontSize: 18, fontWeight: "bold" },
  plusSymbol: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#00796B",
    padding: 12,
    borderRadius: 10,
  },
  navItem: { paddingVertical: 5 },
  navText: { color: "white", fontSize: 14, fontWeight: "bold" },
});
