import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SignIn from './components/Sign-In/components/SignIn';



function App() {

  return (
    <div>
      <Navbar />
      <main className='container pt-5'>
        <div> 
          <SignIn />
        </div>
        {/* <div>
          <Dashboard />
        </div> */}
        <Outlet />
      </main>
    </div>
  )
}

export default App
