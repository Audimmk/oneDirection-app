import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import {COLORS} from '../utils/constants';

const LoginScreen = ({ navigation, route }) => {
    const role = route.params?.role || 'passenger';
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        const result = await login(email,password);
        setLoading(false);

        if (!result.success) {
            Alert.alert('Error', result.message);
        }
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>⬅️Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.grey}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.grey}
                value={password}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                />

                <Text style={style.label}>Password</Text>
                <TextInput
                style={style.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.grey}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                />

                <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color={COLORS.white} />
                    ) : (
                        <Text style={styles.buttonText}>Sign In</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigation.navigate('Register', { role })}>
                    <Text style={styles.registerText}>
                        Don't have an account ? {' '}
                        <Text style={style.registerLink}>Register</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding:24,
    },
    back: {
        marginTop: 50,
        maringBottom: 30,
    },
    backText: {
        color: COLORS.primary,
        fontSize: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.white,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.grey,
        marginBottom: 32,

    },
    form: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: COLORS.white,
        marginBottom:8,
    },
    input: {
      backgroundColor: COLORS.card,
      boarderRadius: 12,
      padding: 16,
      color: COLORS.white,
      fontSize: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: COLORS.lightgrey, 
    },
    button: {
        backgroundColor:COLORS.primary,
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerText: {
        color: COLORS.grey,
        textAlign: 'center',
        fontSize: 14,
    },
    registerLink: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },

});