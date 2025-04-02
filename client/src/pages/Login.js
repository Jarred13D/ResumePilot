import { useState } from "react";
import Auth from '../utils/auth'; // Import the Auth utility for managing authentication state
import { login } from "../api/authAPI"; // Import the login function from the API
const Login = () => {
    // State to manage the login form data
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    // Handle changes in the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };
    // Handle form submission for login
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the login API endpoint with loginData
            const data = await login(loginData);
            // If login is successful, call Auth.login to store the token in localStorage
            Auth.login(data.token);
        }
        catch (err) {
            console.error('Failed to login', err); // Log any errors that occur during login
        }
    };
    return (<div className='form-container'>
      <form className='form login-form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        {/* Username input field */}
        <div className="form-group">
          <label>Username</label>
          <input className="form-input" type='text' name='username' value={loginData.username || ''} onChange={handleChange}/>
        </div>
        {/* Password input field */}
        <div className="form-group">
          <label>Password</label>
          <input className="form-input" type='password' name='password' value={loginData.password || ''} onChange={handleChange}/>
        </div>
        {/* Submit button for the login form */}
        <div className="form-group">
          <button className="btn btn-primary" type='submit'>Login</button>
        </div>
      </form>
    </div>);
};
export default Login;
