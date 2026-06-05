import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

const SplashScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>STREYM</Text>
            <Text style={styles.tagline}>Move freely, Arrive happily</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    logo: {
        fontSize: 48,
        fontWeight: 'bold',
        color: COLORS.primary,
        letterSpacing: 8,
    },
    tagline: {
        fontSize: 16,
        color: COLORS.grey,
        marginTop: 10,
    },
});

export default SplashScreen;