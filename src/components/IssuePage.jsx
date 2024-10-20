import React, { useEffect, useState } from "react";
import axios from "axios";

const IssuePage = () => {
  const [jobs, setJobs] = useState([]); // State to store jobs
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/yourjobs"); // Fetch all jobs

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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Jobs with Issues</h1>
      
      {error && <p className="text-red-500">{error}</p>}

      {jobs.length === 0 ? (
        <p className="text-lg text-green-500">No jobs have issues.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="mb-4 p-4 bg-gray-800 text-white rounded-lg shadow-md">
              <p className="text-xl"><strong>Job Title:</strong> {job.jobTitle}</p>
              <p className="text-lg"><strong>Description:</strong> {job.description}</p>
              <p className="text-lg"><strong>Salary:</strong> {job.salary ? job.salary : "Not provided"}</p>
              <p className="text-lg"><strong>Link:</strong>https:merilink</p>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IssuePage;
