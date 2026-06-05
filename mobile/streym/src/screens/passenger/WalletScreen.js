import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/constants';

const WalletScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Wallet</Text>
            <Text style={styles.subtitle}>Your payment history will appear here.</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    subtitle: {
        color: COLORS.grey,
        fontSize: 14,
    },
});

export default WalletScreen;