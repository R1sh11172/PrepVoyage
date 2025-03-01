import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Button, Alert, StyleSheet } from 'react-native';
import { register, login } from '../services/authService';
import { useNavigation, useRouter } from 'expo-router';



const logo = require('../assets/prepvoyage-logo.jpg');
export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const router = useRouter(); 

  const handleRegister = async () => {
    try {
      const user = await register(email, password);
      Alert.alert('Success', `User registered: ${user.email}`);
      router.replace('/Search');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      Alert.alert('Success', `Welcome back: ${user.email}`);
      router.replace('/Search');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>PREPVOYAGE</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#00796B"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#00796B"
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => (isLogin ? setIsLogin(false) : handleRegister())}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => (isLogin ? handleLogin() : setIsLogin(true))}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Take the first step to your dream vacation</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // White background
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B', // Dark teal
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  input: {
    width: '90%',
    borderWidth: 1.5,
    borderColor: '#4DB6AC', // Light teal
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#00796B',
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 15,
  },
  signUpButton: {
    borderWidth: 2,
    borderColor: '#00796B', // Dark teal
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  signUpText: {
    fontSize: 16,
    color: '#00796B',
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#009688', // Teal
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  loginText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 30,
    fontSize: 14,
    color: '#4DB6AC', // Light teal
    textAlign: 'center',
  },
});
