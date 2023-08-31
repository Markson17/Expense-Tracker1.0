import React from 'react';
import { Header } from './components/Header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


import { GlobalProvider } from './context/GlobalState';

import './App.css';
import Login from './components/login';
import Dashboard from './pages/dashboard';
import SignUp from './components/signup';


function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <div className="container">
        </div>
        <div>
          <div>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/pages/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
    </Router>
    </GlobalProvider>
  );
}

export default App;
