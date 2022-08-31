import React, { Fragment, useState } from 'react';
import './App.css';

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
// Switch is now Routes

//components
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';


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


  return (
    <Fragment>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path='/login' element={(!isAuthenticated) ? <Login setAuth={setAuth} setAdmin={setAdmin}/> : <Navigate to="/dashboard"/>}/>
            <Route exact path='/register' element={(isAdminAuthentication) ? <Register setAuth={setAuth} setAdmin={setAdmin}/> : <Navigate to="/login"/> }/>
            <Route exact path='/dashboard' element={(isAuthenticated) ? <Dashboard setAuth={setAuth} setAdmin={setAdmin}/> : <Navigate to="/login"/>}/>
          </Routes>
        </Router>
      </div>        
    </Fragment>
  );
};

export default App;
