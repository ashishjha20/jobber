import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import './MainPage.css'; // Ensure you create this CSS file based on your existing styles
import students1 from '../images/students1.png'; // Update paths accordingly
import jobifyLogo from '../images/JOBIFY LOGO FULL.png'; // Replace with actual paths
import aiaChainImage from '../images/12345.jpg'; // Update with actual paths
import ConnectWallet from "./ConnectWallet";

// Preloader Component
const Preloader = () => (
  <div className="preloader">
    <img className="preload-image" src={students1} alt="Loading screen with students" />
  </div>
);

// Header Component
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate=useNavigate()
 

  return (
    <header>
      <div className="container">
        <div className="logo">
          <img className="img" src={jobifyLogo} alt="Jobify Logo" />
        </div>
        
        <div className="header-buttons">
          <a href="/connect-wallet" className="connect-wallet">Connect Wallet</a>
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
        <div id="text-section">
        <h1><span id="heading">Emerging opportunities</span>
        <br/>
        <span>Your job search ends here</span></h1>
        <p>Discover 50 lakh plus career opportunities</p>
        </div>
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
      <h2>Search for your preferred work on jobify</h2>
      <p>Discover your ideal job with Jobify! Our platform simplifies the job search process, offering a vast array of listings tailored to your skills and preferences. With user-friendly filters, you can easily find opportunities that match your career goals. Whether you’re seeking remote work or in-person roles, Jobify connects you to the jobs you truly want. Start your journey today!</p>
          </div>
    <div className="info-box">
      <h2>Look out for the perfect person to do your job</h2>
      <p>Finding the perfect candidate for your job is essential for success. With targeted search tools and detailed profiles, you can connect with professionals who possess the skills and experience you need. Streamline your hiring process by accessing a diverse talent pool, ensuring you choose someone who aligns with your company culture and objectives. Make your next hire a great fit</p>
     
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
        name="Tanishq Gupta"
        role="Founder (Web Developer)"
        desc="2nd year student graduating from MNNIT ALLAHBAD in 2027 with a degree in Computer Science and Engineering"
        imgSrc={jobifyLogo}
      />
      <TeamMember
        name="Aryan Sharma"
        role="Founder (Web Developer)"
        desc="2nd year student graduating from MNNIT ALLAHBAD in 2027 with a degree in Computer Science and Engineering"
        imgSrc={jobifyLogo}
      />
      <TeamMember
        name="Y.Vatsal"
        role="Founder (Web Developer)"
        desc="2nd year student graduating from MNNIT ALLAHBAD in 2027 with a degree in Computer Science and Engineering"
        imgSrc={jobifyLogo}
      />
      <TeamMember
        name="Ashish Jha"
        role="Founder (Web Developer)"
        desc="2nd year student graduating from MNNIT ALLAHBAD in 2027 with a degree in Computer Science and Engineering"
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
        <p>Welcome to Jobify, your go-to platform for job seekers and employers! We simplify the job search process, offering a user-friendly interface for freelancers to explore diverse opportunities, whether remote, part-time, or full-time. For employers, Jobify makes posting job openings and attracting top talent effortless.</p>
        <p>Our unique feature allows freelancers to raise issues about payment disputes, ensuring their concerns are addressed promptly. We are dedicated to fostering a fair and vibrant job marketplace. Join Jobify today and take the next step in your career or hiring journey!</p>
       
      </div>
    </div>
  </section>
);

// Footer Section Component


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
         
        </>
      )}
    </div>
  );
};

export default MainPage;