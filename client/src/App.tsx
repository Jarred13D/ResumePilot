import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SignIn from './components/Sign-In/components/SignIn';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from './components/Sign-In/components/GoogleLoginButton';

const clientId = 'YOUR_GOOGLE_CLIENT_ID';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);


const App: React.FC = () => {

  return (
    <div>
      <Navbar />
      <main className='container pt-5'>
        <div> 
          <h1>Welcome to the Resume Builder</h1>
          <GoogleLoginButton />
          <SignIn />
        </div>
        {/* <div>
          <Dashboard />
        </div> */}
        <Outlet />
      </main>
    </div>
  )
}

export default App
