import apiClient from './apiClient';
export const fetchProfile = async () => {
    try {
        const response = await apiClient.get(`/profile`);
        return response.data;
    }
    catch (error) {
        throw new Error("Unauthorized");
    }
};
