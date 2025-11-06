import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import About from "./components/about";
import Play from "./components/play";
import Scores from "./components/scores";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<div className="page"><Home /></div>} />
        <Route path="/play" element={<div className="page"><Play /></div>} />
        <Route path="/scores" element={<div className="page"><Scores /></div>} />
        <Route path="/about" element={<div className="page"><About /></div>} />
      </Routes>
    </Router>
  );
}
