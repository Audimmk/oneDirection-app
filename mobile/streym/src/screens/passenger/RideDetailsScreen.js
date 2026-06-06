import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { rideService } from '../../services/api';
import { COLORS } from '../../utils/constants';

const RideDetailsScreen = ({ route, navigation }) => {
    const { ride } = route.params;
    const [loading, setLoading] = useState(false);

    const handleBookRide = async () => {
        setLoading(true);
        try {
            const response = await rideService.book({
                rideId: ride.id,
                pickup_address:cride.origin_address,
                pickup_lat: palseFloat(ride.origin_lat),
                pickup_lng: parseFloat(ride.origin_lng),
        });

            Alert.alert(
                'Ride Booked!',
                `Your fare share is $${response.data.fare_share}`,
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
            } catch (error) {
                Alert.alert('Error', error.response?.data?.message || 'Booking failed');
            } finally {
                setLoading(false);
            }
    };

    const fareShare = (ride.total_fare / (ride.booked_seats + 1)).toFixed(2);

    return (
        <ScrollView style={styles.container}>
         <TouchableOpacity
         style={styles.back}
         onPress={() => navigation.goBack()}>
         <Text style={styles.backText}>← Back</Text>
         </TouchableOpacity>
         <Text style={styles.title}>Ride Details</Text>

         <View style={styles.card}>
         <Text style={styles.label}>Driver</Text>
         <Text style={styles.value}>{ride.driver_name}</Text>
         
         <Text style={styles.label}>Vehicle</Text>
         <Text style={styles.value}>
         {ride.vehicle_color} {ride.vehicle_make} {ride.vehicle_model}
         </Text>
         
         <Text style={styles.label}>Plate Number</Text>
         <Text style={styles.value}>{ride.plate_number}</Text>
         
         <Text style={styles.label}>Rating</Text>
         <Text style={styles.value}>{ride.rating} ⭐</Text>
         </View>
         
         <View style={styles.card}>
         <Text style={styles.label}>From</Text> 
         <Text style={styles.value}>📍{ride.origin_address}</Text>

         <Text style={styles.label}>To</Text>
         <Text style={styles.value}>🏁{ride.destination_address}</Text>

         <Text style={styles.label}>Departure</Text>
         <Text style={styles.value}>
         {new Date(ride.departure_time).toLocaleString()}</Text>
         </View>

         <View style={styles.fareCard}>
         <Text style={styles.fareLabel}>Your Fare Share</Text>
         <Text style={styles.fareAmount}>${fareShare}</Text>
         <Text style={styles.fareNote}>
         Split among {ride.booked_seats +1} passengers</Text>
         </View>

         <View style={styles.seatsCard}>
         <Text style={styles.seatsText}>
         {ride.available_seats - ride.booked_seats} seats remaining
         </Text>
         </View>

         <TouchableOpacity
         style={styles.button}
         onPress={handleBookRide}
         disabled={loading}>
         {loading ? (
            <ActivityIndicator color={COLORS.white} />
         ) : (
            <Text style={styles.buttonText}> Book This Ride → ${fareShare}</Text>
         )}
         </TouchableOpacity>
         </ScrollView>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
            padding: 20,
            paddingTop: 50,
        },
        back: {
            marginBottom: 20,
        },
        backText: {
            color: COLORS.primary,
            fontSize: 16,
        },
        title: {
            color: COLORS.white,
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
        },
        card: {
            backgroundColor: COLORS.card,
            borderRadius: 12,
            padding: 16,
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
        fareCard: {
            backgroundColor: COLORS.card,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLORS.primary,
        },
        fareLabel: {
            color: COLORS.grey,
            fontSize: 14,
            marginBottom: 8,
        },
        fareAmount: {
            color: COLORS.primary,
            fontSize: 48,
            fontWeight: 'bold',
        },
        fareNote: {
            color: COLORS.grey,
            fontSize: 12,
            marginTop: 8,
        },
        seatsCard: {
            backgroundColor: COLORS.card,
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            alignItems: 'center',
        },
        seatsText: {
            color: COLORS.white,
            fontSize: 16,
        },
        button: {
            backgroundColor: COLORS.primary,
            borderRadius: 12,
            padding: 18,
            alignItems: 'center',
            marginBottom: 40,
        },
        buttonText: {
            color: COLORS.white,
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    export default RideDetailsScreen;