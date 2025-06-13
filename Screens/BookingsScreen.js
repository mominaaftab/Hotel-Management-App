import React, { useState } from 'react';
import {
  View,Text,FlatList,StyleSheet,ScrollView,TouchableOpacity,Modal,
} from 'react-native';

const BookingsScreen = ({ navigation, bookings, setBookings }) => {
  const [modalVisible, setModalVisible] = useState(false); // for details modal
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // for delete confirmation
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const openDetails = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setModalVisible(false);
    setSelectedBooking(null);
  };

  const confirmDeleteBooking = (booking) => {
    setBookingToDelete(booking);
    setDeleteModalVisible(true);
  };

  const cancelDelete = () => {
    setBookingToDelete(null);
    setDeleteModalVisible(false);
  };

  const handleDelete = () => {
    if (!bookingToDelete) return;
    const filtered = bookings.filter((b) => b.id !== bookingToDelete.id);
    setBookings(filtered);
    setDeleteModalVisible(false);
    setBookingToDelete(null);
    // Close details modal if open and showing the deleted booking
    if (modalVisible && selectedBooking?.id === bookingToDelete.id) {
      closeDetails();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ height: '100%' }} contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Your Bookings</Text>
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{item.name || 'No name provided'}</Text>

              <Text style={styles.label}>Room Number:</Text>
              <Text style={styles.value}>{item.roomNumber || 'No room provided'}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={() => openDetails(item)}>
                  <Text style={styles.buttonText}>👁️ View</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => confirmDeleteBooking(item)}
                >
                  <Text style={styles.buttonText}>❌ Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No bookings yet.</Text>}
        />

        {/* Details Modal */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Booking Details</Text>
              {selectedBooking && (
                <>
                  <Text style={styles.label}>Name:</Text>
                  <Text style={styles.value}>{selectedBooking.name}</Text>

                  <Text style={styles.label}>Room Type:</Text>
                  <Text style={styles.value}>{selectedBooking.roomType}</Text>

                  <Text style={styles.label}>Room Number:</Text>
                  <Text style={styles.value}>{selectedBooking.roomNumber}</Text>

                  <Text style={styles.label}>Payment Method:</Text>
                  <Text style={styles.value}>{selectedBooking.paymentMethod || 'N/A'}</Text>

                  <Text style={styles.label}>Charges:</Text>
                  <Text style={styles.value}>{selectedBooking.charges || 'N/A'}</Text>

                  <Text style={styles.label}>Check-In:</Text>
                  <Text style={styles.value}>{selectedBooking.checkIn}</Text>

                  <Text style={styles.label}>Check-Out:</Text>
                  <Text style={styles.value}>{selectedBooking.checkOut}</Text>
                </>
              )}

              <TouchableOpacity onPress={closeDetails} style={[styles.button, { marginTop: 20 }]}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal visible={deleteModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={[styles.modalTitle, { fontSize: 18 }]}>
                Are you sure you want to cancel the reservation?
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#555', paddingHorizontal: 20 }]}
                  onPress={cancelDelete}
                >
                  <Text style={[styles.buttonText, { color: '#FFD700' }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: '#FF3333', paddingHorizontal: 20 }]}
                  onPress={handleDelete}
                >
                  <Text style={styles.buttonText}>Cancel Resrervation</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  title: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#111',
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 16,
  },
  empty: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default BookingsScreen;
