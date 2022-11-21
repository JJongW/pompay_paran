import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "/Users/SJW/web_test/client/src/components/views/LandingPage/LandingPage.js";
import LoginPage from "/Users/SJW/web_test/client/src/components/views/LoginPage/LoginPage.js";
import RegisterPage from "/Users/SJW/web_test/client/src/components/views/RegisterPage/RegisterPage.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
