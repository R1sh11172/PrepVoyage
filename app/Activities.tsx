import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const { height } = Dimensions.get("window");

const activitiesList = [
  "Food",
  "Relaxation",
  "Tours",
  "Landmarks",
  "Bars",
  "Beaches",
  "Nature",
  "Hidden Gems",
  "Museums",
  "Shopping",
  "Adventure",
  "Nightlife",
  "Outdoor Activities",
  "Cultural Experiences",
];

const ActivitiesScreen = () => {
  const router = useRouter();
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const { destination, startDate, endDate } = useLocalSearchParams();

  const toggleSelection = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity)
        : [...prev, activity]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>What do you want to do?</Text>

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
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: "75%" }]} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedActivities.length === 0 && styles.disabledButton,
            ]}
            onPress={() =>
              router.push({
                pathname: "/AdditionalInfo",
                params: {
                  destination,
                  startDate,
                  endDate,
                  activities: selectedActivities,
                },
              })
            }
            disabled={selectedActivities.length === 0}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: height * 0.12,
    paddingBottom: 200, // space for fixed footer
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  disabledButton: {
    backgroundColor: "#A7A7A7",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Quicksand",
  },
});

export default ActivitiesScreen;