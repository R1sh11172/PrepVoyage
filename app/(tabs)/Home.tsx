import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';


export default function Home() {
  

return (
  <ScrollView style={styles.scrollContainer}>
    <Text style={styles.title}>PrepVoyage ✈️</Text>
  </ScrollView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  padding: 20,
  backgroundColor: '#f8f9fa',
},
title: {
  fontSize: 48,
  fontWeight: 'bold',
  marginVertical: 20,
  textAlign: 'center',
},
subtitle: {
  fontSize: 24,
  fontWeight: 'bold',
  marginVertical: 20,
  textAlign: 'center',
},
scrollContainer: {
  flex: 1,
  padding: 20, // Add padding for better spacing
  paddingBottom: 0,
  backgroundColor: '#f8f9fa',
}
});