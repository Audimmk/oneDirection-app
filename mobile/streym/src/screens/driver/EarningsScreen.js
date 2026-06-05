import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';
const EarningsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Earnings</Text>
            <Text style={styles.amount}>$0.00</Text>
            <Text style={styles.subtitle}>Your earnings will appear here.</Text>
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
    amount: {
        color: COLORS.primary,
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: COLORS.grey,
        fontSize: 14,
    },
});
export default EarningsScreen;