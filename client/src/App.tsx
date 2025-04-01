import { Outlet } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import SignIn from './components/Sign-In/components/SignIn';
import MarketingPage from './components/Marketing-Page/Marketingpage';



function App() {

  return (
    <div>
      {/* <Navbar />
      <main className='container pt-5'>
        <div> 
          <SignIn />
        </div> */}
         <div>
          <MarketingPage />
        </div>
        {/* <Outlet />
      </main> */}
    </div>
  )
}

export default App
