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
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get("window");

const AdditionalInfoScreen = () => {
  const router = useRouter();
  const { destination, startDate, endDate, activities } = useLocalSearchParams();
  const [additionalInfo, setAdditionalInfo] = useState("");

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Additional Information</Text>

      {/* Text Input */}
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

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: "75%" }]} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() =>
            router.push({
              pathname: "/PackingList",
              params: { destination, startDate, endDate, activities, additionalInfo },
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
  },
  progressBarContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "#E5E7EB",
    marginTop: height * 0.25,
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

export default AdditionalInfoScreen;
