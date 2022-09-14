import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { UserContextProvider } from './Context/UserContext';
// Switch is now Routes

//components
import Register from './Routes/Register';
import Dashboard from './Routes/Dashboard';
import Login from './Routes/Login';


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
      <div className="container">
        <Router>
          <Routes>
            <Route exact path='/login' element={(!isAuthenticated) ? <Login setAuth={setAuth} setAdmin={setAdmin}/> : <Navigate to="/dashboard"/>}/>
            <Route exact path='/register' element={(isAdminAuthentication) ? <Register setAuth={setAuth} setAdmin={setAdmin}/> : <Navigate to="/login"/> }/>
            <Route exact path='/dashboard' element={(isAuthenticated) ? <Dashboard setAuth={setAuth} setAdmin={setAdmin}/> : <Navigate to="/login"/>}/>
          </Routes>
        </Router>
      </div>        
    </UserContextProvider>
  );
};

export default App;
