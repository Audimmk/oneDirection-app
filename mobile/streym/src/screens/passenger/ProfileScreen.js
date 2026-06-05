import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS } from '../../utils/constants';

const ProfileScreen = () => {
    const { user, logout } = useAuth();
    return (
        <View style={styles.container}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {user?.full_name ?.charAt(0).toUpperCase()}
                </Text>
            </View>
            <Text style={styles.name}>{user?.full_name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
            <Text style={styles.phone}>{user?.phone_number}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText}>Sign Out</Text>
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
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: COLORS.grey,
        marginBottom: 4,
    },
    phone: {
        fontSize: 14,
        color: COLORS.grey,
        marginBottom: 40,
    },
    logoutButton: {
        backgroundColor: COLORS.error,
        padding: 16,
        width: '100%',
        alignItems: 'center',
        borderRadius: 12,
    },
    logoutButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 16,
    },
});
export default ProfileScreen;
