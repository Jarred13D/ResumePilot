const TOKEN_KEY = "accessToken";
export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};
export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};
export const isAuthenticated = () => {
    return !!getToken();
};
