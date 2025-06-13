// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigation.replace('MainApp'); // ✅ Replaces the login screen with the drawer app

    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="gold"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="gold"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
  <Text style={styles.loginButtonText}>Login</Text>
</TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don't have an account? <Text style={{fontWeight: 'bold' }}> Sign up</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gold',
    color: 'gold',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  loginButton: {
  backgroundColor: 'gold',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 10,
},
loginButtonText: {
  color: 'black',
  fontWeight: 'bold',
  fontSize: 16,
},

  link: {
    color: 'gold',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default LoginScreen;
