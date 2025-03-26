const TOKEN_KEY = "accessToken";

export const saveToken = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const getToken = (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
};
export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};
export const isAuthenticated = (): boolean => {
    return !!getToken();
};