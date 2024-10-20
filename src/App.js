import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage"; // Import your MainPage component
import LoginPage from "./components/LoginPage"; // You need to create this component
import RegisterPage from "./components/RegisterPage"; // You need to create this component
import AnimatedBackground from './components/AnimatedBackground.jsx';
import DashBoard from "./components/DashBoard.jsx";
import YourJobs from "./components/YourJobs.jsx";
import AddJobs from "./components/AddJobs.jsx"
import SeekJob from "./components/SeekJob.jsx";
import YourWork from "./components/YourWork.jsx";
import ConnectWallet from "./components/ConnectWallet.jsx";
import IssuePage from "./components/IssuePage.jsx";

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
        <Route path='/dashboard' element={<div>
          <AnimatedBackground />
          <DashBoard />
        </div>}></Route>
        <Route path="/yourjobs" element={<YourJobs></YourJobs>}></Route>

        <Route path="/addjobs" element={<AddJobs />}></Route>
        <Route path="/seekjobs" element={
          <div>
            <AnimatedBackground></AnimatedBackground>
            <SeekJob />
          </div>}></Route>
      <Route path="/yourwork" element={<YourWork />}></Route>
      <Route path="/connect-wallet" element={
        <div>
          <AnimatedBackground></AnimatedBackground>
          <ConnectWallet />
        </div>}></Route>

      <Route path="/issue" element={<IssuePage></IssuePage>}></Route>
    </Routes>


    </Router >
  );
};

export default App;