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
  Modal,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";

const { height } = Dimensions.get("window");

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

  const handleAndroidDateChange = (
    setDate: React.Dispatch<React.SetStateAction<Date | null>>,
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>
  ) => (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Scrollable Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Select your dates</Text>

        {/* Start Date */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowStartPicker(true)}
            activeOpacity={0.8}
          >
            <FontAwesome name="calendar" size={22} color="#F87171" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#6B7280"
              value={formatDate(startDate)}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>

        {/* End Date */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setShowEndPicker(true)}
          >
            <FontAwesome
              name="calendar"
              size={22}
              color="#F87171"
              style={styles.icon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="MM/DD/YYYY"
              placeholderTextColor="#6B7280"
              value={formatDate(endDate)}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Android Pickers */}
      {showStartPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleAndroidDateChange(setStartDate, setShowStartPicker)}
          minimumDate={new Date()}
          maximumDate={endDate || undefined}
        />
      )}

      {showEndPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleAndroidDateChange(setEndDate, setShowEndPicker)}
          minimumDate={startDate || new Date()}
        />
      )}

      {/* iOS Modal Pickers */}
      {Platform.OS === "ios" && (
        <Modal visible={showStartPicker} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.pickerWrapper}>
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setStartDate(selectedDate || startDate);
                }}
                minimumDate={new Date()}
                maximumDate={endDate || undefined}
              />
              <TouchableOpacity
                style={styles.modalDoneButton}
                onPress={() => setShowStartPicker(false)}
              >
                <Text style={styles.modalDoneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {Platform.OS === "ios" && (
        <Modal visible={showEndPicker} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.pickerWrapper}>
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setEndDate(selectedDate || endDate);
                }}
                minimumDate={startDate || new Date()}
              />
              <TouchableOpacity
                style={styles.modalDoneButton}
                onPress={() => setShowEndPicker(false)}
              >
                <Text style={styles.modalDoneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: "50%" }]} />
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
              (!startDate || !endDate) && styles.disabledButton,
            ]}
            onPress={() =>
              router.push({
                pathname: "/Activities",
                params: {
                  destination,
                  startDate: formatDate(startDate),
                  endDate: formatDate(endDate),
                },
              })
            }
            disabled={!startDate || !endDate}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: height * 0.12,
    paddingBottom: 200,
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  pickerWrapper: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalDoneButton: {
    marginTop: 10,
    backgroundColor: "#14B8A6",
    borderRadius: 20,
    padding: 12,
    alignItems: "center",
  },
  modalDoneText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default SelectDatesScreen;