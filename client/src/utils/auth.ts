class AuthService {
  
  // Check if the user is logged in by retrieving the token from localStorage
  loggedIn() {
    return !!localStorage.getItem('id_token');
  }

  // Retrieve the JWT token from localStorage
  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  // Store the JWT token in localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/dashboard');
  }

  // Remove the JWT token from localStorage and redirect to the home page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

// Export an instance of the AuthService class
export default new AuthService();
