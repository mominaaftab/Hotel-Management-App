import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, } from 'react-native';

const roomCharges = {
  Single: 100,
  Double: 150,
  Deluxe: 200,
};

const roomTypes = {
  101: 'Single',
  102: 'Single',
  103: 'Single',
  201: 'Double',
  202: 'Double',
  203: 'Double',
  301: 'Deluxe',
  302: 'Deluxe',
};

const roomImages = {
  101: require('../assets/room101.jpg'),
  102: require('../assets/room102.jpg'),
  103: require('../assets/room103.jpg'),
  201: require('../assets/room201.jpg'),
  202: require('../assets/room202.jpg'),
  203: require('../assets/room203.jpg'),
  301: require('../assets/room301.jpg'),
  302: require('../assets/room302.jpg'),
};

const RoomsScreen = ({ bookings }) => {
  const screenWidth = Dimensions.get('window').width;
  const cardSize = (screenWidth - 40) / 2; // 2 columns with margin

  const roomNumbers = Object.keys(roomTypes).map(Number);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.grid}>
        {roomNumbers.map((roomNo) => {
          const type = roomTypes[roomNo];
          const charges = roomCharges[type];
          const isBooked = bookings.some((b) => b.roomNumber === roomNo);

          return (
            <View
              key={roomNo}
              style={[
                styles.roomCard,
                {
                  width: cardSize,
                  height: cardSize + 10,
                  backgroundColor: isBooked ? '#400000' : '#004000',
                },
              ]}
            >
              <View style={styles.imageContainer}>
  <Image
    source={roomImages[roomNo]}
    style={styles.roomImage}
    resizeMode="cover"
  />
  <View style={styles.overlayBox}>
    <Text style={styles.overlayText}>{type}</Text>
    <Text style={styles.overlayText}>${charges}</Text>
  </View>
</View>

              <View style={styles.overlayBottom}>
  <Text style={styles.bottomText}>Room {roomNo}</Text>
  <Text style={[styles.bottomText, { color: isBooked ? 'black' : 'gold' }]}>
    {isBooked ? 'Booked' : 'Available'}
  </Text>
</View>

            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  roomCard: {
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 5,
  },

  imageContainer: {
  position: 'relative',
  width: '100%',
  height: '100%',
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  overflow: 'hidden',
  backgroundColor: 'black',
  borderWidth: 4,
},
roomImage: {
  width: '100%',
  height: '100%',
},
overlayBox: {
  position: 'absolute',
  bottom: 5,
  right: 5,
  backgroundColor: '#006400',
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 5,
  opacity: 0.9,
},
overlayText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: 'bold',
  textAlign: 'center',
},

  overlayBottom: {
  position: 'absolute',
  bottom: 5,
  left: 5,
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  paddingHorizontal: 6,
  paddingVertical: 2,
  borderRadius: 5,
},

bottomText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: 'bold',
},

  cardText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default RoomsScreen;
