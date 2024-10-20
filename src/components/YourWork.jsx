import React, { useState, useEffect, useContext } from 'react';
import { EmailContext } from "../context/EmailContext";// Corrected hook import
import './JobsPage.css';

const YourWork = () => {
    const { emails } = useContext(EmailContext); // Use the hook to get email from context
    const [user, setUser] = useState(null); // To store the user data
    const [jobs, setJobs] = useState([]); // To store the list of all jobs
    const [filteredJobs, setFilteredJobs] = useState([]); // To store filtered jobs
    const [error, setError] = useState(''); // To store any error messages

    // Function to fetch user by email
    const fetchUserByEmail = async (emails) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/getuser/${emails}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();
            setUser(data.data); // Assuming the user data is in `data.data`
        } catch (error) {
            setError(error.message);
        }
    };

    // Function to fetch all jobs
    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/v1/yourjobs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs data');
            }

            const result = await response.json();
            setJobs(result.data); // Assuming the job data is in `result.data`
        } catch (error) {
            setError(error.message);
        }
    };

    // Fetch user and jobs data when the component mounts
    useEffect(() => {
        if (emails) {
            fetchUserByEmail(emails);
            fetchJobs();
        }
    }, [emails]);

    // Filter jobs based on jobsInterested array
    useEffect(() => {
        if (user && jobs.length > 0) {
            const filtered = jobs.filter((job) =>
                user.jobsInterested.includes(job._id) // Assuming user.jobsInterested is an array of job IDs
            );
            setFilteredJobs(filtered);
        }
    }, [user, jobs]);

    return (
        <div className="jobs-page">
            {error && <p className="error-message">{error}</p>}
            <div id="tu"><h2>Your Interested Jobs</h2></div>

            {filteredJobs.length === 0 ? (
                <p>No jobs found in your interested list.</p>
            ) : (
                <ul className="job-list">
                    {filteredJobs.map((job) => (
                        <li key={job._id} className="job-item">
                            <h3>{job.jobTitle}</h3>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Role:</strong> {job.role}</p>
                            <p><strong>Work Type:</strong> {job.workType}</p>
                            <p><strong>Description:</strong> {job.description}</p>
                            <p><strong>Salary:</strong> {job.salary}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default YourWork;
