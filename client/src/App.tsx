import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SignIn from './components/Sign-In/components/SignIn';
import GoogleLoginButton from './components/Sign-In/components/GoogleLoginButton';
import './App.css';

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
