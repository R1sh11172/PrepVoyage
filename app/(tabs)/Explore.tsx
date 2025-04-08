import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { initStripe, useStripe } from "@stripe/stripe-react-native";
import { useRouter } from "expo-router";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Adjust the import based on your project structure
import Constants from 'expo-constants';

const stripeKey = Constants.expoConfig?.extra?.stripeKey;
const apiUrl = Constants.expoConfig?.extra?.apiUrl;

export default function ExploreScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [ads, setAds] = useState<DocumentData[]>([]);
  const router = useRouter();

  useEffect(() => {
    initStripe({
      publishableKey: stripeKey,
    });

    const fetchAds = async () => {
      const snapshot = await getDocs(collection(db, "ads"));
      const formattedAds = snapshot.docs.map(doc => doc.data());
      setAds(formattedAds);
    };

    fetchAds();
  }, []);

  const handlePromoteAd = async () => {
    const response = await fetch("https://brazen-narrow-ceder.glitch.me/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const { clientSecret } = await response.json();
    console.log("testclientSecret", clientSecret);
    
    const { error: initError } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "PrepVoyage",
    });

    if (initError) {
      Alert.alert("Error initializing payment", initError.message);
      return;
    }

    const { error: paymentError } = await presentPaymentSheet();

    if (paymentError) {
      Alert.alert("Payment failed", paymentError.message);
    } else {
      Alert.alert("Payment successful", "You will prompted to enter ad information");
      router.push({
        pathname: "/AdSubmissionScreen",
        params: {
          clientSecret: clientSecret
        }
      })
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Explore</Text>
        <View style={styles.separator} />

        {ads.map((ad, index) => (
          <View key={index} style={styles.adCard}>
            <ImageBackground
              source={{ uri: ad.image_url }}
              style={styles.adImage}
              imageStyle={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            >
              <View style={styles.adOverlay}>
                <Text style={styles.adTitle}>{ad.title}</Text>
                <Text style={styles.sponsored}>Sponsored Ad</Text>
              </View>
            </ImageBackground>
            <View style={styles.adBody}>
              <TouchableOpacity onPress={() => Linking.openURL(ad.link)}>
                <Text style={styles.adLink}>View offer</Text>
              </TouchableOpacity>
              <Text style={styles.adText}>{ad.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.ctaContainer}>
          <Text style={styles.ctaText}>Want to see your ad here?</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={handlePromoteAd}>
            <Text style={styles.ctaButtonText}>Promote your Ad</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2e7d6f",
    marginBottom: 8,
  },
  separator: {
    height: 2,
    backgroundColor: "#f28b82",
    marginBottom: 24,
    width: "100%",
  },
  adCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    borderColor: "#2e7d6f",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  adImage: {
    height: 120,
    justifyContent: "flex-end",
  },
  adOverlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
  },
  adTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  sponsored: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "right",
  },
  adBody: {
    padding: 12,
  },
  adLink: {
    color: "#2e7d6f",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
  },
  adText: {
    fontSize: 14,
    color: "#333",
  },
  ctaContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  ctaText: {
    fontSize: 16,
    color: "#2e7d6f",
    fontWeight: "500",
    marginBottom: 10,
  },
  ctaButton: {
    backgroundColor: "#2e7d6f",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 2,
  },
  ctaButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
