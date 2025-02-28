import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Search, ChevronRight } from "lucide-react-native";

const defaultDestinations = ["Cancun", "Rome", "Lima", "Tokyo", "Honolulu"];

const SearchScreen = () => {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<string[]>(defaultDestinations);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setLoading(true);
      fetch(`https://api.locationiq.com/v1/autocomplete?key=pk.1e0d88588ac16b89ac1c0a31566b040f&q=${searchQuery}&limit=5&dedupe=1&`)
        .then(response => response.json())
        .then(data => {
          setLocations(data.map((loc: any) => loc.display_name));
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLocations(defaultDestinations);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your next destination</Text>
      
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBar}>
          <TextInput 
            placeholder="Search" 
            style={styles.searchInput} 
            placeholderTextColor="#A0A0A0" 
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Search color="#F87171" size={20} />
        </View>
        {/* Autocomplete Dropdown */}
        {locations.length > 0 && (
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
                    setLocations(defaultDestinations);
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
      
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar} />
      </View>
      
      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
        <ChevronRight color="white" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    fontFamily: "Quicksand",
  },
  searchBarContainer: {
    position: "relative",
    zIndex: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#14B8A6",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    width: "100%",
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
  progressBarContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "#E5E7EB",
    marginTop: 24,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    width: "10%",
    backgroundColor: "#14B8A6",
  },
  nextButton: {
    alignSelf: "center",
    backgroundColor: "#14B8A6",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Quicksand",
    marginRight: 8,
  },
});

export default SearchScreen;