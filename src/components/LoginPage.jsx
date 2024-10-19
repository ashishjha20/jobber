import React, { useState } from "react";
import './LoginPage.css'; // Create a CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login with:", email, password);
  };

  return (
    <div className="login-page">
      {/* Add a background container for the techy animation */}
      <div className="techy-animation"></div>
      <div className="login-container">
        <div className="login-header">
          <h1>Login</h1>
          <p>Welcome back! Please login to your account.</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="register-link">Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
};

export default LoginPage;