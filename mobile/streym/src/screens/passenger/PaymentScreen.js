import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { paymentService } from '../../services/api';
import { COLORS } from '../../utils/constants';

const PaymentScreen = ({ navigation, route }) => {
  const { ride_id, fare_share } = route.params;
  const [phone, setPhone] = useState('');
  const [method, setMethod] = useState('ecocash');
  const [loading, setLoading] = useState(false);

  const paymentMethods = [
    { id: 'ecocash', label: '📱 EcoCash' },
    { id: 'onemoney', label: '📱 OneMoney' },
    { id: 'zimswitch', label: '💳 ZimSwitch' },
  ];

  const handlePayment = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await paymentService.initiate({
        ride_id,
        phone_number: phone,
        method,
      });

      Alert.alert(
        'Payment Initiated',
        response.data.instructions ||
        'Please complete payment on your phone',
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );
    } catch (error) {
      Alert.alert('Error',
        error.response?.data?.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Pay for Ride</Text>

      <View style={styles.fareCard}>
        <Text style={styles.fareLabel}>Amount Due</Text>
        <Text style={styles.fareAmount}>${fare_share}</Text>
      </View>

      <Text style={styles.sectionTitle}>Payment Method</Text>
      {paymentMethods.map((pm) => (
        <TouchableOpacity
          key={pm.id}
          style={[styles.methodCard,
            method === pm.id && styles.methodSelected]}
          onPress={() => setMethod(pm.id)}>
          <Text style={styles.methodLabel}>{pm.label}</Text>
          <View style={[styles.radio,
            method === pm.id && styles.radioSelected]} />
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 0771234567"
        placeholderTextColor={COLORS.grey}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handlePayment}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.buttonText}>Pay ${fare_share}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    paddingTop: 50,
  },
  back: {
    marginBottom: 20,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  fareCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  fareLabel: {
    color: COLORS.grey,
    fontSize: 14,
    marginBottom: 8,
  },
  fareAmount: {
    color: COLORS.primary,
    fontSize: 48,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  methodCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  methodSelected: {
    borderColor: COLORS.primary,
  },
  methodLabel: {
    color: COLORS.white,
    fontSize: 16,
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
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    color: COLORS.white,
    fontSize: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;