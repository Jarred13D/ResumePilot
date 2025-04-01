import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

import App from './App.tsx';

import ErrorPage from './pages/ErrorPage.tsx';
import MarketingPage from './components/Marketing-Page/MarketingPage.tsx';
import Login from './pages/Login';

const clientId = '506570133414-uh9vrkmdgan9mqt50g3jv62hfh2kot45.apps.googleusercontent.com';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MarketingPage />
      }, 
      {
        path: '/login',
        element: <Login />
      }, 
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider clientId={clientId}> */}
      <RouterProvider router={router} />
      <App />
    {/* </GoogleOAuthProvider> */}
  </React.StrictMode>,
);
