import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './LoginPage.css'; // CSS file for styling
import { EmailContext } from "../context/EmailContext";
import { useContext } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading status
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const {setEmails}=useContext(EmailContext);
  const handleLogin = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error message

    try {
      // Send login data to the server
      const response = await fetch(`http://localhost:4000/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password
      });

      const result = await response.json();

      if (response.ok) {
        // If login is successful, navigate to the dashboard
        setEmails(email);
        navigate('/dashboard');
      } else {
        // If login fails, set the error message
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError('An error occurred. Please try again.'); // Set generic error message
    } finally {
      setLoading(false); // Reset loading status
    }
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
        {loading && <p>Loading...</p>} {/* Show loading message */}
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}
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
