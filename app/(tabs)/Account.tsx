import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "expo-router";

export default function Account() {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/"); // redirect to login or splash screen
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  const getMonthYear = (timestamp: number) => {
    const date = new Date(timestamp);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <View style={styles.separator} />

        <FontAwesome name="user-circle" size={100} color="#f28b82" style={styles.icon} />

        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.since}>
          User since: {user?.metadata?.creationTime ? getMonthYear(new Date(user.metadata.creationTime).getTime()) : "N/A"}
        </Text>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sign-Out</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, justifyContent: "flex-start" },
  title: { fontSize: 36, fontWeight: "600", color: "#2e7d6f", alignSelf: "center" },
  separator: { height: 2, backgroundColor: "#f28b82", marginVertical: 10, width: "80%", alignSelf: "center" },
  icon: { alignSelf: "center", marginTop: 20 },
  greeting: { fontSize: 22, color: "#2e7d6f", textAlign: "center", marginTop: 20 },
  email: { fontSize: 18, fontWeight: "600", color: "#2e7d6f", textAlign: "center", marginTop: 5 },
  since: { fontSize: 16, color: "#555", textAlign: "center", marginTop: 10 },
  signOutButton: {
    backgroundColor: "#2e7d6f",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  signOutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2e7d6f",
    paddingVertical: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: "auto",
  },
  navItem: { alignItems: "center" },
  navText: { color: "#fff", fontSize: 12, marginTop: 2 },
});
