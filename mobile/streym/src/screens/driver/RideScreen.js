import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

const DriverRideScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Rides</Text>
            <Text style={styles.subtitle}>Your ride history will appear here</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: COLORS.grey,
        fontSize: 14,
    },
});
export default DriverRideScreen;