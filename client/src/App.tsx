import { Outlet } from 'react-router-dom';
import AppAppBar from './components/Home-Page/components/NavBar';
import { CssBaseline, ThemeProvider } from '@mui/material';

// import GoogleLoginButton from './components/Sign-In/components/GoogleLoginButton';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <AppAppBar />
    <Outlet />
    </>
  )
};

export default App
