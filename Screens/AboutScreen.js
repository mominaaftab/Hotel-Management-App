// screens/AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <IconButton icon="information" size={50} iconColor="#FFD700" style={{ alignSelf: 'center' }} />
      
      <Text style={styles.heading}>Hotel Management System</Text>
      <Text style={styles.subheading}>Version 1.0</Text>

      <Text style={styles.text}>
        This app allows users to manage hotel bookings with ease — including adding, viewing, and canceling reservations.
      </Text>

      <Text style={styles.developer}>👩‍💻 Developed by: Momina (Moon)</Text>
      <Text style={styles.developer}>🎓 Roll No: 023</Text>

      <Text style={styles.credit}>Made with 💛 using React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 30,
    justifyContent: 'center',
  },
  heading: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  subheading: {
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
  },
  developer: {
    color: '#FFD700',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 4,
  },
  credit: {
    color: '#999',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
  },
});
