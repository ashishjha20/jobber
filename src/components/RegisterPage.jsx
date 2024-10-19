import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    walletAddress: '',
    paymentCurrency: 'ETH',
    skills: '',
    availability: '',
    dob: '',
    pan: '',
    password: '', // Added password field
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate password length
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/login'); // Redirect on success
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const sectors = [
    "Writing & Content Creation",
    "Design & Multimedia",
    "Web Development",
    "Mobile App Development",
    "Software & Game Development",
    "Digital Marketing",
    "Virtual Assistance & Admin Support",
    "Sales & Business Development",
    "Finance & Accounting",
    "Human Resources & Recruitment",
    "Language Services",
    "IT & Networking",
    "Consulting",
    "Engineering & Architecture",
    "Education & Tutoring",
    "Legal Services",
    "Data Science & Analytics",
    "Audio & Music",
    "Real Estate",
    "Customer Support",
    "Health & Fitness"
  ];

  const availabilityOptions = [
    "Full-time",
    "Part-time",
    "Contract",
   
    "Freelance"
  ];

  return (
    <div className="register-container">
      <video autoPlay muted loop id="background-video">
        {/* Background video source here */}
      </video>

      <div className="register-box">
        <h1>Register</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} className="form-grid">
          <div className="left-column">
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Enter your full name" 
                value={formData.name} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="form-group">
              <label>Contact Number</label>
              <input 
                type="tel" 
                name="contact" 
                placeholder="Enter your contact number" 
                value={formData.contact} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email address" 
                value={formData.email} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="Enter your password" 
                value={formData.password} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="form-group">
              <label>PAN Number</label>
              <input 
                type="text" 
                name="pan" 
                placeholder="Enter your PAN" 
                value={formData.pan} 
                onChange={handleChange} 
                required
              />
            </div>
          </div>

          <div className="right-column">
            <div className="form-group">
              <label>Preferred Currency</label>
              <select 
                name="paymentCurrency" 
                value={formData.paymentCurrency} 
                onChange={handleChange} 
                required
              >
                <option value="ETH">Ethereum (ETH)</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="USDT">Tether (USDT)</option>
                <option value="BNB">Binance Coin (BNB)</option>
                <option value="SOL">Solana (SOL)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Skills</label>
              <select 
                name="skills" 
                value={formData.skills} 
                onChange={handleChange} 
                required
              >
                <option value="" disabled>Select your skills</option>
                {sectors.map((sector, index) => (
                  <option key={index} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Availability</label>
              <select 
                name="availability" 
                value={formData.availability} 
                onChange={handleChange} 
                required
              >
                <option value="" disabled>Select your availability</option>
                {availabilityOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input 
                type="date" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange} 
                required
              />
            </div>

            <div className="form-group">
              <label>Wallet Address</label>
              <input 
                type="text" 
                name="walletAddress" 
                placeholder="Enter your wallet address" 
                value={formData.walletAddress} 
                onChange={handleChange} 
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
