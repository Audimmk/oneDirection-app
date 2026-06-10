import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAuth} from '../context/AuthContext';
import {COLORS} from '../utils/constants';

//Screens
import SplashScreen from '../screens/SplashScreen';
import welcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

//Passenger Screens
import PassengerHomeScreen from '../screens/passenger/HomeScreen';
import RidesScreen from '../screens/passenger/RidesScreen';
import WalletScreen from '../screens/passenger/WalletScreen';
import ProfileScreen from '../screens/passenger/ProfileScreen';
import RideDetailsScreen from '../screens/passenger/RideDetailsScreen';
import ActiveRideScreen from '../screens/passenger/ActiveRideScreen';
import PaymentScreen from '../screens/passenger/PaymentScreen';

//Driver Screens
import DriverHomeScreen from '../screens/driver/HomeScreen';
import DriverEarningsScreen from '../screens/driver/EarningsScreen';
import DriverRidesScreen from '../screens/driver/RidesScreen';
import DriverProfileScreen from '../screens/driver/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Passenger Tab Navigator
const PassengerTabs = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: { backgroundColor: COLORS.card,
                borderTopColor: COLORS.lightGray },
             
             tabBarActiveTintColor: COLORS.primary,
             tabBarInactiveTintColor: COLORS.grey,
             headerShown: false,
        }}
    >
        <Tab.Screen name="Home" component={PassengerHomeScreen} />
        <Tab.Screen name="Rides" component={RideSearchScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
);

//Driver Tab Navigator
const DriverTabs = () => (
    <Tab.Navigator
        screenOptions={{
            tabBarStyle: { backgroundColor: COLORS.card,
                borderTopColor: COLORS.lightGray },
             
             tabBarActiveTintColor: COLORS.primary,
             tabBarInactiveTintColor: COLORS.grey,
             headerShown: false,
        }}
    >
        <Tab.Screen name="Home" component={DriverHomeScreen} />
        <Tab.Screen name="Rides" component={DriverRidesScreen} />
        <Tab.Screen name="Earnings" component={DriverEarningsScreen} />
        <Tab.Screen name="Profile" component={DriverProfileScreen} />
    </Tab.Navigator>
);

const AppNavigator = () => {
    const { user, loading } = useAuth();

    if (loading) 
        return <SplashScreen />;
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                { !user ? (
                    <>
                        <Stack.Screen name="Welcome" component={welcomeScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                ) : user.role === 'driver' ? (
                    <Stack.Screen name="DriverApp" component={DriverTabs} />
                ) : (
                    <>
                    <Stack.Screen name="PassengerApp" component={PassengerTabs} />
                    <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
                    <Stack.Screen name="ActiveRide" component={ActiveRideSsvdtcreen} />
                    <Stack.Screen name="Payment" component={PaymentScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>

    );

};
export default AppNavigator;