import apiClient from './apiClient.js';
import { saveToken, clearToken } from './tokenService.js';

const API_URL = '/api/v1';

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(`${API_URL}/auth/login`, {email, password});
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