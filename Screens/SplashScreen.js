// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000); // 3 seconds
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./Logo.png')} // Replace with your custom image
        style={styles.logo}
      />
      <Text style={styles.text}>Welcome to Golden Luxe Hotel</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  text: {
    color: 'gold',
    fontSize: 35,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
