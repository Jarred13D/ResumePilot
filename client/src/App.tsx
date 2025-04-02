import React from 'react';
import { Outlet } from 'react-router-dom';
import AppAppBar from './components/Marketing-Page/components/AppAppBar';
import SignIn from './components/Sign-In/components/SignIn';
import MarketingPage from './components/Marketing-Page/Marketingpage';
import DashboardTest from './components/DashboardTest';
import NotFound from './components/NotFound';
// import GoogleLoginButton from './components/Sign-In/components/GoogleLoginButton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <AppAppBar />
    <Outlet />
    </>
  )
};

export default App
