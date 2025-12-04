import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/navbar.jsx';
import Home from './components/home.jsx';
import About from './components/about.jsx';
import Play from './components/play.jsx';
import Scores from './components/scores.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('email'));
  useEffect(() => {
    const handleStorageChange = () => setLoggedIn(!!localStorage.getItem('email'));
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <NavBar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<div className="page"><Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></div>} />
        <Route path="/about" element={<div className="page"><About /></div>} />
        <Route path="/play" element={loggedIn ? <div className="page"><Play /></div> : <Navigate to="/" />} />
        <Route path="/scores" element={loggedIn ? <div className="page"><Scores /></div> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
