import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../utils/constants';

const DriverProfileScreen = () => {
    const { user, logout } = useAuth();
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {user?.full_name?.charAt(0).toUpperCase()}
                    </Text>
                    </View>
                    <Text style={styles.name}>{user?.full_name}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                    <Text style={styles.phone}>{user?.phone}</Text>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>🚗Driver</Text>
                    </View>
                    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                        <Text style={styles.logoutText}>Sign Out</Text>
                    </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        color: COLORS.white,
        fontSize: 32,
        fontWeight: 'bold',
    },
    name: {
        color: COLORS.white,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        color: COLORS.grey,
        fontSize: 14,
        marginBottom: 4,
    },
    phone: {
        color: COLORS.grey,
        fontSize: 14,
        marginBottom: 16,
    },
    badge: {
        backgroundColor: COLORS.card,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 40,
    },
    badgeText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: COLORS.error,
        padding: 16,
        borderRadius:12,
        width: '100%',
        alignItems: 'center',
    },
    logoutText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
export default DriverProfileScreen;