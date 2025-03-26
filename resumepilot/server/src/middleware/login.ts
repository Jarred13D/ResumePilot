import axios from 'axios';
import { saveToken, clearToken, getToken } from './tokenService';

const API_URL = 'http://localhost:3000/api/v1';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {email, password});
    const { token } = response.data;
    saveToken(token);
    return token;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = () => {
  clearToken();
};

export const fetchProfile = async () => {
    const token = getToken();
    if (!token) throw new Error("No token found");
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        throw new Error("Unauthorized");
    }
};