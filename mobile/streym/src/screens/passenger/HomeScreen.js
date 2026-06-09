import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { rideService } from '../../services/api';
import { COLORS } from '../../utils/constants';

const HomeScreen = ({ navigation }) => {
    const { user } = useAuth(),
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const response = await rideService.search();
            setRides(response.data.rides);

        } catch (error) {
            console.error('Error fetching rides:', error);
        } finally {
            setLoading (false);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hello,</Text>
                    <Text style={styles.name}>{user?.full_name} 👋</Text>
                </View>
                <TouchableOpacity style={styles.notificationIcon}>
                    <Text style={styles.notificationIcon}>🔔</Text>
                    </TouchableOpacity>
            </View>

            <View style={styles.searchBox}>
                <Text style={styles.searchLabel}>📍Current Location</Text>
                <View style={styles.divider} />
                <Text style={styles.searchPlaceholder}>🔍 Where to?</Text>
            </View>

            <Text style={styles.sectionTitle}>Available Rides</Text>

            {loading ? (
                <ActivityIndicator color={COLORS.primary} size="large" />
            ) : rides.length === 0 ? (
                <Text style={styles.noRides}>No rides available right now</Text>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {rides.map((ride) => (
                        <TouchableOpacity
                        key={ride.id}
                        style={styles.rideCard}
                        onPress={() => navigation.navigate('RideDetails', { ride })}>
                            <View style={styles.rideRoute}>
                                <Text style={styles.rideOrigin}>❓❓{ride.origin_address}</Text>
                                <Text style={styles.rideDest}>🏁{ride.destination_address}</Text>

                            </View>

                            <View style={styles.rideInfo}>
                                <Text style={styles.rideDriver}>🚗 {ride.driver_name}</Text>
                                <Text style={styles.rideFare}>
                                    ${(ride.total_fare / (ride.booked_seats +1)).toFixed(2)}/ seat
                                </Text>
                            </View>
                            <View style={styles.rideFooter}>
                                <Text style={styles.rideSeats}>
                                    {ride.available_seats - ride.booked_seats} seats left
                                </Text>
                                <TouchableOpacity style={styles.bookButton}>
                                    <Text style={styles.bookButtonText}>Book</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: COLORS.background,
        padding: 20,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    greeting: {
        color: COLORS.grey,
        fontSize: 14,
    },
    name: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: 'bold',
    },
    notification: {
        backgroundColor: COLORS.card,
        padding: 10,
        borderRadius: 12,
    },
    notificationIcon: {
        fontSize: 20,
    },
    searchBox: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        marginBottom:24,
    },
    searchLabel: {
        color: COLORS.white,
        fontSize: 14,
        marginBottom: 10,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.lightGrey,
        marginBottom: 10,
    },
    searchPlaceholder: {
        color: COLORS.grey,
        fontSize: 14,
    },
    sectionTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    noRides: {
        color: COLORS.grey,
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    },
    rideCard: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    rideRoute: {
        marginBottom: 10,
    },
    rideOrigin: {
        color: COLORS.white,
        fontSize: 14,
        marginBottom: 4,
    },
    rideDest: {
        color: COLORS.grey,
        fontSize: 14,
    },
    rideInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    rideDriver: {
        color: COLORS.grey,
        fontSize: 13,
    },
    rideFare: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
rideFooter: {
    flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
},
rideSeats: {
    color: COLORS.grey,
    fontSize: 13,
},
bookButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
},
bookButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
},
});
export default HomeScreen;