import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { UserContextProvider } from './Context/UserContext';
import { KhmpabedContextProvider } from './Context/KhmpabedContext';
import { ScoutContextProvider } from './Context/ScoutContext';
// Switch is now Routes

//routes
import Register from './Routes/Register';
import Dashboard from './Routes/Dashboard';
import Login from './Routes/Login';
import Khmpabeds from './Routes/Khmpabeds';
import KhmpabedUpdatePage from './Routes/KhmpabedUpdatePage';
import KhmpabedAddPage from './Routes/KhmpabedAddPage';
import Kyligs from './Routes/Kyligs';
import KyligUpdatePage from './Routes/KyligUpdatePage';
import KyligAddPage from './Routes/KyligAddPage';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminAuthentication, setAdminAuthentication] = useState(false);
  //private route to enable <navigate> from react-router-dom
  // const PrivateRoute = (isAuthenticated) => {
  //   return !isAuthenticated ? <Login/> : <Navigate to="/dashboard"/>;
  // };
  const setAuth = Boolean => {
    setIsAuthenticated(Boolean);
  }

  const setAdmin = Boolean => {
    setAdminAuthentication(Boolean);
  }

  async function isAuth() {
    try {

      const response = await fetch("http://localhost:3006/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  })


  return (
    <UserContextProvider>
      <KhmpabedContextProvider>
        <ScoutContextProvider>
          <div className="container">
            <Router>
              <Routes>
                <Route exact path='/login' element={(!isAuthenticated) ? <Login setAuth={setAuth} setAdmin={setAdmin}/> : <Navigate to="/dashboard"/>}/>
                <Route exact path='/register' element={(isAdminAuthentication) ? <Register setAuth={setAuth} setAdmin={setAdmin}/> : <Navigate to="/login"/> }/>
                <Route exact path='/dashboard' element={(isAuthenticated) ? <Dashboard setAuth={setAuth} setAdmin={setAdmin}/> : <Navigate to="/login"/>}/>
                <Route exact path='/dashboard/khmpabeds' element={(isAuthenticated) ? <Khmpabeds/> : <Navigate to="/login"/>}/>
                <Route exact path='/dashboard/khmpabeds/:scout_id/update' element={(isAuthenticated) ? <KhmpabedUpdatePage/> : <Navigate to="/login"/>}/>
                <Route exact path='/dashboard/khmpabeds/add' element={(isAuthenticated) ? <KhmpabedAddPage/> : <Navigate to="/login"/>}/>
                <Route exact path='/dashboard/kyligs' element={(isAuthenticated) ? <Kyligs/> : <Navigate to="/login"/>} />
                <Route exact path='/dashboard/kyligs/:scout_id/update' element={(isAuthenticated) ? <KyligUpdatePage/> : <Navigate to="/login"/>}/>
                <Route exact path='/dashboard/kyligs/add' element={(isAuthenticated) ? <KyligAddPage/> : <Navigate to="/login"/>}/>
              </Routes>
            </Router>
          </div>
        </ScoutContextProvider>
      </KhmpabedContextProvider>  
    </UserContextProvider>
  );
};

export default App;
