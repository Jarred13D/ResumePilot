import apiClient from './apiClient';
import { saveToken, clearToken } from './tokenService';

const API_URL = 'http://localhost:3000/api/v1';

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`auth/login`, {email, password});
    const { token } = response.data;
    saveToken(token);
    return token;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = () => {
  clearToken();
  window.location.href = '/login';
};