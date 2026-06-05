import React, { useState } from 'react';
import { View,
     Text,
      StyleSheet,
       TouchableOpacity,
        ImageBackground } from 'react-native';
        import { COLORS, FONTS } from '../utils/constants';
const WelcomeScreen = ({ navigation }) => {
    const [ selected, setSelected ] = useState('passenger');

    const handleSelection = () => {
        navigation.navitage('Login', { role: selected });
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Text style={styles.logoContainer}>STREYM</Text>
                <Text style={styles.tagline}>Move freely, Arrive happily</Text>
            </View> 
            <View style={styles.card}>
                <Text style={styles.title}>How would you like to continue</Text>
                <Text style={styles.subtitle}>Choose your experience</Text>

                <TouchableOpacity
                    style={[styles.option, selected === 'passenger' && styles.optionSelected]}
                    onPress={() => setSelected('passenger')}>
                        <Text style={styles.optionIcon}>👤</Text>
                        <View style={styles.optionText}>
                            <Text style={styles.optionTitle}>Passenger</Text>
                            <Text style={styles.optionDesc}>Book safe and comfortable rides</Text>
                        </View>
                        <View style={[styles.radio, selected === 'passenger' && styles.radioSelected]} />
                    </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, selected === 'driver' && styles.optionSelected]}
                    onPress={() => setSelected('driver')}>
                        <Text style={styles.optionIcon}>🚗</Text>
                        <View style={styles.optionText}>
                            <Text style={styles.optionTitle}>Driver</Text>
                            <Text style={styles.optionDesc}>Earn on your terms and your time</Text>
                        </View>
                        <View style={[styles.radio, selected === 'driver' && styles.radioSelected]} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Continue as {selected=== 'passenger' ? 'Passenger' : 'Driver'}

                        </Text>
                    </TouchableOpacity>
                    <View style={styles.features}>
                        <Text style={styles.feature}>🛡️ Safe & Secure</Text>
                        <Text style={styles.feature}>⭐ Verified Drivers</Text>
                        <Text style={styles.feature}>📍 Real-time Tracking</Text>
                    </View>
            </View>
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: COLORS.primary,
        letterSpacing: 8,
    },
    tagline: {
        fontSize: 16,
        color: COLORS.grey,
        marginTop: 8,
    },
    card: {
        backgroundColor: COLORS.card,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize:24,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.grey,
        textAlign: 'center',
        marginBottom: 24,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightGrey,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        bordercolor: 'transparent',
    },
    optionSelected: {
        borderColor: COLORS.primary,
    },
    optionIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    optionText: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    optionDesc: {
        fontSize: 12,
        color: COLORS.grey,
        marginTop: 2,
    },
    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.grey,
    },
    radioSelected: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        padding:18,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    features: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    feature: {
        color: COLORS.grey,
        fontSize: 12,
    },
});
export default WelcomeScreen;


    

