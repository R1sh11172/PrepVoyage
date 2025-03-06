import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router"; // Using useRouter for navigation

const { width, height } = Dimensions.get("window");

const activitiesList = [
  "Food",
  "Relaxation",
  "Tours",
  "Landmarks",
  "Bars",
  "Beaches",
  "Nature",
  "Hidden Gems",
];

const ActivitiesScreen = () => {
  const router = useRouter();
  const [selectedActivities, setSelectedActivities] = useState([]);
  const { destination, startDate, endDate } = useLocalSearchParams();

  const toggleSelection = (activity) => {
    setSelectedActivities(
      (prev) =>
        prev.includes(activity)
          ? prev.filter((item) => item !== activity) // Deselect if already selected
          : [...prev, activity] // Select if not already selected
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>What do you want to do?</Text>

      {/* Activity Buttons */}
      <View style={styles.activitiesContainer}>
        {activitiesList.map((activity) => (
          <TouchableOpacity
            key={activity}
            style={[
              styles.activityButton,
              selectedActivities.includes(activity) &&
                styles.selectedActivityButton,
            ]}
            onPress={() => toggleSelection(activity)}
          >
            <Text
              style={[
                styles.activityText,
                selectedActivities.includes(activity) &&
                  styles.selectedActivityText,
              ]}
            >
              {activity}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: "75%" }]} />
      </View>

      {/* Back & Next Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            router.push({
              pathname: "/PackingList",
              params: {
                destination,
                startDate,
                endDate,
                activities: selectedActivities,
              },
            })
          }
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    paddingTop: height * 0.12,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    color: "#00796B",
    marginBottom: 30,
    fontFamily: "Quicksand",
  },
  activitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  activityButton: {
    borderWidth: 2,
    borderColor: "#14B8A6",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 6,
    backgroundColor: "white",
  },
  selectedActivityButton: {
    backgroundColor: "#14B8A6",
  },
  activityText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    fontFamily: "Quicksand",
  },
  selectedActivityText: {
    color: "white",
  },
  progressBarContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "#E5E7EB",
    marginTop: height * 0.24,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#14B8A6",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 10,
  },
  backButton: {
    backgroundColor: "#14B8A6",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  nextButton: {
    backgroundColor: "#14B8A6",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Quicksand",
  },
});

export default ActivitiesScreen;
