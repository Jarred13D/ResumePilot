import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

import App from './App.tsx';

import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';

const clientId = '506570133414-uh9vrkmdgan9mqt50g3jv62hfh2kot45.apps.googleusercontent.com';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
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
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);
