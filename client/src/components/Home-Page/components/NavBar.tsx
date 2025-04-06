import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../../../shared-theme/ColorModelDropdown';
//import Sitemark from '../SitemarkIcon';
import type {} from '@mui/material/themeCssVarsAugmentation';
import { Typography } from '@mui/material';
import auth from '../../../utils/auth';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(auth.loggedIn());
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    const checkLogin = () => setIsLoggedIn(auth.loggedIn());

    checkLogin();

    // Update state when coming back to tab or storage changes
    window.addEventListener('focus', checkLogin);
    window.addEventListener('storage', checkLogin);

    return () => {
      window.removeEventListener('focus', checkLogin);
      window.removeEventListener('storage', checkLogin);
    };
  }, []);

  const handleLogout = () => {
    auth.logout();
    setIsLoggedIn(false);
    navigate('/sign-in'); // Optional: redirect after logout
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            {/* <Sitemark /> */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Typography variant="h6" color="info" className="font-mono text-xl font-bold text-white">
            ResumePilot
          </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex'} }}>
            <Button component={Link} to="/" variant="text" color="inherit" size="small" href="#">
                Home
              </Button>
              <Button component={Link} to="/dashboard" variant="text" color="inherit" size="small" href="#dashboard">
                Dashboard
              </Button>
              {/* <Button variant="text" color="info" size="small">
                Testimonials
              </Button> */}
              {/* <Button variant="text" color="info" size="small">
                Pricing
              </Button> */}
              <Button component={Link} to="/faq" variant="text" color="inherit" size="small" sx={{ minWidth: 0 }}>
                FAQ
              </Button>
            </Box>
          </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {isLoggedIn ? (
            <Button onClick={handleLogout} color="error" variant="outlined" size="small">
              Logout
            </Button>
            ) : (
            <>
            <Button component={Link} to="/sign-in" color="inherit" variant="text" size="small">
              Sign in
            </Button>
            <Button 
            component={Link} 
            to="/sign-up"
            variant="contained" 
            size="small"
            color='primary'>
              Sign up
            </Button>
            </>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>Features</MenuItem>
                {/* <MenuItem>Testimonials</MenuItem> */}
                {/* <MenuItem>Pricing</MenuItem> */}
                <MenuItem>FAQ</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button 
                  variant="contained" 
                  fullWidth
                  sx={(theme) => ({ 
                    minWidth: 'fit-content',
                    backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                    color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                    '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#f5f5f5' : '#111',
                  },
                  })}>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}