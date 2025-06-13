import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import SplashScreen from './Screens/SplashScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import HomeScreen from './Screens/HomeScreen';
import RoomsScreen from './Screens/RoomsScreen';
import AddBookingScreen from './Screens/AddBookingScreen';
import BookingsScreen from './Screens/BookingsScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFD700',
    background: '#fff',
    text: '#000',
  },
};

// Drawer after login
function DrawerNavigator({ bookings, setBookings }) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FFD700' },
        headerTintColor: '#000',
        headerTitleStyle: { fontWeight: 'bold' },
        drawerStyle: { backgroundColor: '#FFD700' },
        drawerLabelStyle: { color: '#000', fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Rooms">
  {() => <RoomsScreen bookings={bookings} />}
</Drawer.Screen>

      <Drawer.Screen name="Add Booking">
        {(props) => (
          <AddBookingScreen {...props} bookings={bookings} setBookings={setBookings} />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Bookings">
        {(props) => (
          <BookingsScreen {...props} bookings={bookings} setBookings={setBookings} />
        )}
      </Drawer.Screen>
      
    </Drawer.Navigator>
  );
}

export default function App() {
  const [bookings, setBookings] = useState([]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#FFD700',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="MainApp">
            {() => <DrawerNavigator bookings={bookings} setBookings={setBookings} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
