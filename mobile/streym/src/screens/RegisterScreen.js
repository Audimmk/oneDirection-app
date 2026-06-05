import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    ScrollView
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../utils/constants';

const RegisterScreen = ({ navigation, route }) => {
    const role = route.params?.role || 'passenger';
    const { register } = useAuth();

    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState ('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!fullname || !email || phone || !password) {
            Alert.alert('Error' , 'Please fill in all the fields');
            return;
        }
        setLoading(true);
        const result = await register ({
            full_name: fullname,
            email,
            phone,
            password,
            role,

        });
        setLoading(false);
        if (!result.success) {
            Alert.alert('Error', result.message);
        }
    };
    return (
        <ScrollView style={StyleSheet.container}>
            <TouchableOpacity
            style={StyleSheet.back}
            onPress={() => navigation.goBack()}>
                <Text style={StyleSheet.backText}> Back</Text>

            </TouchableOpacity>
            <Text style={StyleSheet.title}>Create Account</Text>
            <Text style={StyleSheet.subtitle}>
                Register as a {role === 'passenger' ? 'Passenger' : 'Driver'}
            </Text>

            <View style={style.form}>
                <Text style={style.label}> Full Name </Text>
                <TextInput
                style={StyleSheet.input}
                placeholder="Enter your full name"
                placeholderTextColor={COLORS.grey}
                value={fullname}
                onChangeText={setFullName}
                />

                <Text style={StyleSheet.label}>Email</Text>
                <TextInput
                style={StyleSheet.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.grey}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                />
                
                <Text style={StyleSheet.label}>Phone Number</Text>
                <TextInput
                style={StyleSheet.input}
                placeholder="Enter your number"
                placeholderTextColor={COLORS.grey}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                />


               <Text style={style.label}>Password</Text>
               <TextInput
               style={StyleSheet.input}
               placeholder="Create a password"
               placeholderTextColor={COLORS.grey}
               value={password}
               onChangeText={setPassword}
               secureTextEntry
               />

               <TouchableOpacity
               style={styles.botton}
               onPress={handleRegister}
               disabled={loading}>
                { loading ? (
                    <ActivityIndicator color ={COLORS.white} />
                ):(
                    <Text style={styles.buttonText}>Create Account</Text>

                )}
                
               </TouchableOpacity>

               <TouchableOpacity
               onPress={()=> navigation.navigate('Login' , { role })}>
                <Text style={styles.loginText}>
                    Already have an account?{' '}
                    <Text style={styles.loginLink}>Sign In</Text>
                </Text>
               </TouchableOpacity>
            </View>
            </ScrollView>
    );
};

            const styles = style.create({
                container: {
                    flex: 1,
                    backgroundColor: COLORS.background,
                    padding: 24,
                },
                back: {
                    marginTop: 50,
                    marginBottom: 30,
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
                    flex:1,
                },
                label: {
                    fontSize: 14,
                    color: COLORS.white,
                    marginBottom: 8,
                },
                input: {
                    backgroundColor: COLORS.card,
                    borderRadius: 12,
                    padding: 16,
                    color: COLOR.white,
                    fontSize: 16,
                    marginBottom,
                    borderWidth: 1,
                    borderColor: COLORS.lightGrey,
                },
                button: {
                    backgroundColor: COLORS.primary,
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
                loginText: {
                    color: COLORS.grey,
                    textAlign:'center',
                    fontSize: 14,
                },
                loginLink: {
                    color: COLORS.primary,
                    fontWeight: 'bold',
                },
            });
            export default RegisterScreen;

        