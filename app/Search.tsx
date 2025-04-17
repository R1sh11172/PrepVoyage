import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Search, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router"; // Import useRouter
import Constants from 'expo-constants';

const locationIq = Constants.expoConfig?.extra?.locationIq;

const { width, height } = Dimensions.get("window");

const defaultDestinations = [
  "Cancun",
  "Rome",
  "Lima",
  "Tokyo",
  "Honolulu",
  "Paris",
  "Sydney",
  "New York",
  "Barcelona",
  "Dubai",
];
const SearchScreen = () => {
  const router = useRouter(); // Initialize useRouter
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<string[]>(defaultDestinations);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0.1);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    if (searchQuery.length > 2) {
      setLoading(true);
      fetch(
        `https://api.locationiq.com/v1/autocomplete?key=${locationIq}&q=${searchQuery}&limit=5&dedupe=1&`
      )
        .then((response) => response.json())
        .then((data) => {
          setLocations(data.map((loc: any) => loc.display_name));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLocations(defaultDestinations);
    }
  }, [searchQuery]);

  const handleNext = () => {
    setProgress(0.3);
    router.push({
      pathname: "/Dates",
      params: { destination: selectedDestination },
    }); // Navigate to the next screen using useRouter
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowDropdown(false);
      }}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.content}>
          <Text style={styles.title}>Choose your next destination</Text>
  
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Search"
                style={styles.searchInput}
                placeholderTextColor="#6B7280"
                value={searchQuery}
                onChangeText={(text) => {
                  setSearchQuery(text);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              <Search color="#F87171" size={22} />
            </View>
  
            {/* Autocomplete Dropdown */}
            {showDropdown && locations.length > 0 && (
              <View style={styles.dropdown}>
                <FlatList
                  data={locations}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedDestination(item);
                        setSearchQuery(item);
                        setShowDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
  
          {loading && <ActivityIndicator size="small" color="#14B8A6" />}
  
          {/* Suggested Popular Destinations */}
          <View style={styles.destinationContainer}>
            {defaultDestinations.map((destination) => (
              <TouchableOpacity
                key={destination}
                style={styles.destinationButton}
                onPress={() => {
                  setSelectedDestination(destination);
                  setSearchQuery(destination);
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.destinationText}>{destination}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
  
        {/* Fixed Footer */}
        <View style={styles.footer}>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
  
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedDestination && styles.disabledButton,
            ]}
            onPress={handleNext}
            disabled={!selectedDestination}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: height * 0.15,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    color: "#00796B",
    marginBottom: 30,
    fontFamily: "Quicksand",
  },
  searchBarContainer: {
    alignSelf: "center",
    width: "90%",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#14B8A6",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontFamily: "Quicksand",
  },
  dropdown: {
    position: "absolute",
    top: 50,
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#14B8A6",
    borderRadius: 10,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Quicksand",
  },
  destinationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 30,
  },
  destinationButton: {
    borderWidth: 1,
    borderColor: "#14B8A6",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    margin: 6,
  },
  destinationText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    fontFamily: "Quicksand",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.12,
    paddingBottom: 200, // space for footer
  },
  
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  
  nextButton: {
    backgroundColor: "#14B8A6",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 16,
  },
  
  disabledButton: {
    backgroundColor: "#A7A7A7",
  },
  
  nextButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Quicksand",
  },
  
  progressBarContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 20,
  },
  
  progressBar: {
    height: "100%",
    backgroundColor: "#14B8A6",
  },
  
});

export default SearchScreen;
