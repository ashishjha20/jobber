import React, { useEffect, useState, useContext } from "react";
import { EmailContext } from "../context/EmailContext"; // Import the EmailContext


const YourJobs = () => {
    const [jobs, setJobs] = useState([]); // State to store fetched jobs
    const [error, setError] = useState(''); // State to store any errors
    const { emails } = useContext(EmailContext); // Get the email from context

  // Function to fetch jobs from the database
  const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/yourjobs', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch jobs data");
            }

            const res = await response.json();
            
         
        } catch (error) {
            setError(error.message);
           
        }
    };

    // Fetch job data when the component mounts
    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if exists */}

            {jobs.length === 0 ? (
                <p>No data added, please click on Add Task button to add task.</p>
            ) : (
                <div>
                    <h2>Your Jobs</h2>
                    <ul>
                        {jobs.map((job, index) => (
                            <li key={index}>
                                <p>Task: {job.task}</p>
                                <p>Description: {job.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default YourJobs;
