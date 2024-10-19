import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import './MainPage.css'; // Ensure you create this CSS file based on your existing styles
import students1 from '../images/students1.png'; // Update paths accordingly
import jobifyLogo from '../images/JOBIFY LOGO FULL.png'; // Replace with actual paths
import aiaChainImage from '../images/12345.jpg'; // Update with actual paths

// Preloader Component
const Preloader = () => (
  <div className="preloader">
    <img className="preload-image" src={students1} alt="Loading screen with students" />
  </div>
);

// Header Component
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header>
      <div className="container">
        <div className="logo">
          <img className="img" src={jobifyLogo} alt="Jobify Logo" />
        </div>
        <nav>
          <ul>
            <li className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <a href="#">Developers</a>
              {dropdownOpen && (
                <ul className="dropdown-content">
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                </ul>
              )}
            </li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>
        <div className="header-buttons">
          <a href="#" className="connect-wallet">Connect Wallet</a>
          <a href="#" className="get-start">Get Start</a>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to /login
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to /register
  };

  return (
    <section className="hero">
      <div className="hero-text">
        <h1><span id="heading">Emerging opportunities</span><br /><span>Your job search ends here</span></h1>
        <p>Discover 50 lakh plus career opportunities</p>
        <div className="buttons">
          <a onClick={handleLoginClick} className="btn-team">LOGIN</a>
          <a onClick={handleRegisterClick} className="btn-foundation">REGISTER</a>
        </div>
      </div>
      <div className="hero-image">
        <img src={students1} alt="Student" className="student-image" />
      </div>
    </section>
  );
};

// Info Section Component
const InfoSection = () => (
  <section className="info-section">
    <div className="info-box">
      <h2>AIA Accelerator Program: Propelling the AIA Ecosystem Towards Prosperity with Great Strides</h2>
      <p>The AIA Accelerator Program aims to support and accelerate the development of artificial intelligence startups and innovative projects...</p>
      <a href="#">&#x2192;</a>
    </div>
    <div className="info-box">
      <h2>AIA Chain Hackathon Competition: Finding the Next Killer Application</h2>
      <p>AIA Chain Hackathon Competition is a vibrant event aimed at inspiring innovation and uncovering the potential of blockchain applications...</p>
      <a href="#">&#x2192;</a>
    </div>
  </section>
);

// Team Member Component
const TeamMember = ({ name, role, desc, imgSrc }) => (
  <div className="team-member">
    <img src={imgSrc} alt={name} />
    <h3>{name}</h3>
    <p>{role}</p>
    <p>{desc}</p>
  </div>
);

// Team Section Component
const TeamSection = () => (
  <section className="team-section">
    <section className="team-heading">
      <h1 className="team-background">TEAM</h1>
      <h2 className="team-foreground">Founder team</h2>
    </section>
    <div className="team-container">
      <TeamMember
        name="Tanishk Gupta"
        role="Founder (CEO)"
        desc="Graduated from Stanford University with a degree in Computer Science..."
        imgSrc={jobifyLogo}
      />
      <TeamMember
        name="Aryan Sharma"
        role="Co-Founder Technical Director (CTO)"
        desc="Graduated from Columbia University with a degree in Software Engineering..."
        imgSrc={jobifyLogo}
      />
      <TeamMember
        name="Y.Vatsal"
        role="Chief Marketing Officer (CMO)"
        desc="Graduated from Bogazici University, Growth Hacker..."
        imgSrc={jobifyLogo}
      />
      <TeamMember
        name="Ashish Jha"
        role="Public Relations Manager"
        desc="Graduated from National University of Singapore, Tier 1 investor..."
        imgSrc={jobifyLogo}
      />
    </div>
  </section>
);

// AIA Chain Section
const AIAChainSection = () => (
  <section className="aia-chain-section">
    <div className="aia-chain-container">
      <div className="aia-chain-image">
        <img src={aiaChainImage} alt="AIA Chain" />
      </div>
      <div className="aia-chain-content">
        <h2>About Us</h2>
        <p>AIAchain is an emerging public chain that combines AI technology, financial payment, and is compatible with EVM. It optimizes transaction speed and reduces costs while maintaining a high degree of security and scalability.</p>
        <p>Through the parallel operation of the native token AIA and the adopted APoS and AISIN consensus mechanisms, it promotes the widespread application of blockchain technology, provides efficient technical solutions, and supports enterprises and developers around the world to launch innovations. Blockchain empowers the future with secure investments.</p>
        <a href="#">View More →</a>
      </div>
    </div>
  </section>
);

// Footer Section Component
const Footer = () => (
  <footer className="footer-section">
    <div className="footer-container">
      <div className="footer-logo">
        <img src={jobifyLogo} alt="Jobify Logo" />
      </div>
      <div className="footer-social">
        <p>Add icons here</p>
      </div>
      <div className="footer-links">
        <ul>
          <li><a href="https://linkedin.com/in/team-member1" target="_blank" rel="noopener noreferrer">Team Member 1</a></li>
          <li><a href="https://linkedin.com/in/team-member2" target="_blank" rel="noopener noreferrer">Team Member 2</a></li>
          <li><a href="https://linkedin.com/in/team-member3" target="_blank" rel="noopener noreferrer">Team Member 3</a></li>
          <li><a href="https://linkedin.com/in/team-member4" target="_blank" rel="noopener noreferrer">Team Member 4</a></li>
        </ul>
      </div>
      <hr className="footer-line" />
      <p className="footer-copyright">©2024 Copyright AIA. All rights reserved.</p>
    </div>
  </footer>
);

// Main App Component
const MainPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Simulate loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? <Preloader /> : (
        <>
          <Header />
          <HeroSection />
          <InfoSection />
          <TeamSection />
          <AIAChainSection />
          <Footer />
        </>
      )}
    </div>
  );
};

export default MainPage;