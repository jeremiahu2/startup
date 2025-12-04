import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Play from "./components/play";
import Scores from "./components/scores";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("email"));
  useEffect(() => {
    const handleStorageChange = () => setLoggedIn(!!localStorage.getItem("email"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <NavBar loggedIn={loggedIn} />
      <Routes>
        <Route path="/" element={<div className="page"><Home setLoggedIn={setLoggedIn} /></div>} />
        <Route path="/about" element={<div className="page"><About /></div>} />
        <Route
          path="/play"
          element={loggedIn ? <div className="page"><Play /></div> : <Navigate to="/" />}
        />
        <Route
          path="/scores"
          element={loggedIn ? <div className="page"><Scores /></div> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
