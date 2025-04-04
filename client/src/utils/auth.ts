class AuthService {

  // Retrieve the JWT token from localStorage
  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }
  
  // Check if the user is logged in by retrieving the token from localStorage
  loggedIn(): boolean {
    return !!this.getToken();
  }

  // Store the JWT token in localStorage and redirect to the home page
  login(idToken: string): void {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/dashboard');
  }

  // Remove the JWT token from localStorage and redirect to the home page
  logout(): void {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

// Export an instance of the AuthService class
export default new AuthService();
