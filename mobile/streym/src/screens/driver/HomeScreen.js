import React, { useState, useEffect } from 'react';
import { View,
     Text,
      StyleSheet,
       TouchableOpacity,
    ScrollView,
Switch, } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { rideService} from '../../services/api';
import { COLORS } from '../../utils/constants';

const DriverHomeScreen = () => {
    const { user } = useAuth();
    const [isOnline, setIsOnline] = useState(false);
    const [rides, setRides] = useState([]);

    useEffect(() => {
        fetchMyRides();
    }, []);

    const fetchMyRides = async () => {
        try {
            const response = await rideService.getMyRides();
            setRides(response.data.rides);
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    return (
        <View style={StyleSheet.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Driver Dashboard</Text>
                <TouchableOpacity style={styles.settings}>
                    <Text>⚙️</Text>
                </TouchableOpacity>
        </View>

        <View style={styles.onlineCard}>
            <View>
                <Text style={styles.onlineLabel}>You are</Text>
                <Text style={[styles.onlineStatus,
                    { color: isOnline ? COLORS.success : COLORS.grey}
                ]}>
                    {isOnline ? 'Online' : 'Offline'}
                </Text>
            </View>
            <Switch
            value={isOnline}
            onValueChange={setIsOnline}
            trackColor={{ false: COLORS.lightgrey, true: COLORS.primary }}
            thumbColor={COLORS.white}
            />
        </View>
        
        <View style={styles.statsCard}>
            <View style={styles.stat}>
                <Text style={styles.statValue}>{rides.length}</Text>
                <Text style={styles.statLabel}>Rides</Text>
            </View>
            <View style={styles.stat}>
                <Text style={styles.statValue}>$0.00</Text>
                <Text style={styles.statLabel}>Today's Earnings</Text>
            </View>
            <View style={styles.stat}>
                <Text style={styles.statValue}>4.9 ⭐</Text>
                <Text style={styles.statLabel}>Rating</Text>
            </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Rides</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
            {rides.length === 0 ? (
                <Text style={styles.noRides}>No rides yet</Text>
            ) : (
                rides.map((ride) => (
                    <View key={ride.id} style={styles.rideCard}>
                        <Text style={styles.rideOrigin}>📍{ride.origin_address}</Text>
                        <Text style={styles.rideDest}>🏁{ride.destination_address}</Text>
                        <Text style={styles.rideFare}>
                            ${ride.total_fare} . {ride.booked_seats} passengers
                        </Text>
                        <Text style={[styles.rideStatus,
                            { color: ride.status === 'completed' ? COLORS.success : COLORS.primary}
                        ]}>
                            {ride.status}
                        </Text>
                    </View>

                ))
                        )}
        </ScrollView>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    settings: {
        padding: 10,
        backgroundColor: COLORS.card,
        borderRadius: 12,
    },
    onlineCard: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    onlineLabel: {
        color: COLORS.grey,
        fontSize: 14,
    },
    onlineStatus: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statsCard: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    stat: {
        alignItems: 'center',
    },
    statValue: {
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    statLabel: {
        color: COLORS.grey,
        fontSize: 12,
        marginTop: 4,
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
    },
    rideCard: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    rideOrigin: {
        color: COLORS.white,
        fontSize: 14,
        marginBottom: 4,
    },
    rideDest: {
        color: COLORS.grey,
        fontSize: 14,
        marginBottom: 8,
    },
    rideFare: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    rideStatus: {
    
        fontSize: 14,
        textTransform: 'uppercase',
    },
});
export default DriverHomeScreen;