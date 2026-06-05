import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../utils/constants';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>{return Promise.reject(error)}
);

export const authService = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
};

export const rideService = {
    search: () => api.get('/rides/search'),
    create: (data) => api.post('/rides/create', data),
    book: (data) => api.post('/rides/book', data),
    getDetails: (id) => api.get(`/rides/${id}`),
    getMyRides: () => api.get('/rides/my-rides'),
};

export const driverService = {
    createProfile: (data) => api.post('/drivers/create-profile', data),
    getProfile: () => api.get('/drivers/profile'),
};
export const paymentService = {
    initiate: (data) => api.post('/payments/initiate', data),
    check: (data) => api.post('/payments/check', data),
};
export const trackingService = {
    updateStatus: (data) => api.post('/tracking/status', data),
    updateLocation: (data) => api.post('/tracking/location', data),
};
export default api;