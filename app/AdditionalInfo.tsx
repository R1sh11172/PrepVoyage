import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const { height } = Dimensions.get("window");

const AdditionalInfoScreen = () => {
  const router = useRouter();
  const { destination, startDate, endDate, activities } = useLocalSearchParams();
  const [additionalInfo, setAdditionalInfo] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Additional Information</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textArea}
            placeholder="Enter any additional trip info (e.g., hotel details, transport mode, etc.)"
            placeholderTextColor="#6B7280"
            multiline
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
          />
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: "100%" }]} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
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
                  activities,
                  additionalInfo,
                },
              })
            }
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
    paddingBottom: 200, // Space for footer
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    color: "#00796B",
    marginBottom: 30,
    fontFamily: "Quicksand",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  textArea: {
    borderWidth: 2,
    borderColor: "#14B8A6",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "white",
    height: 120,
    textAlignVertical: "top",
    fontFamily: "Quicksand",
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
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Quicksand",
  },
});

export default AdditionalInfoScreen;
