// SignupScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (email && password) {
      navigation.navigate('Login'); // After sign-up go back to login
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
      <TouchableOpacity style={styles.SignupButton} onPress={handleSignup}>
        <Text style={styles.SignupButtonText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? <Text style={{fontWeight: 'bold' }}> Back to Login</Text></Text>
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
 SignupButton: {
  backgroundColor: 'gold',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 10,
},
SignupButtonText: {
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

export default SignupScreen;
