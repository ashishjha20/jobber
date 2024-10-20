import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa"; // Importing arrow icons
import axios from "axios";
import './IssuePage.css';

const CircularProgress = ({ percentage, color }) => {
  const radius = 25; // Radius of the circle
  const normalizedRadius = radius - 5; // Normalized radius for the stroke
  const circumference = normalizedRadius * 2 * Math.PI; // Circumference of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Dash offset based on percentage

  return (
    <svg id="progress-circle" width={radius * 2} height={radius * 2}>
      <circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth="5"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth="5"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        stroke="white"
        strokeWidth="1px"
        dy=".3em"
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
};

const IssuePage = () => {
  const [jobs, setJobs] = useState([]); // State to store jobs
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/yourjobs"
        ); // Fetch all jobs

        if (response.status === 200) {
          const allJobs = response.data.data;
          // Filter jobs where issue is true
          const jobsWithIssues = allJobs.filter((job) => job.issued === true);
          setJobs(jobsWithIssues);
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Error fetching jobs.");
      }
    };

    fetchJobs(); // Call the fetch function when the component mounts
  }, []);

  const handleUpvote = async (jobId) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/upvote/${jobId}`
      );
      if (response.status === 200) {
        // Find the updated job and set the upvote in the state
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? { ...job, upvote: job.upvote + 1 } : job
          )
        );
      }
    } catch (error) {
      console.error("Error upvoting job:", error);
      setError("Error upvoting job.");
    }
  };

  const handleDownvote = async (jobId) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/downvote/${jobId}`
      );
      if (response.status === 200) {
        // Find the updated job and set the downvote in the state
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === jobId ? { ...job, downvote: job.downvote + 1 } : job
          )
        );
      }
    } catch (error) {
      console.error("Error downvoting job:", error);
      setError("Error downvoting job.");
    }
  };

  // Function to calculate the percentage of upvotes and downvotes
  const calculatePercentage = (upvotes, downvotes) => {
    const totalVotes = upvotes + downvotes;
    if (totalVotes === 0) return { upvotePercentage: 0, downvotePercentage: 0 };
    return {
      upvotePercentage: Math.min((upvotes / totalVotes) * 100, 100),
      downvotePercentage: Math.min((downvotes / totalVotes) * 100, 100),
    };
  };

  return (
    <div id="issue-page-container">
      <h1 id="issue-page-title">Jobs with Issues</h1>

      {error && <p id="error-message">{error}</p>}

      {jobs.length === 0 ? (
        <p id="no-jobs-message">No jobs have issues.</p>
      ) : (
        <ul id="jobs-list">
          {jobs.map((job) => {
            const { upvotePercentage, downvotePercentage } = calculatePercentage(
              job.upvote,
              job.downvote
            );

            return (
              <li key={job._id} className="job-card">
                <p id="job-title">
                  <strong>Job Title:</strong> {job.jobTitle}
                </p>
                <p id="job-description">
                  <strong>Description:</strong> {job.description}
                </p>
                <p id="job-salary">
                  <strong>Salary:</strong> {job.salary ? job.salary : "Not provided"}
                </p>
                <p id="job-link">
                  <strong>Link:</strong> https://merilink
                </p>

                {/* Upvote and Downvote Icons */}
                <div id="vote-icons">
                  <FaArrowUp
                    id="upvote-icon"
                    onClick={() => handleUpvote(job._id)} // Handle upvote click
                  />
                  <FaArrowDown
                    id="downvote-icon"
                    onClick={() => handleDownvote(job._id)} // Handle downvote click
                  />
                </div>

                {/* Display upvotes and downvotes */}
                <div id="votes-info">
                  <p id="upvote-count">Upvotes: {job.upvote}</p>
                  <p id="downvote-count">Downvotes: {job.downvote}</p>
                </div>

                {/* Circular progress for upvotes */}
                <div id="upvote-percentage">
                  <p>Upvotes Percentage  :</p>
                  <CircularProgress  percentage={upvotePercentage} color="#4caf50" />
                </div>

                {/* Circular progress for downvotes */}
                <div id="downvote-percentage">
                  <p>Downvotes Percentage:</p>
                  <CircularProgress percentage={downvotePercentage} color="#f44336" />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default IssuePage;
