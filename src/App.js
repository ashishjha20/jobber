import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage"; // Import your MainPage component
import LoginPage from "./components/LoginPage"; // You need to create this component
import RegisterPage from "./components/RegisterPage"; // You need to create this component
import AnimatedBackground from './components/AnimatedBackground.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> {/* MainPage as the home page */}
        <Route path="/login" element={<div>
          <AnimatedBackground />
          <LoginPage />
        </div>} /> {/* Login page route */}
        <Route path="/register" element={<div>
          <AnimatedBackground />
          <RegisterPage />
        </div>} /> {/* Register page route */}
      </Routes>
    </Router>
  );
};

export default App;