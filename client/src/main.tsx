import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { getDesignTokens } from './shared-theme/themePrimitives';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import MarketingPage from './components/Home-Page/Home';
import SignIn from './components/Sign-In/components/SignIn';
import SignUp from './components/Sign-Up/SignUp';
import DashboardTest from './components/ResumeDashboard';
import NotFound from './components/NotFound';

// const clientId = '506570133414-uh9vrkmdgan9mqt50g3jv62hfh2kot45.apps.googleusercontent.com';
const theme = createTheme(getDesignTokens('dark'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <MarketingPage />},
      {path: '/sign-in', element: <SignIn />},
      {path: '/sign-up', element: <SignUp />},
      {path: '/dashboard', element: <DashboardTest />},
      {path: '*', element: <NotFound />},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <RouterProvider router={router} />
    {/* <GoogleOAuthProvider clientId={clientId}> */}
    {/* </GoogleOAuthProvider> */}
    </ThemeProvider>
  </React.StrictMode>,
);
