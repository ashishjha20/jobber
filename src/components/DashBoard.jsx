import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for making HTTP requests
import './dashboard.css';
import { EmailContext } from "../context/EmailContext"; // Assuming the CSS is in the same directory
import CryptoJS from 'crypto-js'; // Import crypto-js for hashing

const DashBoard = () => {
  const navigate = useNavigate(); // Call useNavigate
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState(0); // State to hold amount
  const [hashedAmount, setHashedAmount] = useState(''); // State to hold hashed amount
  const { emails } = useContext(EmailContext); // Extract email from context

  useEffect(() => {
    // Function to fetch user details and update cnt
    const fetchUserDetails = async () => {
      try {
        if (!emails) {
          console.error("Email is undefined in context");
          return;
        }

        console.log("Fetching user details for:", emails);

        // Fetch user details
        const response = await axios.get(`http://localhost:4000/api/v1/getuser/${emails}`);
        console.log("User data fetched:", response.data); // Log full response

        const userData = response.data.data;
        const { cnt, amount } = userData; // Extract cnt and amount

        console.log("User cnt:", cnt, "User amount:", amount);

        // Hash the amount value and set it
        const hashedValue = CryptoJS.SHA256(amount.toString()).toString(CryptoJS.enc.Hex);
        setHashedAmount(hashedValue);

        // Check if cnt field is 0
        if (cnt === 0) {
          setShowPopup(true); // Show pop-up if cnt is 0
        }

        // Set user amount to display
        setAmount(amount);

        // Increase the cnt value for every login
        await axios.put(`http://localhost:4000/api/v1/updateuser/${emails}`, {
          cnt: cnt + 1
        });
        console.log("User cnt updated successfully");

      } catch (error) {
        console.error('Error fetching user details or updating cnt:', error);
      }
    };

    // Call the fetchUserDetails function on component mount
    fetchUserDetails();
  }, [emails]); // emails is the dependency, ensuring it's up to date

  function TaskHandler(amount) {
    navigate('/yourjobs'); // Navigate to the desired route
  }

  function SeekHandler() {
    navigate('/seekjobs');
  }

  function YourWorkHandler() {
    navigate('/yourwork');
  }

  const closePopup = () => {
    setShowPopup(false); // Function to close the pop-up
  };

  // Split the hashed amount if necessary (this is just an example of how to split the hashed string)
  const splitHashedAmount = hashedAmount ? hashedAmount.slice(0, 15) : ''; // Limit the display to first 15 characters

  return (
    <div className="main1">
      {/* Header Section */}
      <header>
        <div className="container">
          <div className="logo">
            <img className="img" src="" alt="Jobify Logo" />
          </div>
          <nav>
            <ul>
              {/* <li><a href="#">Developers</a></li>
              <li><a href="#">About</a></li> */}
            </ul>
          </nav>
          <div className="header-buttons">
            <a href="#" className="connect-wallet">
              Your Wallet: ${amount}
            </a> {/* Display both amount and hashed amount */}
            <a href="#" className="connect-wallet">
              Token Value: {splitHashedAmount}
            </a> {/* Display first 15 characters of hashed value */}
          </div>
        </div>
      </header>

      {/* Main Section with Centered Buttons */}
      <main className="main-content">
        <div className="button-container">
          <button className="main-button" onClick={SeekHandler}>Seek Task</button>
          <button className="main-button" onClick={() => TaskHandler(amount)}>Add Task</button>
          <button className="main-button">Issues</button>
          <button onClick={YourWorkHandler} className="main-button">Your Work</button>
        </div>
      </main>

      {/* Pop-up for first-time login with bonus tokens */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Congratulations!</h3>
            <p>As a new user, you will receive a bonus of 100 Jobify tokens!</p>
            <button onClick={closePopup} className="popup-close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
