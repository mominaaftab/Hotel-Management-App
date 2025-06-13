import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';

const roomCharges = {
  Single: 100,
  Double: 150,
  Deluxe: 200,
};

const roomNumbersList = [101, 102, 103, 201, 202, 203, 301, 302];

const getRoomType = (roomNo) => {
  if (roomNo >= 101 && roomNo <= 103) return 'Single';
  if (roomNo >= 201 && roomNo <= 203) return 'Double';
  if (roomNo >= 301 && roomNo <= 302) return 'Deluxe';
  return '';
};

const AddBookingScreen = ({ navigation, bookings, setBookings, route }) => {
  const editingBooking = route?.params?.editingBooking;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showRoomList, setShowRoomList] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [charges, setCharges] = useState(roomCharges['Single']);

  useEffect(() => {
    if (editingBooking) {
      setName(editingBooking.name);
      setEmail(editingBooking.email);
      setPhone(editingBooking.phone);
      setSelectedRoom(editingBooking.roomNumber);
      setCheckIn(editingBooking.checkIn);
      setCheckOut(editingBooking.checkOut);
      setPaymentMethod(editingBooking.paymentMethod);
      setCharges(editingBooking.charges);

      const type = getRoomType(editingBooking.roomNumber);  // 🔽 added
    setCharges(roomCharges[type]);
    }
  }, [editingBooking]);

  const availableRooms = roomNumbersList.filter(
    (roomNo) =>
      !bookings.some(
        (b) =>
          b.roomNumber === roomNo &&
          (!editingBooking || b.id !== editingBooking.id)
      )
  );

  const calculateStayDuration = () => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const timeDiff = checkOutDate - checkInDate;
  const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 1; // At least 1 day
};

const resetForm = () => {
  setName('');
  setEmail('');
  setPhone('');
  setCheckIn('');
  setCheckOut('');
  setSelectedRoom(null);
  setPaymentMethod('Cash');
  setShowRoomList(false);
};

  const handleConfirmBooking = () => {
    if (!name || !checkIn || !checkOut || !selectedRoom || !paymentMethod) {
      alert('Please fill all fields');
      return;
    }

    const type = getRoomType(selectedRoom);
    const duration = calculateStayDuration();
    const finalCharges = roomCharges[type] * duration;


    const newBooking = {
      id: editingBooking ? editingBooking.id : Date.now(),
      name,
      email,
      phone,
      roomType: getRoomType(selectedRoom),
      roomNumber: selectedRoom,
      charges: finalCharges,
      checkIn,
      checkOut,
      paymentMethod,
    };

    if (editingBooking) {
      const updatedBookings = bookings.map((b) =>
        b.id === editingBooking.id ? newBooking : b
      );
      setBookings(updatedBookings);
    } else {
      setBookings([...bookings, newBooking]);
    }

    alert('Thank you! Your booking is saved.');
    resetForm();
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
    <ScrollView style={{ height: '100%' }} contentContainerStyle={styles.scrollContainer}>

        <Text style={styles.label}>{editingBooking ? 'Edit Booking' : 'Add Booking'}</Text>

        <TextInput
          placeholder="Enter Your Name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter Your Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Enter Your Mobile"
          placeholderTextColor="#aaa"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />

        <Text style={styles.label}>Room Number</Text>
<TouchableOpacity onPress={() => setShowRoomList(!showRoomList)} style={[styles.input, { justifyContent: 'center' }]}>
  <Text style={{ color: selectedRoom ? '#FFD700' : '#aaa' }}>
    {selectedRoom ? `Room ${selectedRoom}` : 'Tap to select room'}
  </Text>
</TouchableOpacity>

{showRoomList && availableRooms.map((roomNo) => (
  <TouchableOpacity
    key={roomNo}
    style={styles.radioRow}
    onPress={() => {
      setSelectedRoom(roomNo);
      setShowRoomList(false);
    }}
  >
    <View style={styles.radioCircle}>
      {selectedRoom === roomNo && <View style={styles.selectedDot} />}
    </View>
    <Text style={styles.radioText}>{roomNo}</Text>
  </TouchableOpacity>
))}


        <Text style={styles.label}>Check-in Date</Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#aaa"
          value={checkIn}
          onChangeText={setCheckIn}
          style={styles.input}
        />

        <Text style={styles.label}>Check-out Date</Text>
        <TextInput
          placeholder="YYYY-MM-DD"
          placeholderTextColor="#aaa"
          value={checkOut}
          onChangeText={setCheckOut}
          style={styles.input}
        />

        <Text style={styles.label}>Payment Method</Text>
        {['Cash', 'ATM', 'Credit Card'].map((method) => (
          <TouchableOpacity
            key={method}
            style={styles.radioRow}
            onPress={() => setPaymentMethod(method)}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === method && <View style={styles.selectedDot} />}
            </View>
            <Text style={styles.radioText}>{method}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleConfirmBooking}>
          <Text style={styles.buttonText}>
            {editingBooking ? 'Update Booking' : 'Confirm Booking'}
          </Text>
        </TouchableOpacity>
        </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#FFD700',
    fontSize: 16,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radioText: {
    color: '#fff',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FFD700',
  },
  container: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#000',
    padding: 20,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FFD700',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 25,
    width: '80%',
    alignItems: 'center',
    borderColor: '#FFD700',
    borderWidth: 2,
  },
  modalText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddBookingScreen;
