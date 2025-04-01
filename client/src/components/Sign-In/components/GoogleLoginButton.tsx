import React from 'react';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginButton: React.FC = () => {
    const handleLoginSuccess = async (tokenResponse: any) => {
        try {
            const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', 
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }
            );
            console.log('User Info:', userInfo.data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };
    return (
        <div>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onFailure={(error) => console.error('Login failed:', error)}
                onLogout={() => {
                    googleLogout();
                    console.log('User logged out');
                }}
                style={{ marginTop: '10px' }}
            />
            <button onClick={() => googleLogout()}>Logout</button>
        </div>
    );
    }

export default GoogleLoginButton;