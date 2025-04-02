import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../../shared-theme/AppTheme';
import AppAppBar from './components/AppAppbar';
import Hero from './components/Hero';
import LogoCollection from './components/LogoCollection';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
export default function MarketingPage(props) {
    return (<AppTheme {...props}>
      <CssBaseline enableColorScheme/>

      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
        <Features />
        <Divider />
        {/* <Pricing /> */}
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>);
}
