import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../utils/constants';

const ActiveRideScreen = ({ navigation, route }) => {
  const { ride } = route.params;
  const [status, setStatus] = useState('waiting');

  const getStatusText = () => {
    switch (status) {
      case 'waiting': return '⏳ Waiting for driver...';
      case 'arriving': return '🚗 Driver is arriving!';
      case 'started': return '🛣️ Ride in progress...';
      case 'completed': return '✅ You have arrived!';
      default: return 'Loading...';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'waiting': return COLORS.grey;
      case 'arriving': return COLORS.primary;
      case 'started': return COLORS.primary;
      case 'completed': return COLORS.success;
      default: return COLORS.grey;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>🗺️ Live Map</Text>
        <Text style={styles.mapSubText}>Map will show here</Text>
      </View>
      <View style={styles.card}>
        <Text style={[styles.status, { color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
        <View style={styles.divider} />
        <Text style={styles.label}>From</Text>
        <Text style={styles.value}>📍 {ride.origin_address}</Text>
        <Text style={styles.label}>To</Text>
        <Text style={styles.value}>🏁 {ride.destination_address}</Text>
        <Text style={styles.label}>Driver</Text>
        <Text style={styles.value}>🚗 {ride.driver_name}</Text>
        <Text style={styles.label}>Your Fare</Text>
        <Text style={styles.fare}>${ride.fare_share}</Text>
        {status === 'completed' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: COLORS.white,
    fontSize: 32,
    marginBottom: 8,
  },
  mapSubText: {
    color: COLORS.grey,
    fontSize: 14,
  },
  card: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 40,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    marginBottom: 16,
  },
  label: {
    color: COLORS.grey,
    fontSize: 12,
    marginBottom: 4,
    marginTop: 10,
  },
  value: {
    color: COLORS.white,
    fontSize: 16,
  },
  fare: {
    color: COLORS.primary,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActiveRideScreen;