import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

export default function AdSubmissionScreen({ navigation }: { navigation: any }) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("clientSecret");

  const handleSubmit = async () => {
    if (!title || !imageUrl || !link || !description) {
      Alert.alert("Please fill out all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "ads_audit"), {
        title,
        imageUrl,
        link,
        description,
        createdAt: new Date(),
        clientSecret,
      });

      Alert.alert("Ad submitted!", "It will be audited and then shown in the Explore screen.");
    //   navigation.navigate("Explore");
      router.push("/(tabs)/Explore");
    } catch (error) {
      console.error("Error uploading ad:", error);
      Alert.alert("Error submitting ad", error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.header}>Promote Your Ad</Text>
      <TextInput
        placeholder="Ad Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholderTextColor="#2e7d6f"
      />
      <TextInput
        placeholder="Ad Description"
        value={description}
        onChangeText={setDescription}
        style={[styles.input, styles.multilineInput]}
        multiline
        placeholderTextColor="#2e7d6f"
      />
      <TextInput
        placeholder="Image URL"
        value={imageUrl}
        onChangeText={setImageUrl}
        style={styles.input}
        placeholderTextColor="#2e7d6f"
      />
      <TextInput
        placeholder="Product/Business Link"
        value={link}
        onChangeText={setLink}
        style={styles.input}
        placeholderTextColor="#2e7d6f"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    color: "#2e7d6f",
    marginBottom: 30,
  },
  input: {
    borderColor: "#2e7d6f",
    borderWidth: 2,
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    fontSize: 16,
    color: "#2e7d6f",
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#2e7d6f",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
