import React from 'react';
import { Outlet } from 'react-router-dom';
import AppAppBar from './components/Marketing-Page/components/AppAppBar';
function App() {
    return (<>
    <AppAppBar />
    <Outlet />
    </>);
}
;
export default App;
