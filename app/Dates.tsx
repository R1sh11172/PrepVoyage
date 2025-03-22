import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get("window");

const SelectDatesScreen = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const { destination } = useLocalSearchParams();

  const formatDate = (date: Date | null) => {
    return date
      ? date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      : "";
  };

  const onChangeDate = (
    setDate: React.Dispatch<React.SetStateAction<Date | null>>,
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>
  ) => (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === "ios"); // Keep the picker open for iOS until dismissed manually
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Select your dates</Text>

      {/* Start Date */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowStartPicker(true)}
        >
          <FontAwesome name="calendar" size={22} color="#F87171" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="MM/DD/YYYY"
            placeholderTextColor="#6B7280"
            value={formatDate(startDate)}
            editable={false}
          />
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate(setStartDate, setShowStartPicker)}
          />
        )}
      </View>

      {/* End Date */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setShowEndPicker(true)}
        >
          <FontAwesome name="calendar" size={22} color="#F87171" style={styles.icon} />
          <TextInput
            style={styles.textInput}
            placeholder="MM/DD/YYYY"
            placeholderTextColor="#6B7280"
            value={formatDate(endDate)}
            editable={false}
          />
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate(setEndDate, setShowEndPicker)}
          />
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: "50%" }]} />
      </View>

      {/* Back & Next Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, (!startDate || !endDate) && styles.disabledButton]}
          onPress={() =>
            router.push({
              pathname: "/Activities",
              params: { destination, startDate: formatDate(startDate), endDate: formatDate(endDate) },
            })
          }
          disabled={!startDate || !endDate}
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
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#14B8A6",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    fontFamily: "Quicksand",
  },
  progressBarContainer: {
    width: "100%",
    height: 4,
    backgroundColor: "#E5E7EB",
    marginTop: height * 0.28,
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

export default SelectDatesScreen;
