import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../../shared-theme/AppTheme';
import AppAppBar from './components/NavBar';
import Hero from './components/Hero';
// import LogoCollection from './components/LogoCollection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        {/* <LogoCollection /> */}
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}

