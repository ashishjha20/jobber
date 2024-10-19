import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './dashboard.css'; // Assuming the CSS is in the same directory

const DashBoard = () => {
  const navigate = useNavigate(); // Call useNavigate

  function TaskHandler() {
    navigate('/yourjobs'); // Navigate to the desired route
  }

  return (
    <div>
      {/* Header Section */}
      <header>
        <div className="container">
          <div className="logo">
            <img className="img" src="jobify logo full.png" alt="Jobify Logo" />
          </div>
          <nav>
            <ul>
              <li><a href="#">Developers</a></li>
              <li><a href="#">About</a></li>
            </ul>
          </nav>
          <div className="header-buttons">
            <a href="#" className="connect-wallet">Connect Wallet</a>
            <a href="#" className="get-start">Get Started</a>
          </div>
        </div>
      </header>

      {/* Main Section with Centered Buttons */}
      <main className="main-content">
        <div className="button-container">
          <button className="main-button">Seek Task</button>
          <button className="main-button" onClick={TaskHandler}>Add Task</button>
          <button className="main-button">Issues</button>
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
