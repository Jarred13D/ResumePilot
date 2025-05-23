import axios from 'axios';
import { getToken, clearToken } from './tokenService.js';

const API_URL = '/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));

apiClient.interceptors.response.use(response => response, error => {
    if (error.response?.status === 401) {
        console.log("Unauthorized.. Logging out");
        clearToken();
        window.location.href = '/login';
    }
    return Promise.reject(error);
});

export default apiClient;