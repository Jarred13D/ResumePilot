import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import SignIn from './components/Sign-In/components/SignIn';
import MarketingPage from './components/Marketing-Page/Marketingpage';
// import GoogleLoginButton from './components/Sign-In/components/GoogleLoginButton';

function App() {

  return (
    <div>
      {/* <Navbar />
      <main className='container pt-5'>
        <div> 
          <h1>Welcome to the Resume Builder</h1>
          <SignIn />
          <div>
            <GoogleLoginButton />
        </div> */}
         <div>
          <MarketingPage />
        </div>
        {/* <Outlet />
      </main> */}
    </div>
  )
};

export default App
