import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

import App from './App.tsx';

import ErrorPage from './pages/ErrorPage.tsx';
import MarketingPage from './components/Marketing-Page/Marketingpage.tsx';
import Login from './pages/Login';
import SignIn from './components/Sign-In/components/SignIn.tsx';
import SignUp from './components/Sign-Up/SignUp.tsx';
import DashboardTest from './components/DashboardTest.tsx';
import NotFound from './components/NotFound.tsx';

const clientId = '506570133414-uh9vrkmdgan9mqt50g3jv62hfh2kot45.apps.googleusercontent.com';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <MarketingPage />},
      {path: '/login', element: <Login />},
      {path: '/sign-in', element: <SignIn />},
      {path: '/sign-up', element: <SignUp />},
      {path: '/dashboard', element: <DashboardTest />},
      {path: '*', element: <NotFound />},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <GoogleOAuthProvider clientId={clientId}> */}
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>,
);
