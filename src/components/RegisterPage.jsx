import React, { useState } from "react";
import './RegisterPage.css'; // Create corresponding CSS
 // Background animation

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    walletAddress: '',
    paymentCurrency: 'ETH',
    skills: '',
    availability: '',
    dob: '',
    pan: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can handle form submission logic here, like sending the data to a server
  };

  return (
    <div className="register-container">
      <video autoPlay muted loop id="background-video">
        
      </video>

      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name & Contact Details</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter your full name and contact details" 
              value={formData.name} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label>Cryptocurrency Wallet Address</label>
            <input 
              type="text" 
              name="walletAddress" 
              placeholder="Enter your wallet address" 
              value={formData.walletAddress} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label>Preferred Payment Currency</label>
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
            <label>Skill Set and Expertise</label>
            <input 
              type="text" 
              name="skills" 
              placeholder="e.g., Development, Marketing, Design, etc." 
              value={formData.skills} 
              onChange={handleChange} 
              required
            />
          </div>

          <div className="form-group">
            <label>Availability</label>
            <input 
              type="text" 
              name="availability" 
              placeholder="e.g., Full-time, Part-time, Freelance" 
              value={formData.availability} 
              onChange={handleChange} 
              required
            />
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
            <label>PAN (Permanent Account Number)</label>
            <input 
              type="text" 
              name="pan" 
              placeholder="Enter your PAN" 
              value={formData.pan} 
              onChange={handleChange} 
              required
            />
          </div>

          <button type="submit" className="submit-btn">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;